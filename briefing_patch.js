// ======================= BRIEFING SETTIMANALE - PATCH MODULE =======================
// Self-injecting module: adds button, modal, and all briefing functions
(function() {
  // Wait for DOM and app to be ready
  function injectBriefingUI() {
    // 1. Add button after EC Cliente or Avviso Scadenza button
    var btns = document.querySelectorAll('.btn.btn-outline');
    var targetBtn = null;
    btns.forEach(function(b) {
      if (b.textContent.indexOf('Estratto Conto Cliente') >= 0 || b.textContent.indexOf('Avviso Scadenza') >= 0) {
        targetBtn = b;
      }
    });
    if (targetBtn && !document.querySelector('[onclick*="openBriefingModal"]')) {
      var briefBtn = document.createElement('button');
      briefBtn.className = 'btn btn-outline';
      briefBtn.setAttribute('onclick', 'openBriefingModal()');
      briefBtn.style.cssText = 'border-color:#d69e2e;color:#d69e2e;';
      briefBtn.textContent = '\u{1F4CB} Briefing Settimanale';
      targetBtn.parentNode.insertBefore(briefBtn, targetBtn.nextSibling);
    }

    // 2. Add modal if not exists
    if (!document.getElementById('briefingModal')) {
      var modalHTML = '<div class="modal-overlay" id="briefingModal">' +
        '<div class="modal" style="max-width:1000px;">' +
        '<div class="modal-header" style="background:linear-gradient(135deg,#d69e2e,#b7791f);color:white;">' +
        '<h2 style="margin:0;">\u{1F4CB} Briefing Settimanale FIM</h2>' +
        '<button class="modal-close" onclick="closeModal(\'briefingModal\')" style="color:white;">\u2715</button>' +
        '</div>' +
        '<div class="modal-body" style="max-height:75vh;overflow-y:auto;">' +
        '<div style="display:flex;gap:12px;align-items:flex-end;margin-bottom:16px;">' +
        '<div><label style="font-size:13px;font-weight:600;display:block;margin-bottom:4px;">Data di Riferimento</label>' +
        '<input type="date" id="briefingData" style="padding:10px 12px;border:1px solid var(--border);border-radius:8px;font-size:14px;"></div>' +
        '<button class="btn btn-primary" onclick="generateBriefingSettimanale()" style="background:#d69e2e;border-color:#d69e2e;">Genera Briefing</button>' +
        '</div>' +
        '<div id="briefingResult"></div>' +
        '<div id="briefingActions" style="display:none;margin-top:12px;gap:8px;display:flex;">' +
        '<button class="btn btn-outline btn-sm" onclick="printBriefing()">\u{1F5A8}\uFE0F Stampa</button>' +
        '<button class="btn btn-primary btn-sm" onclick="downloadBriefingPDF()">\u{1F4E5} Scarica PDF</button>' +
        '</div></div></div></div>';
      var div = document.createElement('div');
      div.innerHTML = modalHTML;
      document.body.appendChild(div.firstElementChild);
    }
  }

  // Inject when app is ready (after login)
  var origRefreshAll = window.refreshAll;
  if (origRefreshAll) {
    window.refreshAll = function() {
      origRefreshAll.apply(this, arguments);
      setTimeout(injectBriefingUI, 500);
    };
  }
  // Also try on DOMContentLoaded and after delay
  if (document.readyState === 'complete') {
    setTimeout(injectBriefingUI, 2000);
  } else {
    window.addEventListener('load', function() { setTimeout(injectBriefingUI, 2000); });
  }
})();

// ======================= HELPER: Risolvi nome collaboratore =======================
function _briefGetCollabNome(collabId) {
  if (!collabId) return 'Diretto FIM';
  if (typeof collaboratori !== 'undefined' && Array.isArray(collaboratori)) {
    var c = collaboratori.find(function(x) { return x.id === collabId; });
    if (c) return (c.cognome || '') + ' ' + (c.nome || '');
  }
  return 'Diretto FIM';
}

// ======================= HELPER: Ottieni ruolo collaboratore =======================
function _briefGetCollabRuolo(collabId) {
  if (!collabId) return '';
  if (typeof collaboratori !== 'undefined' && Array.isArray(collaboratori)) {
    var c = collaboratori.find(function(x) { return x.id === collabId; });
    if (c) return c.ruolo || '';
  }
  return '';
}

// ======================= HELPER: Calcola provvigione per polizza =======================
function _briefCalcProvvigione(p) {
  var collabId = p.collaboratore || '';
  if (!collabId) return 0;
  var ruolo = _briefGetCollabRuolo(collabId);
  var tipoGar = p.tipoGaranzia || p.ramo || '';
  if (typeof getProvPercentage === 'function') {
    var perc = getProvPercentage(tipoGar, ruolo, collabId);
    var imp = (typeof calcImponibile === 'function') ? calcImponibile(p) : { imponibile: parseFloat(p.premio) || 0 };
    return (imp.imponibile || 0) * perc / 100;
  }
  var perc2 = 0;
  if (typeof indivProvTables !== 'undefined' && indivProvTables[collabId]) {
    var indiv = indivProvTables[collabId];
    var keys = Object.keys(indiv);
    for (var i = 0; i < keys.length; i++) {
      if (tipoGar.toLowerCase().indexOf(keys[i].toLowerCase()) >= 0 || keys[i].toLowerCase().indexOf(tipoGar.toLowerCase()) >= 0) { perc2 = indiv[keys[i]]; break; }
    }
  }
  if (perc2 === 0 && typeof provTable !== 'undefined' && ruolo) {
    var rami = Object.keys(provTable);
    for (var j = 0; j < rami.length; j++) {
      if (tipoGar.toLowerCase().indexOf(rami[j].toLowerCase()) >= 0 || rami[j].toLowerCase().indexOf(tipoGar.toLowerCase()) >= 0) { perc2 = (provTable[rami[j]] && provTable[rami[j]][ruolo]) || 0; break; }
    }
  }
  var imp2 = (typeof calcImponibile === 'function') ? calcImponibile(p) : { imponibile: parseFloat(p.premio) || 0 };
  return (imp2.imponibile || 0) * perc2 / 100;
}

// ======================= HELPER: Normalizza nome compagnia =======================
function _briefNormalizzaCompagnia(nomeRaw) {
  if (!nomeRaw) return 'Non specificata';
  var n = nomeRaw.trim();
  var mappa = [
    { canon: 'Allianz', match: ['allianz s.p.a', 'allianz spa', 'allianz direct'] },
    { canon: 'Bene Assicurazioni', match: ['bene assicurazioni spa', 'bene assicurazioni s.p.a', 'bene assicurazioni spa socie'] },
    { canon: 'HDI Assicurazioni', match: ['hdi assicurazioni s.p.a', 'hdi assicurazioni spa'] },
    { canon: 'Great Lakes (Prima)', match: ['great lakes insurance se', 'great lakes insurance (prima', 'great lakes insurance'] },
    { canon: 'WAKAM', match: ['wakam sa', 'wakam s.a'] },
    { canon: "Lloyd's", match: ["lloyd's of london", "lloyd's"] }
  ];
  var lower = n.toLowerCase();
  for (var i = 0; i < mappa.length; i++) {
    if (lower === mappa[i].canon.toLowerCase()) return mappa[i].canon;
    for (var j = 0; j < mappa[i].match.length; j++) {
      if (lower.indexOf(mappa[i].match[j]) >= 0 || mappa[i].match[j].indexOf(lower) >= 0) return mappa[i].canon;
    }
  }
  return n;
}

// ======================= HELPER: Testo sicuro per jsPDF =======================
function _briefSafeText(str) {
  if (!str) return '';
  return str.replace(/[\u{1F000}-\u{1FFFF}]/gu, '').replace(/[\u2014\u2013]/g, '-').replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"').replace(/[\u2022]/g, '-').replace(/[\u00A0]/g, ' ');
}

// ======================= BRIEFING SETTIMANALE =======================
function openBriefingModal() {
  var dataInput = document.getElementById('briefingData');
  if (!dataInput.value) {
    var now = new Date();
    dataInput.value = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0') + '-' + String(now.getDate()).padStart(2,'0');
  }
  document.getElementById('briefingResult').innerHTML = '';
  document.getElementById('briefingActions').style.display = 'none';
  document.getElementById('briefingModal').classList.add('active');
}

function generateBriefingSettimanale() {
  var dataRif = document.getElementById('briefingData').value;
  var oggi = dataRif ? new Date(dataRif) : new Date();
  oggi.setHours(0,0,0,0);
  var tra7 = new Date(oggi); tra7.setDate(tra7.getDate() + 7);
  var tra14 = new Date(oggi); tra14.setDate(tra14.getDate() + 14);
  var tra30 = new Date(oggi); tra30.setDate(tra30.getDate() + 30);

  // === 1. SCADENZE CRITICHE ===
  var scadute = [];
  var entro7 = [];
  var entro14 = [];
  var entro30 = [];
  polizze.forEach(function(p) {
    var scad = new Date(p.scadenza);
    scad.setHours(0,0,0,0);
    if (scad < oggi) scadute.push(p);
    else if (scad <= tra7) entro7.push(p);
    else if (scad <= tra14) entro14.push(p);
    else if (scad <= tra30) entro30.push(p);
  });
  // Ordina per scadenza
  var sortScad = function(a, b) { return new Date(a.scadenza) - new Date(b.scadenza); };
  scadute.sort(sortScad);
  entro7.sort(sortScad);
  entro14.sort(sortScad);
  entro30.sort(sortScad);

  // Premi totali delle scadenze
  var premioScadute = scadute.reduce(function(s,p){ return s + (parseFloat(p.premio)||0); }, 0);
  var premio7 = entro7.reduce(function(s,p){ return s + (parseFloat(p.premio)||0); }, 0);
  var premio14 = entro14.reduce(function(s,p){ return s + (parseFloat(p.premio)||0); }, 0);
  var premio30 = entro30.reduce(function(s,p){ return s + (parseFloat(p.premio)||0); }, 0);

  // === 2. CROSS-SELLING ===
  var clientiPolizze = {};
  polizze.forEach(function(p) {
    if (!p.cliente) return;
    if (!clientiPolizze[p.cliente]) clientiPolizze[p.cliente] = [];
    clientiPolizze[p.cliente].push(p);
  });
  var ramiBase = ['RCA', 'Auto', 'Vita', 'Infortuni', 'Casa', 'RC Professionale', 'Multirischio', 'Salute'];
  var crossSelling = [];
  Object.keys(clientiPolizze).forEach(function(nome) {
    var pols = clientiPolizze[nome];
    var ramiCliente = pols.map(function(p) { return (p.tipoGaranzia || p.ramo || '').toLowerCase(); });
    var suggerimenti = [];
    // Se ha solo RCA, suggerisci casa/infortuni/vita
    var haRCA = ramiCliente.some(function(r) { return r.indexOf('rca') >= 0 || r.indexOf('auto') >= 0; });
    var haVita = ramiCliente.some(function(r) { return r.indexOf('vita') >= 0 || r.indexOf('tcm') >= 0; });
    var haInfortuni = ramiCliente.some(function(r) { return r.indexOf('infortun') >= 0; });
    var haCasa = ramiCliente.some(function(r) { return r.indexOf('casa') >= 0 || r.indexOf('abitazion') >= 0 || r.indexOf('globale') >= 0; });
    var haRC = ramiCliente.some(function(r) { return r.indexOf('rc prof') >= 0 || r.indexOf('responsabilit') >= 0; });
    var haSalute = ramiCliente.some(function(r) { return r.indexOf('salute') >= 0 || r.indexOf('sanitari') >= 0; });
    if (!haVita) suggerimenti.push('Vita/TCM');
    if (!haInfortuni) suggerimenti.push('Infortuni');
    if (!haCasa) suggerimenti.push('Casa/Abitazione');
    if (!haSalute) suggerimenti.push('Salute');
    if (pols.length === 1 && suggerimenti.length > 0) {
      crossSelling.push({ cliente: nome, polizzeAttuali: pols.length, rami: ramiCliente.join(', '), suggerimenti: suggerimenti });
    } else if (suggerimenti.length >= 2) {
      crossSelling.push({ cliente: nome, polizzeAttuali: pols.length, rami: ramiCliente.join(', '), suggerimenti: suggerimenti });
    }
  });
  crossSelling.sort(function(a, b) { return b.suggerimenti.length - a.suggerimenti.length; });
  var topCross = crossSelling.slice(0, 10);

  // === 3. CLIENTI DA CHIAMARE ===
  var clientiDaChiamare = [];
  // Polizze scadute o in scadenza 7gg â chiamare
  var urgenti = scadute.concat(entro7);
  var giaSegnalati = {};
  urgenti.forEach(function(p) {
    if (!p.cliente || giaSegnalati[p.cliente]) return;
    giaSegnalati[p.cliente] = true;
    var cl = (typeof clienti !== 'undefined') ? clienti.find(function(c) { return c.nome === p.cliente || (c.cognome && (c.nome + ' ' + c.cognome) === p.cliente); }) : null;
    clientiDaChiamare.push({
      nome: p.cliente,
      telefono: (cl && cl.telefono) || p.telefono || '',
      email: (cl && cl.email) || p.email || '',
      motivo: new Date(p.scadenza) < oggi ? 'Polizza SCADUTA' : 'Scadenza entro 7 giorni',
      polizza: (p.compagnia || '') + ' - ' + (p.numPolizza || '') + ' (' + (p.tipoGaranzia || p.targa || '') + ')',
      scadenza: p.scadenza,
      premio: parseFloat(p.premio) || 0
    });
  });
  clientiDaChiamare.sort(function(a, b) { return new Date(a.scadenza) - new Date(b.scadenza); });

  // === 4. PERFORMANCE PROVVIGIONI (v2: risolvi nomi, calcola da tabelle) ===
  var provvPerCollab = {};
  var provvTotale = 0;
  polizze.forEach(function(p) {
    var collabId = p.collaboratore || '';
    var collabNome = _briefGetCollabNome(collabId);
    var imp = (typeof calcImponibile === 'function') ? calcImponibile(p) : { imponibile: parseFloat(p.premio)||0, premio: parseFloat(p.premio)||0 };
    var provv = _briefCalcProvvigione(p);
    if (!provvPerCollab[collabNome]) provvPerCollab[collabNome] = { premi: 0, imponibile: 0, provvigioni: 0, numPolizze: 0 };
    provvPerCollab[collabNome].premi += imp.premio || (parseFloat(p.premio)||0);
    provvPerCollab[collabNome].imponibile += imp.imponibile || 0;
    provvPerCollab[collabNome].provvigioni += provv;
    provvPerCollab[collabNome].numPolizze += 1;
    provvTotale += provv;
  });
  var collabList = Object.keys(provvPerCollab).map(function(k) {
    var d = provvPerCollab[k];
    return { nome: k, premi: d.premi, imponibile: d.imponibile, provvigioni: d.provvigioni, numPolizze: d.numPolizze, percMedia: d.imponibile > 0 ? (d.provvigioni / d.imponibile * 100) : 0 };
  });
  collabList.sort(function(a, b) { return b.provvigioni - a.provvigioni; });

  // === 5. ANDAMENTO PER COMPAGNIA ===
  var perCompagnia = {};
  polizze.forEach(function(p) {
    var comp = _briefNormalizzaCompagnia(p.compagnia);
    if (!perCompagnia[comp]) perCompagnia[comp] = { premi: 0, numPolizze: 0, scadute: 0, attive: 0 };
    perCompagnia[comp].premi += parseFloat(p.premio) || 0;
    perCompagnia[comp].numPolizze += 1;
    if (new Date(p.scadenza) < oggi) perCompagnia[comp].scadute += 1;
    else perCompagnia[comp].attive += 1;
  });
  var compList = Object.keys(perCompagnia).map(function(k) {
    var d = perCompagnia[k];
    return { nome: k, premi: d.premi, numPolizze: d.numPolizze, scadute: d.scadute, attive: d.attive };
  });
  compList.sort(function(a, b) { return b.premi - a.premi; });
  var premiTotali = polizze.reduce(function(s, p) { return s + (parseFloat(p.premio) || 0); }, 0);

  // === GENERA HTML ===
  var html = '';

  // Riepilogo rapido
  html += '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:20px;">';
  html += '<div style="background:linear-gradient(135deg,#fff5f5,#fed7d7);border-radius:10px;padding:14px;text-align:center;"><div style="font-size:28px;font-weight:800;color:#c53030;">' + scadute.length + '</div><div style="font-size:11px;color:#9b2c2c;">Scadute</div><div style="font-size:10px;color:#c53030;font-weight:600;">' + formatCurrency(premioScadute) + '</div></div>';
  html += '<div style="background:linear-gradient(135deg,#fffbeb,#fef3c7);border-radius:10px;padding:14px;text-align:center;"><div style="font-size:28px;font-weight:800;color:#d69e2e;">' + entro7.length + '</div><div style="font-size:11px;color:#975a16;">Entro 7 gg</div><div style="font-size:10px;color:#d69e2e;font-weight:600;">' + formatCurrency(premio7) + '</div></div>';
  html += '<div style="background:linear-gradient(135deg,#f0fff4,#c6f6d5);border-radius:10px;padding:14px;text-align:center;"><div style="font-size:28px;font-weight:800;color:#2f855a;">' + polizze.length + '</div><div style="font-size:11px;color:#276749;">Polizze Totali</div><div style="font-size:10px;color:#2f855a;font-weight:600;">' + formatCurrency(premiTotali) + '</div></div>';
  html += '<div style="background:linear-gradient(135deg,#ebf8ff,#bee3f8);border-radius:10px;padding:14px;text-align:center;"><div style="font-size:28px;font-weight:800;color:#2b6cb0;">' + formatCurrency(provvTotale) + '</div><div style="font-size:11px;color:#2a4365;">Provvigioni Totali</div><div style="font-size:10px;color:#2b6cb0;">su ' + collabList.length + ' collaboratori</div></div>';
  html += '</div>';

  // === SEZ 1: SCADENZE CRITICHE ===
  html += '<div style="background:#fff5f5;border-radius:10px;padding:16px;margin-bottom:16px;border-left:4px solid #e53e3e;">';
  html += '<h3 style="margin:0 0 10px;color:#c53030;font-size:15px;"> Scadenze Critiche</h3>';
  if (scadute.length === 0 && entro7.length === 0 && entro14.length === 0) {
    html += '<p style="color:#38a169;font-weight:600;">Nessuna scadenza critica nei prossimi 14 giorni.</p>';
  } else {
    html += '<table style="width:100%;border-collapse:collapse;font-size:12px;">';
    html += '<thead><tr style="background:#c53030;color:white;"><th style="padding:6px 8px;text-align:left;">Urgenza</th><th style="padding:6px 8px;">Cliente</th><th style="padding:6px 8px;">Compagnia</th><th style="padding:6px 8px;">N. Polizza</th><th style="padding:6px 8px;">Ramo</th><th style="padding:6px 8px;">Scadenza</th><th style="padding:6px 8px;text-align:right;">Premio</th></tr></thead><tbody>';
    var _briefRows = function(arr, label, bgColor) {
      arr.forEach(function(p) {
        html += '<tr style="background:' + bgColor + ';"><td style="padding:5px 8px;font-weight:700;color:#c53030;">' + label + '</td>';
        html += '<td style="padding:5px 8px;font-weight:600;">' + (p.cliente || '-') + '</td>';
        html += '<td style="padding:5px 8px;">' + (p.compagnia || '-') + '</td>';
        html += '<td style="padding:5px 8px;">' + (p.numPolizza || '-') + '</td>';
        html += '<td style="padding:5px 8px;">' + (p.tipoGaranzia || p.targa || '-') + '</td>';
        html += '<td style="padding:5px 8px;">' + formatDate(p.scadenza) + '</td>';
        html += '<td style="padding:5px 8px;text-align:right;font-weight:600;">' + formatCurrency(p.premio) + '</td></tr>';
      });
    };
    _briefRows(scadute, 'SCADUTA', '#fff5f5');
    _briefRows(entro7, '7 giorni', '#fffbeb');
    _briefRows(entro14, '14 giorni', '#fffff0');
    html += '</tbody></table>';
  }
  html += '</div>';

  // === SEZ 2: CLIENTI DA CHIAMARE ===
  html += '<div style="background:#ebf8ff;border-radius:10px;padding:16px;margin-bottom:16px;border-left:4px solid #3182ce;">';
  html += '<h3 style="margin:0 0 10px;color:#2b6cb0;font-size:15px;"> Clienti da Chiamare (' + clientiDaChiamare.length + ')</h3>';
  if (clientiDaChiamare.length === 0) {
    html += '<p style="color:#38a169;font-weight:600;">Nessun cliente da contattare con urgenza.</p>';
  } else {
    html += '<table style="width:100%;border-collapse:collapse;font-size:12px;">';
    html += '<thead><tr style="background:#2b6cb0;color:white;"><th style="padding:6px 8px;text-align:left;">Cliente</th><th style="padding:6px 8px;">Telefono</th><th style="padding:6px 8px;">Email</th><th style="padding:6px 8px;">Motivo</th><th style="padding:6px 8px;">Polizza</th><th style="padding:6px 8px;text-align:right;">Premio</th></tr></thead><tbody>';
    clientiDaChiamare.forEach(function(c, i) {
      html += '<tr style="background:' + (i%2===0 ? '#ebf8ff' : 'white') + ';">';
      html += '<td style="padding:5px 8px;font-weight:600;">' + c.nome + '</td>';
      html += '<td style="padding:5px 8px;">' + (c.telefono || '-') + '</td>';
      html += '<td style="padding:5px 8px;font-size:11px;">' + (c.email || '-') + '</td>';
      html += '<td style="padding:5px 8px;"><span style="padding:2px 6px;border-radius:4px;font-size:10px;background:' + (c.motivo.indexOf('SCADUTA') >= 0 ? '#fed7d7;color:#c53030' : '#fefcbf;color:#975a16') + ';">' + c.motivo + '</span></td>';
      html += '<td style="padding:5px 8px;font-size:11px;">' + c.polizza + '</td>';
      html += '<td style="padding:5px 8px;text-align:right;font-weight:600;">' + formatCurrency(c.premio) + '</td></tr>';
    });
    html += '</tbody></table>';
  }
  html += '</div>';

  // === SEZ 3: CROSS-SELLING ===
  html += '<div style="background:#f0fff4;border-radius:10px;padding:16px;margin-bottom:16px;border-left:4px solid #38a169;">';
  html += '<h3 style="margin:0 0 10px;color:#276749;font-size:15px;"> Opportunita Cross-Selling (Top ' + topCross.length + ')</h3>';
  if (topCross.length === 0) {
    html += '<p style="color:#718096;">Nessuna opportunita di cross-selling rilevata.</p>';
  } else {
    html += '<table style="width:100%;border-collapse:collapse;font-size:12px;">';
    html += '<thead><tr style="background:#276749;color:white;"><th style="padding:6px 8px;text-align:left;">Cliente</th><th style="padding:6px 8px;">Polizze Attuali</th><th style="padding:6px 8px;">Rami Coperti</th><th style="padding:6px 8px;">Suggerimenti</th></tr></thead><tbody>';
    topCross.forEach(function(c, i) {
      html += '<tr style="background:' + (i%2===0 ? '#f0fff4' : 'white') + ';">';
      html += '<td style="padding:5px 8px;font-weight:600;">' + c.cliente + '</td>';
      html += '<td style="padding:5px 8px;text-align:center;">' + c.polizzeAttuali + '</td>';
      html += '<td style="padding:5px 8px;font-size:11px;">' + c.rami + '</td>';
      html += '<td style="padding:5px 8px;">' + c.suggerimenti.map(function(s) { return '<span style="display:inline-block;padding:2px 8px;margin:1px;border-radius:10px;font-size:10px;background:#c6f6d5;color:#276749;">' + s + '</span>'; }).join(' ') + '</td></tr>';
    });
    html += '</tbody></table>';
  }
  html += '</div>';

  // === SEZ 4: PROVVIGIONI PER COLLABORATORE ===
  html += '<div style="background:#faf5ff;border-radius:10px;padding:16px;margin-bottom:16px;border-left:4px solid #805ad5;">';
  html += '<h3 style="margin:0 0 10px;color:#553c9a;font-size:15px;"> Performance Provvigioni</h3>';
  html += '<table style="width:100%;border-collapse:collapse;font-size:12px;">';
  html += '<thead><tr style="background:#553c9a;color:white;"><th style="padding:6px 8px;text-align:left;">Collaboratore</th><th style="padding:6px 8px;text-align:center;">N. Polizze</th><th style="padding:6px 8px;text-align:right;">Premi</th><th style="padding:6px 8px;text-align:right;">Imponibile</th><th style="padding:6px 8px;text-align:right;">Provvigioni</th><th style="padding:6px 8px;text-align:center;">% Media</th><th style="padding:6px 8px;">Barra</th></tr></thead><tbody>';
  var maxProv = collabList.length > 0 ? collabList[0].provvigioni : 1;
  collabList.forEach(function(c, i) {
    var barW = maxProv > 0 ? Math.round(c.provvigioni / maxProv * 100) : 0;
    html += '<tr style="background:' + (i%2===0 ? '#faf5ff' : 'white') + ';">';
    html += '<td style="padding:5px 8px;font-weight:600;">' + c.nome + '</td>';
    html += '<td style="padding:5px 8px;text-align:center;">' + c.numPolizze + '</td>';
    html += '<td style="padding:5px 8px;text-align:right;">' + formatCurrency(c.premi) + '</td>';
    html += '<td style="padding:5px 8px;text-align:right;">' + formatCurrency(c.imponibile) + '</td>';
    html += '<td style="padding:5px 8px;text-align:right;font-weight:700;color:#553c9a;">' + formatCurrency(c.provvigioni) + '</td>';
    html += '<td style="padding:5px 8px;text-align:center;">' + c.percMedia.toFixed(1) + '%</td>';
    html += '<td style="padding:5px 8px;"><div style="background:#e9d8fd;border-radius:4px;height:14px;width:100%;"><div style="background:#805ad5;border-radius:4px;height:14px;width:' + barW + '%;"></div></div></td></tr>';
  });
  html += '<tr style="background:#553c9a;color:white;font-weight:700;"><td>TOTALE</td><td style="text-align:center;">' + polizze.length + '</td><td style="text-align:right;">' + formatCurrency(premiTotali) + '</td><td></td><td style="text-align:right;">' + formatCurrency(provvTotale) + '</td><td colspan="2"></td></tr>';
  html += '</tbody></table></div>';

  // === SEZ 5: ANDAMENTO PER COMPAGNIA ===
  html += '<div style="background:#fffbeb;border-radius:10px;padding:16px;margin-bottom:16px;border-left:4px solid #d69e2e;">';
  html += '<h3 style="margin:0 0 10px;color:#975a16;font-size:15px;"> Andamento per Compagnia</h3>';
  html += '<table style="width:100%;border-collapse:collapse;font-size:12px;">';
  html += '<thead><tr style="background:#975a16;color:white;"><th style="padding:6px 8px;text-align:left;">Compagnia</th><th style="padding:6px 8px;text-align:center;">Polizze</th><th style="padding:6px 8px;text-align:center;">Attive</th><th style="padding:6px 8px;text-align:center;">Scadute</th><th style="padding:6px 8px;text-align:right;">Premi Totali</th><th style="padding:6px 8px;text-align:center;">Quota %</th><th style="padding:6px 8px;">Distribuzione</th></tr></thead><tbody>';
  compList.forEach(function(c, i) {
    var quota = premiTotali > 0 ? (c.premi / premiTotali * 100) : 0;
    var barW = Math.round(quota);
    html += '<tr style="background:' + (i%2===0 ? '#fffbeb' : 'white') + ';">';
    html += '<td style="padding:5px 8px;font-weight:600;">' + c.nome + '</td>';
    html += '<td style="padding:5px 8px;text-align:center;">' + c.numPolizze + '</td>';
    html += '<td style="padding:5px 8px;text-align:center;color:#38a169;">' + c.attive + '</td>';
    html += '<td style="padding:5px 8px;text-align:center;color:' + (c.scadute > 0 ? '#e53e3e' : '#38a169') + ';">' + c.scadute + '</td>';
    html += '<td style="padding:5px 8px;text-align:right;font-weight:600;">' + formatCurrency(c.premi) + '</td>';
    html += '<td style="padding:5px 8px;text-align:center;font-weight:600;">' + quota.toFixed(1) + '%</td>';
    html += '<td style="padding:5px 8px;"><div style="background:#fefcbf;border-radius:4px;height:14px;width:100%;"><div style="background:#d69e2e;border-radius:4px;height:14px;width:' + barW + '%;"></div></div></td></tr>';
  });
  html += '</tbody></table></div>';

  // Footer
  html += '<div style="text-align:center;color:var(--text-light);font-size:11px;padding:10px;">';
  html += 'Briefing generato il ' + new Date().toLocaleDateString('it-IT') + ' alle ' + new Date().toLocaleTimeString('it-IT', {hour:'2-digit',minute:'2-digit'});
  html += ' | FIM Insurance Broker S.a.s.  -  RUI Sez. B N. B000405449</div>';

  document.getElementById('briefingResult').innerHTML = html;
  document.getElementById('briefingActions').style.display = 'flex';

  window._lastBriefing = {
    dataRif: dataRif || new Date().toISOString().split('T')[0],
    scadute: scadute, entro7: entro7, entro14: entro14, entro30: entro30,
    clientiDaChiamare: clientiDaChiamare, topCross: topCross,
    collabList: collabList, compList: compList,
    premiTotali: premiTotali, provvTotale: provvTotale,
    premioScadute: premioScadute, premio7: premio7
  };
}

function printBriefing() {
  if (!window._lastBriefing) { showToast('Genera prima il briefing', 'error'); return; }
  var b = window._lastBriefing;
  var settings = JSON.parse(localStorage.getItem('fim_settings') || '{}');
  var html = '<!DOCTYPE html><html><head><meta charset="utf-8"><style>' +
    'body{font-family:Segoe UI,Arial,sans-serif;padding:25px 35px;max-width:960px;margin:0 auto;font-size:12px;color:#333;}' +
    '.header{background:#1a365d;color:white;padding:16px 20px;border-radius:8px;margin-bottom:18px;}' +
    '.header h1{margin:0;font-size:16px;}' +
    '.header p{margin:3px 0 0;font-size:10px;opacity:0.85;}' +
    '.summary{display:flex;gap:12px;margin-bottom:16px;}' +
    '.summary-card{flex:1;padding:12px;border-radius:8px;text-align:center;border:1px solid #e2e8f0;}' +
    '.summary-card .num{font-size:22px;font-weight:800;}' +
    '.summary-card .lbl{font-size:10px;color:#666;}' +
    '.section{margin-bottom:14px;page-break-inside:avoid;}' +
    '.section h3{font-size:13px;margin:0 0 8px;padding:6px 10px;border-radius:6px;color:white;}' +
    'table{width:100%;border-collapse:collapse;font-size:11px;margin-bottom:4px;}' +
    'th{padding:5px 6px;text-align:left;font-size:9px;text-transform:uppercase;color:white;}' +
    'td{padding:4px 6px;border-bottom:1px solid #edf2f7;}' +
    '.right{text-align:right;} .center{text-align:center;}' +
    '.tag{display:inline-block;padding:1px 6px;border-radius:8px;font-size:9px;margin:1px;}' +
    '.footer{text-align:center;font-size:9px;color:#888;margin-top:20px;border-top:1px solid #e2e8f0;padding-top:8px;}' +
    '@media print{body{padding:15px;}.header{padding:12px 16px;}}</style></head><body>';
  // Header
  html += '<div class="header"><h1> Briefing Settimanale  -  FIM Insurance Broker</h1>';
  html += '<p>' + (settings.indirizzo || '') + ' | ' + (settings.telefono || '') + ' | ' + (settings.email || '') + ' | RUI: ' + (settings.rui || 'B000405449') + ' Sez. B</p>';
  html += '<p style="margin-top:6px;font-size:11px;">Data riferimento: ' + formatDate(b.dataRif) + '</p></div>';
  // Summary cards
  html += '<div class="summary">';
  html += '<div class="summary-card" style="border-color:#e53e3e;"><div class="num" style="color:#c53030;">' + b.scadute.length + '</div><div class="lbl">Scadute</div></div>';
  html += '<div class="summary-card" style="border-color:#d69e2e;"><div class="num" style="color:#d69e2e;">' + b.entro7.length + '</div><div class="lbl">Entro 7gg</div></div>';
  html += '<div class="summary-card" style="border-color:#38a169;"><div class="num" style="color:#38a169;">' + polizze.length + '</div><div class="lbl">Totali</div></div>';
  html += '<div class="summary-card" style="border-color:#805ad5;"><div class="num" style="color:#805ad5;">' + formatCurrency(b.provvTotale) + '</div><div class="lbl">Provvigioni</div></div>';
  html += '</div>';
  // Sez 1: Scadenze
  html += '<div class="section"><h3 style="background:#c53030;"> Scadenze Critiche</h3>';
  var allUrgent = b.scadute.concat(b.entro7).concat(b.entro14);
  if (allUrgent.length > 0) {
    html += '<table><thead><tr style="background:#c53030;"><th>Stato</th><th>Cliente</th><th>Compagnia</th><th>Polizza</th><th>Ramo</th><th>Scadenza</th><th class="right">Premio</th></tr></thead><tbody>';
    var _pRow = function(p, label) {
      html += '<tr><td style="font-weight:700;color:#c53030;">' + label + '</td><td style="font-weight:600;">' + (p.cliente||'-') + '</td><td>' + (p.compagnia||'-') + '</td><td>' + (p.numPolizza||'-') + '</td><td>' + (p.tipoGaranzia||p.targa||'-') + '</td><td>' + formatDate(p.scadenza) + '</td><td class="right" style="font-weight:600;">' + formatCurrency(p.premio) + '</td></tr>';
    };
    b.scadute.forEach(function(p){ _pRow(p, 'SCADUTA'); });
    b.entro7.forEach(function(p){ _pRow(p, '7gg'); });
    b.entro14.forEach(function(p){ _pRow(p, '14gg'); });
    html += '</tbody></table>';
  } else { html += '<p style="color:#38a169;">Nessuna scadenza critica.</p>'; }
  html += '</div>';
  // Sez 2: Clienti da chiamare
  html += '<div class="section"><h3 style="background:#2b6cb0;"> Clienti da Chiamare (' + b.clientiDaChiamare.length + ')</h3>';
  if (b.clientiDaChiamare.length > 0) {
    html += '<table><thead><tr style="background:#2b6cb0;"><th>Cliente</th><th>Telefono</th><th>Email</th><th>Motivo</th><th>Polizza</th><th class="right">Premio</th></tr></thead><tbody>';
    b.clientiDaChiamare.forEach(function(c) {
      html += '<tr><td style="font-weight:600;">' + c.nome + '</td><td>' + (c.telefono||'-') + '</td><td style="font-size:10px;">' + (c.email||'-') + '</td><td>' + c.motivo + '</td><td style="font-size:10px;">' + c.polizza + '</td><td class="right" style="font-weight:600;">' + formatCurrency(c.premio) + '</td></tr>';
    });
    html += '</tbody></table>';
  } else { html += '<p style="color:#38a169;">Nessun cliente urgente.</p>'; }
  html += '</div>';
  // Sez 3: Cross-selling
  html += '<div class="section"><h3 style="background:#276749;"> Cross-Selling</h3>';
  if (b.topCross.length > 0) {
    html += '<table><thead><tr style="background:#276749;"><th>Cliente</th><th class="center">Polizze</th><th>Rami</th><th>Suggerimenti</th></tr></thead><tbody>';
    b.topCross.forEach(function(c) {
      html += '<tr><td style="font-weight:600;">' + c.cliente + '</td><td class="center">' + c.polizzeAttuali + '</td><td style="font-size:10px;">' + c.rami + '</td><td>' + c.suggerimenti.map(function(s){ return '<span class="tag" style="background:#c6f6d5;color:#276749;">' + s + '</span>'; }).join(' ') + '</td></tr>';
    });
    html += '</tbody></table>';
  } else { html += '<p>Nessuna opportunita rilevata.</p>'; }
  html += '</div>';
  // Sez 4: Provvigioni
  html += '<div class="section"><h3 style="background:#553c9a;"> Provvigioni</h3>';
  html += '<table><thead><tr style="background:#553c9a;"><th>Collaboratore</th><th class="center">Polizze</th><th class="right">Premi</th><th class="right">Imponibile</th><th class="right">Provvigioni</th><th class="center">%</th></tr></thead><tbody>';
  b.collabList.forEach(function(c) {
    html += '<tr><td style="font-weight:600;">' + c.nome + '</td><td class="center">' + c.numPolizze + '</td><td class="right">' + formatCurrency(c.premi) + '</td><td class="right">' + formatCurrency(c.imponibile) + '</td><td class="right" style="font-weight:700;color:#553c9a;">' + formatCurrency(c.provvigioni) + '</td><td class="center">' + c.percMedia.toFixed(1) + '%</td></tr>';
  });
  html += '<tr style="background:#553c9a;color:white;font-weight:700;"><td>TOTALE</td><td class="center">' + polizze.length + '</td><td class="right">' + formatCurrency(b.premiTotali) + '</td><td></td><td class="right">' + formatCurrency(b.provvTotale) + '</td><td></td></tr>';
  html += '</tbody></table></div>';
  // Sez 5: Compagnie
  html += '<div class="section"><h3 style="background:#975a16;"> Compagnie</h3>';
  html += '<table><thead><tr style="background:#975a16;"><th>Compagnia</th><th class="center">Polizze</th><th class="center">Attive</th><th class="center">Scadute</th><th class="right">Premi</th><th class="center">Quota</th></tr></thead><tbody>';
  b.compList.forEach(function(c) {
    var q = b.premiTotali > 0 ? (c.premi / b.premiTotali * 100) : 0;
    html += '<tr><td style="font-weight:600;">' + c.nome + '</td><td class="center">' + c.numPolizze + '</td><td class="center" style="color:#38a169;">' + c.attive + '</td><td class="center" style="color:' + (c.scadute>0?'#e53e3e':'#38a169') + ';">' + c.scadute + '</td><td class="right" style="font-weight:600;">' + formatCurrency(c.premi) + '</td><td class="center">' + q.toFixed(1) + '%</td></tr>';
  });
  html += '</tbody></table></div>';
  // Footer
  html += '<div class="footer">Briefing generato il ' + new Date().toLocaleDateString('it-IT') + ' alle ' + new Date().toLocaleTimeString('it-IT', {hour:'2-digit',minute:'2-digit'}) + ' | FIM Insurance Broker S.a.s.  -  RUI Sez. B N. B000405449</div>';
  html += '</body></html>';
  var w = window.open('', '_blank'); w.document.write(html); w.document.close(); setTimeout(function(){ w.print(); }, 400);
}

function downloadBriefingPDF() {
  if (!window._lastBriefing) { showToast('Genera prima il briefing', 'error'); return; }
  var b = window._lastBriefing;
  var settings = JSON.parse(localStorage.getItem('fim_settings') || '{}');
  var jsPDFLib = window.jspdf;
  var doc = new jsPDFLib.jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  var W = 210, H = 297, ML = 12, MR = 12, cW = W - ML - MR;
  var y = 0;
  var sc = function(hex) { return [parseInt(hex.slice(1,3),16), parseInt(hex.slice(3,5),16), parseInt(hex.slice(5,7),16)]; };
  var fC = function(v) { var n = parseFloat(v)||0; return n.toLocaleString('it-IT',{style:'currency',currency:'EUR'}); };
  var fD = function(d) { if(!d) return '-'; var p=d.split('-'); return p.length===3 ? p[2]+'/'+p[1]+'/'+p[0] : d; };

  // === HEADER ===
  doc.setFillColor.apply(doc, sc('#1a365d'));
  doc.rect(0, 0, W, 28, 'F');
  doc.setTextColor(255,255,255);
  doc.setFontSize(14); doc.setFont('helvetica','bold');
  doc.text('Briefing Settimanale  -  FIM Insurance Broker', ML, 11);
  doc.setFontSize(8); doc.setFont('helvetica','normal');
  doc.text((settings.indirizzo||'') + ' | ' + (settings.telefono||'') + ' | RUI: ' + (settings.rui||'B000405449') + ' Sez. B', ML, 17);
  doc.text('Data riferimento: ' + fD(b.dataRif) + '  |  Generato: ' + new Date().toLocaleDateString('it-IT'), ML, 22);
  y = 34;

  // === SUMMARY BOXES ===
  var boxW = (cW - 9) / 4;
  var boxes = [
    { label: 'Scadute', val: '' + b.scadute.length, sub: fC(b.premioScadute), color: '#e53e3e' },
    { label: 'Entro 7gg', val: '' + b.entro7.length, sub: fC(b.premio7), color: '#d69e2e' },
    { label: 'Polizze Totali', val: '' + polizze.length, sub: fC(b.premiTotali), color: '#38a169' },
    { label: 'Provvigioni', val: fC(b.provvTotale), sub: b.collabList.length + ' collab.', color: '#805ad5' }
  ];
  boxes.forEach(function(bx, i) {
    var x = ML + i * (boxW + 3);
    doc.setFillColor(247,250,252);
    doc.setDrawColor.apply(doc, sc(bx.color));
    doc.setLineWidth(0.5);
    doc.rect(x, y, boxW, 16, 'FD');
    doc.setTextColor.apply(doc, sc(bx.color));
    doc.setFontSize(12); doc.setFont('helvetica','bold');
    doc.text(bx.val, x + boxW/2, y + 7, { align: 'center' });
    doc.setFontSize(6); doc.setFont('helvetica','normal');
    doc.setTextColor(100,100,100);
    doc.text(bx.label, x + boxW/2, y + 11, { align: 'center' });
    doc.setFontSize(6);
    doc.text(bx.sub, x + boxW/2, y + 14, { align: 'center' });
  });
  y += 22;

  // Helper per tabella PDF
  var tblHeader = function(cols, color) {
    if (y > H - 30) { doc.addPage(); y = 15; }
    doc.setFillColor.apply(doc, sc(color));
    doc.rect(ML, y, cW, 6, 'F');
    doc.setTextColor(255,255,255);
    doc.setFontSize(6); doc.setFont('helvetica','bold');
    cols.forEach(function(c) { doc.text(c.label, c.x, y + 4, c.align ? { align: c.align } : {}); });
    y += 6;
  };
  var checkPage = function(need) { if (y + need > H - 15) { doc.addPage(); y = 15; } };

  // === SEZ 1: SCADENZE ===
  doc.setFillColor.apply(doc, sc('#fff5f5'));
  doc.rect(ML, y, cW, 6, 'F');
  doc.setTextColor.apply(doc, sc('#c53030'));
  doc.setFontSize(9); doc.setFont('helvetica','bold');
  doc.text('[!] Scadenze Critiche', ML + 3, y + 4);
  y += 7;
  var urgAll = b.scadute.concat(b.entro7).concat(b.entro14);
  if (urgAll.length > 0) {
    var cx = [ML+2, ML+18, ML+52, ML+82, ML+108, ML+132];
    tblHeader([
      {label:'Stato',x:cx[0]},{label:'Cliente',x:cx[1]},{label:'Compagnia',x:cx[2]},{label:'Polizza',x:cx[3]},{label:'Scadenza',x:cx[4]},{label:'Premio',x:cW+ML-2,align:'right'}
    ], '#c53030');
    doc.setFontSize(7); doc.setFont('helvetica','normal');
    var _pdfRow = function(p, lbl) {
      checkPage(6);
      doc.setTextColor(0,0,0);
      doc.setFont('helvetica','bold'); doc.text(lbl, cx[0], y+4); doc.setFont('helvetica','normal');
      doc.text((p.cliente||'-').substring(0,20), cx[1], y+4);
      doc.text((p.compagnia||'-').substring(0,18), cx[2], y+4);
      doc.text((p.numPolizza||'-').substring(0,16), cx[3], y+4);
      doc.text(fD(p.scadenza), cx[4], y+4);
      doc.setFont('helvetica','bold');
      doc.text(fC(p.premio), cW+ML-2, y+4, {align:'right'});
      doc.setFont('helvetica','normal');
      doc.setDrawColor(226,232,240); doc.setLineWidth(0.1); doc.line(ML, y+5.5, ML+cW, y+5.5);
      y += 6;
    };
    b.scadute.forEach(function(p){ _pdfRow(p,'SCADUTA'); });
    b.entro7.forEach(function(p){ _pdfRow(p,'7gg'); });
    b.entro14.forEach(function(p){ _pdfRow(p,'14gg'); });
  } else { doc.setTextColor(56,161,105); doc.setFontSize(8); doc.text('Nessuna scadenza critica.', ML+3, y+4); y+=7; }
  y += 4;

  // === SEZ 2: CLIENTI DA CHIAMARE ===
  checkPage(20);
  doc.setFillColor.apply(doc, sc('#ebf8ff'));
  doc.rect(ML, y, cW, 6, 'F');
  doc.setTextColor.apply(doc, sc('#2b6cb0'));
  doc.setFontSize(9); doc.setFont('helvetica','bold');
  doc.text(' Clienti da Chiamare (' + b.clientiDaChiamare.length + ')', ML + 3, y + 4);
  y += 7;
  if (b.clientiDaChiamare.length > 0) {
    var cc = [ML+2, ML+40, ML+72, ML+105, ML+145];
    tblHeader([
      {label:'Cliente',x:cc[0]},{label:'Telefono',x:cc[1]},{label:'Motivo',x:cc[2]},{label:'Polizza',x:cc[3]},{label:'Premio',x:cW+ML-2,align:'right'}
    ], '#2b6cb0');
    doc.setFontSize(7); doc.setFont('helvetica','normal');
    b.clientiDaChiamare.forEach(function(c) {
      checkPage(6);
      doc.setTextColor(0,0,0);
      doc.setFont('helvetica','bold'); doc.text((c.nome||'-').substring(0,22), cc[0], y+4); doc.setFont('helvetica','normal');
      doc.text((c.telefono||'-').substring(0,18), cc[1], y+4);
      doc.text((c.motivo||'-').substring(0,20), cc[2], y+4);
      doc.setFontSize(6); doc.text((c.polizza||'-').substring(0,28), cc[3], y+4); doc.setFontSize(7);
      doc.setFont('helvetica','bold'); doc.text(fC(c.premio), cW+ML-2, y+4, {align:'right'}); doc.setFont('helvetica','normal');
      doc.setDrawColor(226,232,240); doc.setLineWidth(0.1); doc.line(ML, y+5.5, ML+cW, y+5.5);
      y += 6;
    });
  } else { doc.setTextColor(56,161,105); doc.setFontSize(8); doc.text('Nessun cliente urgente.', ML+3, y+4); y+=7; }
  y += 4;

  // === SEZ 3: CROSS-SELLING ===
  checkPage(20);
  doc.setFillColor.apply(doc, sc('#f0fff4'));
  doc.rect(ML, y, cW, 6, 'F');
  doc.setTextColor.apply(doc, sc('#276749'));
  doc.setFontSize(9); doc.setFont('helvetica','bold');
  doc.text(' Cross-Selling (Top ' + b.topCross.length + ')', ML + 3, y + 4);
  y += 7;
  if (b.topCross.length > 0) {
    var cs = [ML+2, ML+40, ML+55, ML+95];
    tblHeader([
      {label:'Cliente',x:cs[0]},{label:'Pol.',x:cs[1]},{label:'Rami',x:cs[2]},{label:'Suggerimenti',x:cs[3]}
    ], '#276749');
    doc.setFontSize(7); doc.setFont('helvetica','normal');
    b.topCross.forEach(function(c) {
      checkPage(6);
      doc.setTextColor(0,0,0);
      doc.setFont('helvetica','bold'); doc.text((c.cliente||'-').substring(0,22), cs[0], y+4); doc.setFont('helvetica','normal');
      doc.text(''+c.polizzeAttuali, cs[1], y+4);
      doc.setFontSize(6); doc.text((c.rami||'-').substring(0,25), cs[2], y+4); doc.setFontSize(7);
      doc.setTextColor.apply(doc, sc('#276749'));
      doc.text(c.suggerimenti.join(', ').substring(0,50), cs[3], y+4);
      doc.setDrawColor(226,232,240); doc.setLineWidth(0.1); doc.line(ML, y+5.5, ML+cW, y+5.5);
      y += 6;
    });
  } else { doc.setFontSize(8); doc.text('Nessuna opportunita.', ML+3, y+4); y+=7; }
  y += 4;

  // === SEZ 4: PROVVIGIONI ===
  checkPage(20);
  doc.setFillColor.apply(doc, sc('#faf5ff'));
  doc.rect(ML, y, cW, 6, 'F');
  doc.setTextColor.apply(doc, sc('#553c9a'));
  doc.setFontSize(9); doc.setFont('helvetica','bold');
  doc.text('Performance Provvigioni', ML + 3, y + 4);
  y += 7;
  var cp = [ML+2, ML+42, ML+55, ML+85, ML+115, ML+145];
  tblHeader([
    {label:'Collaboratore',x:cp[0]},{label:'Pol.',x:cp[1]},{label:'Premi',x:cp[2]},{label:'Imponibile',x:cp[3]},{label:'Provvigioni',x:cp[4]},{label:'%',x:cp[5]}
  ], '#553c9a');
  doc.setFontSize(7); doc.setFont('helvetica','normal');
  b.collabList.forEach(function(c) {
    checkPage(6);
    doc.setTextColor(0,0,0);
    doc.setFont('helvetica','bold'); doc.text((c.nome||'-').substring(0,24), cp[0], y+4); doc.setFont('helvetica','normal');
    doc.text(''+c.numPolizze, cp[1], y+4);
    doc.text(fC(c.premi), cp[2], y+4);
    doc.text(fC(c.imponibile), cp[3], y+4);
    doc.setTextColor.apply(doc, sc('#553c9a'));
    doc.setFont('helvetica','bold'); doc.text(fC(c.provvigioni), cp[4], y+4); doc.setFont('helvetica','normal');
    doc.setTextColor(0,0,0);
    doc.text(c.percMedia.toFixed(1)+'%', cp[5], y+4);
    doc.setDrawColor(226,232,240); doc.setLineWidth(0.1); doc.line(ML, y+5.5, ML+cW, y+5.5);
    y += 6;
  });
  // Riga totale
  doc.setFillColor.apply(doc, sc('#553c9a'));
  doc.rect(ML, y, cW, 7, 'F');
  doc.setTextColor(255,255,255); doc.setFontSize(8); doc.setFont('helvetica','bold');
  doc.text('TOTALE', ML+3, y+5);
  doc.text(''+polizze.length, cp[1], y+5);
  doc.text(fC(b.premiTotali), cp[2], y+5);
  doc.text(fC(b.provvTotale), cp[4], y+5);
  y += 11;

  // === SEZ 5: COMPAGNIE ===
  checkPage(20);
  doc.setFillColor.apply(doc, sc('#fffbeb'));
  doc.rect(ML, y, cW, 6, 'F');
  doc.setTextColor.apply(doc, sc('#975a16'));
  doc.setFontSize(9); doc.setFont('helvetica','bold');
  doc.text('Andamento per Compagnia', ML + 3, y + 4);
  y += 7;
  var cg = [ML+2, ML+50, ML+68, ML+86, ML+108, ML+145];
  tblHeader([
    {label:'Compagnia',x:cg[0]},{label:'Polizze',x:cg[1]},{label:'Attive',x:cg[2]},{label:'Scadute',x:cg[3]},{label:'Premi',x:cg[4]},{label:'Quota',x:cg[5]}
  ], '#975a16');
  doc.setFontSize(7); doc.setFont('helvetica','normal');
  b.compList.forEach(function(c) {
    checkPage(6);
    var q = b.premiTotali > 0 ? (c.premi / b.premiTotali * 100) : 0;
    doc.setTextColor(0,0,0);
    doc.setFont('helvetica','bold'); doc.text((c.nome||'-').substring(0,28), cg[0], y+4); doc.setFont('helvetica','normal');
    doc.text(''+c.numPolizze, cg[1], y+4);
    doc.setTextColor(56,161,105); doc.text(''+c.attive, cg[2], y+4);
    doc.setTextColor(c.scadute>0?229:56, c.scadute>0?62:161, c.scadute>0?62:105); doc.text(''+c.scadute, cg[3], y+4);
    doc.setTextColor(0,0,0); doc.setFont('helvetica','bold'); doc.text(fC(c.premi), cg[4], y+4); doc.setFont('helvetica','normal');
    doc.text(q.toFixed(1)+'%', cg[5], y+4);
    doc.setDrawColor(226,232,240); doc.setLineWidth(0.1); doc.line(ML, y+5.5, ML+cW, y+5.5);
    y += 6;
  });
  y += 4;

  // === FOOTER ===
  doc.setTextColor(150,150,150); doc.setFontSize(7); doc.setFont('helvetica','normal');
  doc.text('Briefing Settimanale  -  FIM Insurance Broker S.a.s.  -  RUI Sez. B N. B000405449  -  Generato il ' + new Date().toLocaleDateString('it-IT'), W/2, H-8, {align:'center'});

  var filename = 'Briefing_FIM_' + b.dataRif + '.pdf';
  doc.save(filename);
  showToast('PDF scaricato: ' + filename);
}

