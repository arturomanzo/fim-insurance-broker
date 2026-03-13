/**
 * FIMA Chatbot Widget
 * Assistente AI per FIM Insurance Broker (www.fimbroker.it)
 * Powered by Claude claude-opus-4-6
 */
(function () {
  'use strict';

  // ─── Configurazione ──────────────────────────────────────────────────────────
  var FIMA_SYSTEM_PROMPT = [
    'Sei FIMA, l\'assistente AI di FIM Insurance Broker (www.fimbroker.it), un intermediario assicurativo professionale iscritto al RUI Sez. B con oltre 30 anni di esperienza.',
    '',
    'Il tuo ruolo è:',
    '• Orientare i visitatori sui servizi assicurativi FIM',
    '• Rispondere a domande sui rami assicurativi: RCA, vita, infortuni, casa, aziende, RC professionale, trasporti, agricoltura',
    '• Raccogliere richieste di preventivo',
    '• Fornire informazioni su sedi, orari e contatti',
    '',
    'Dati FIM Insurance Broker:',
    '• Sede principale: Via Roma 41, Cisterna di Latina (LT)',
    '• Sede secondaria: Firenze',
    '• RUI: B000405449 (Sez. B – Broker)',
    '• Compagnie partner: Allianz, Prima Assicurazioni, Bene Assicurazioni, DUAL/Arch e altre primarie compagnie',
    '• Sito web: www.fimbroker.it',
    '• Esperienza: oltre 30 anni nel settore',
    '',
    'Linee guida comportamentali:',
    '• Tono professionale ma accessibile e cordiale',
    '• Rispondi sempre in italiano',
    '• Non fornire mai consulenza vincolante né quotazioni precise: al termine di ogni scambio tecnico, ricorda sempre che per una proposta personalizzata è necessario contattare un broker FIM',
    '• Se l\'utente vuole un preventivo, raccogli: tipo di polizza, dati rilevanti (es. targa per RCA, indirizzo per casa, attività per aziende), e invita a contattare FIM',
    '• Sii conciso: risposte brevi e strutturate quando possibile',
    '• Non inventare numeri di telefono, email o prezzi specifici che non ti sono stati forniti',
  ].join('\n');

  var MODEL = 'claude-opus-4-6';
  var API_URL = 'https://api.anthropic.com/v1/messages';
  var LS_KEY_API = 'fima_chatbot_api_key';
  var LS_KEY_OPEN = 'fima_chatbot_open';

  // ─── Stato ───────────────────────────────────────────────────────────────────
  var messages = [];
  var isStreaming = false;

  // ─── CSS ─────────────────────────────────────────────────────────────────────
  var CSS = [
    /* Floating button */
    '#fima-chat-btn{position:fixed;bottom:24px;right:24px;width:60px;height:60px;border-radius:50%;background:linear-gradient(135deg,#1a365d 0%,#2b6cb0 100%);box-shadow:0 4px 20px rgba(26,54,93,.4);cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:9998;border:none;transition:transform .2s,box-shadow .2s;}',
    '#fima-chat-btn:hover{transform:scale(1.08);box-shadow:0 6px 28px rgba(26,54,93,.55);}',
    '#fima-chat-btn svg{width:28px;height:28px;fill:none;stroke:#fff;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;}',
    '#fima-chat-badge{position:absolute;top:0;right:0;width:18px;height:18px;background:#e53e3e;border-radius:50%;display:none;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#fff;border:2px solid #fff;}',
    /* Panel */
    '#fima-chat-panel{position:fixed;bottom:96px;right:24px;width:380px;max-width:calc(100vw - 32px);height:560px;max-height:calc(100vh - 120px);background:#fff;border-radius:16px;box-shadow:0 20px 60px rgba(0,0,0,.18);display:flex;flex-direction:column;z-index:9999;overflow:hidden;transition:opacity .2s,transform .2s;font-family:"Segoe UI",system-ui,-apple-system,sans-serif;}',
    '#fima-chat-panel.fima-hidden{opacity:0;transform:translateY(16px) scale(.97);pointer-events:none;}',
    /* Header */
    '#fima-chat-header{background:linear-gradient(135deg,#1a365d 0%,#2b6cb0 100%);padding:16px 16px 14px;display:flex;align-items:center;gap:12px;flex-shrink:0;}',
    '#fima-chat-avatar{width:40px;height:40px;border-radius:50%;background:#e8a838;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:14px;color:#1a365d;flex-shrink:0;}',
    '#fima-chat-info{flex:1;min-width:0;}',
    '#fima-chat-name{color:#fff;font-weight:700;font-size:15px;margin:0;}',
    '#fima-chat-status{color:rgba(255,255,255,.75);font-size:12px;margin:0;display:flex;align-items:center;gap:4px;}',
    '#fima-chat-status::before{content:"";width:7px;height:7px;background:#48bb78;border-radius:50%;display:inline-block;}',
    '#fima-chat-close{background:none;border:none;cursor:pointer;padding:4px;display:flex;align-items:center;justify-content:center;border-radius:6px;transition:background .15s;}',
    '#fima-chat-close:hover{background:rgba(255,255,255,.15);}',
    '#fima-chat-close svg{width:18px;height:18px;stroke:#fff;fill:none;stroke-width:2;stroke-linecap:round;}',
    /* API key banner */
    '#fima-api-banner{background:#fff8e1;border-bottom:1px solid #f6d860;padding:10px 14px;display:flex;align-items:center;gap:10px;font-size:12px;color:#744210;}',
    '#fima-api-banner input{flex:1;border:1px solid #e2d26b;border-radius:6px;padding:5px 8px;font-size:12px;background:#fff;}',
    '#fima-api-banner button{background:#e8a838;border:none;border-radius:6px;padding:5px 10px;font-size:12px;font-weight:600;color:#1a365d;cursor:pointer;white-space:nowrap;}',
    /* Messages area */
    '#fima-chat-messages{flex:1;overflow-y:auto;padding:16px 14px;display:flex;flex-direction:column;gap:10px;scroll-behavior:smooth;}',
    '#fima-chat-messages::-webkit-scrollbar{width:4px;}',
    '#fima-chat-messages::-webkit-scrollbar-track{background:transparent;}',
    '#fima-chat-messages::-webkit-scrollbar-thumb{background:#cbd5e0;border-radius:4px;}',
    /* Bubbles */
    '.fima-msg{max-width:88%;display:flex;flex-direction:column;gap:3px;}',
    '.fima-msg.fima-user{align-self:flex-end;align-items:flex-end;}',
    '.fima-msg.fima-bot{align-self:flex-start;align-items:flex-start;}',
    '.fima-bubble{padding:9px 13px;border-radius:14px;font-size:13.5px;line-height:1.55;word-break:break-word;white-space:pre-wrap;}',
    '.fima-user .fima-bubble{background:linear-gradient(135deg,#1a365d,#2b6cb0);color:#fff;border-bottom-right-radius:4px;}',
    '.fima-bot .fima-bubble{background:#f0f4f8;color:#2d3748;border-bottom-left-radius:4px;}',
    '.fima-time{font-size:10.5px;color:#a0aec0;padding:0 4px;}',
    /* Typing indicator */
    '.fima-typing .fima-bubble{display:flex;align-items:center;gap:4px;padding:11px 14px;}',
    '.fima-dot{width:7px;height:7px;background:#a0aec0;border-radius:50%;animation:fima-bounce .9s ease-in-out infinite;}',
    '.fima-dot:nth-child(2){animation-delay:.15s;}',
    '.fima-dot:nth-child(3){animation-delay:.30s;}',
    '@keyframes fima-bounce{0%,80%,100%{transform:translateY(0);}40%{transform:translateY(-6px);}}',
    /* Welcome chips */
    '#fima-welcome{padding:4px 0 8px;}',
    '#fima-welcome p{font-size:13px;color:#718096;margin:0 0 10px;}',
    '.fima-chips{display:flex;flex-wrap:wrap;gap:6px;}',
    '.fima-chip{background:#ebf4ff;border:1px solid #bee3f8;border-radius:20px;padding:5px 11px;font-size:12px;color:#2b6cb0;cursor:pointer;transition:background .15s;white-space:nowrap;}',
    '.fima-chip:hover{background:#bee3f8;}',
    /* Input area */
    '#fima-chat-input-area{border-top:1px solid #e2e8f0;padding:12px 14px;background:#fff;flex-shrink:0;}',
    '#fima-chat-form{display:flex;gap:8px;align-items:flex-end;}',
    '#fima-chat-input{flex:1;border:1.5px solid #e2e8f0;border-radius:12px;padding:9px 13px;font-size:13.5px;font-family:inherit;resize:none;max-height:100px;overflow-y:auto;outline:none;transition:border-color .2s;line-height:1.4;background:#f7fafc;}',
    '#fima-chat-input:focus{border-color:#2b6cb0;background:#fff;}',
    '#fima-send-btn{width:38px;height:38px;background:linear-gradient(135deg,#1a365d,#2b6cb0);border:none;border-radius:10px;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:opacity .2s;}',
    '#fima-send-btn:disabled{opacity:.45;cursor:not-allowed;}',
    '#fima-send-btn svg{width:17px;height:17px;fill:none;stroke:#fff;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;}',
    '#fima-chat-footer{text-align:center;font-size:10.5px;color:#a0aec0;padding:4px 0 0;}',
    '#fima-settings-area{padding:4px 0 0;text-align:right;}',
    '#fima-settings-link{font-size:10.5px;color:#a0aec0;cursor:pointer;text-decoration:underline;background:none;border:none;}',
  ].join('');

  // ─── Helpers ─────────────────────────────────────────────────────────────────
  function getApiKey() {
    return localStorage.getItem(LS_KEY_API) || '';
  }

  function setApiKey(key) {
    if (key) localStorage.setItem(LS_KEY_API, key.trim());
    else localStorage.removeItem(LS_KEY_API);
  }

  function now() {
    return new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function scrollToBottom() {
    var el = document.getElementById('fima-chat-messages');
    if (el) el.scrollTop = el.scrollHeight;
  }

  // ─── Render ───────────────────────────────────────────────────────────────────
  function renderMessage(role, text, id) {
    var cls = role === 'user' ? 'fima-user' : 'fima-bot';
    var div = document.createElement('div');
    div.className = 'fima-msg ' + cls;
    if (id) div.id = id;
    div.innerHTML =
      '<div class="fima-bubble">' + escapeHtml(text) + '</div>' +
      '<span class="fima-time">' + now() + '</span>';
    return div;
  }

  function renderTyping() {
    var div = document.createElement('div');
    div.className = 'fima-msg fima-bot fima-typing';
    div.id = 'fima-typing';
    div.innerHTML =
      '<div class="fima-bubble">' +
      '<span class="fima-dot"></span>' +
      '<span class="fima-dot"></span>' +
      '<span class="fima-dot"></span>' +
      '</div>';
    return div;
  }

  function addMessage(role, text) {
    var container = document.getElementById('fima-chat-messages');
    if (!container) return;
    // Remove welcome block if present
    var welcome = document.getElementById('fima-welcome');
    if (welcome) welcome.remove();
    var el = renderMessage(role, text);
    container.appendChild(el);
    scrollToBottom();
  }

  function showTyping() {
    var container = document.getElementById('fima-chat-messages');
    if (!container || document.getElementById('fima-typing')) return;
    var welcome = document.getElementById('fima-welcome');
    if (welcome) welcome.remove();
    container.appendChild(renderTyping());
    scrollToBottom();
  }

  function removeTyping() {
    var el = document.getElementById('fima-typing');
    if (el) el.remove();
  }

  // ─── Streaming bot reply ──────────────────────────────────────────────────────
  function updateBotBubble(msgEl, text) {
    var bubble = msgEl.querySelector('.fima-bubble');
    if (bubble) bubble.textContent = text;
    scrollToBottom();
  }

  function createBotMessageEl(text) {
    var container = document.getElementById('fima-chat-messages');
    if (!container) return null;
    var div = document.createElement('div');
    div.className = 'fima-msg fima-bot';
    div.innerHTML =
      '<div class="fima-bubble">' + escapeHtml(text) + '</div>' +
      '<span class="fima-time">' + now() + '</span>';
    container.appendChild(div);
    scrollToBottom();
    return div;
  }

  // ─── API call (streaming) ─────────────────────────────────────────────────────
  function sendToAPI(userText) {
    var apiKey = getApiKey();
    if (!apiKey) {
      addMessage('bot', 'Per attivare FIMA è necessario inserire una chiave API Anthropic nelle impostazioni (⚙️ in basso a destra).');
      return;
    }

    isStreaming = true;
    setInputEnabled(false);

    messages.push({ role: 'user', content: userText });
    showTyping();

    var body = JSON.stringify({
      model: MODEL,
      max_tokens: 1024,
      system: FIMA_SYSTEM_PROMPT,
      stream: true,
      messages: messages,
    });

    var xhr = new XMLHttpRequest();
    xhr.open('POST', API_URL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('x-api-key', apiKey);
    xhr.setRequestHeader('anthropic-version', '2023-06-01');
    // Required for browser-side requests
    xhr.setRequestHeader('anthropic-dangerous-direct-browser-access', 'true');

    var botMsgEl = null;
    var fullText = '';
    var lastIndex = 0;

    xhr.onreadystatechange = function () {
      if (xhr.readyState >= 3) {
        // Process new chunk(s)
        var chunk = xhr.responseText.substring(lastIndex);
        lastIndex = xhr.responseText.length;

        var lines = chunk.split('\n');
        for (var i = 0; i < lines.length; i++) {
          var line = lines[i];
          if (!line.startsWith('data: ')) continue;
          var data = line.slice(6).trim();
          if (data === '[DONE]') continue;
          try {
            var obj = JSON.parse(data);
            if (obj.type === 'content_block_delta' && obj.delta && obj.delta.type === 'text_delta') {
              var delta = obj.delta.text;
              if (delta) {
                fullText += delta;
                if (!botMsgEl) {
                  removeTyping();
                  botMsgEl = createBotMessageEl(fullText);
                } else {
                  updateBotBubble(botMsgEl, fullText);
                }
              }
            }
          } catch (e) {
            // Ignore JSON parse errors in partial chunks
          }
        }
      }
    };

    xhr.onload = function () {
      removeTyping();
      if (xhr.status !== 200) {
        var errMsg = 'Errore API (' + xhr.status + '). Verifica la chiave API nelle impostazioni.';
        if (xhr.status === 401) errMsg = 'Chiave API non valida. Controlla le impostazioni.';
        if (xhr.status === 429) errMsg = 'Limite di richieste superato. Riprova tra poco.';
        if (!botMsgEl) {
          addMessage('bot', errMsg);
        } else {
          updateBotBubble(botMsgEl, errMsg);
          fullText = errMsg;
        }
        messages.pop(); // Remove failed user message from history
      } else {
        if (!botMsgEl && fullText) {
          botMsgEl = createBotMessageEl(fullText);
        }
        if (fullText) {
          messages.push({ role: 'assistant', content: fullText });
        }
      }
      isStreaming = false;
      setInputEnabled(true);
      focusInput();
    };

    xhr.onerror = function () {
      removeTyping();
      addMessage('bot', 'Errore di connessione. Controlla la rete e riprova.');
      messages.pop();
      isStreaming = false;
      setInputEnabled(true);
    };

    xhr.send(body);
  }

  // ─── UI controls ─────────────────────────────────────────────────────────────
  function setInputEnabled(enabled) {
    var input = document.getElementById('fima-chat-input');
    var btn = document.getElementById('fima-send-btn');
    if (input) input.disabled = !enabled;
    if (btn) btn.disabled = !enabled;
  }

  function focusInput() {
    var input = document.getElementById('fima-chat-input');
    if (input) input.focus();
  }

  function submitMessage(text) {
    text = (text || '').trim();
    if (!text || isStreaming) return;
    var input = document.getElementById('fima-chat-input');
    if (input) input.value = '';
    autoResizeInput();
    addMessage('user', text);
    sendToAPI(text);
  }

  function autoResizeInput() {
    var input = document.getElementById('fima-chat-input');
    if (!input) return;
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 100) + 'px';
  }

  function togglePanel() {
    var panel = document.getElementById('fima-chat-panel');
    if (!panel) return;
    var isHidden = panel.classList.contains('fima-hidden');
    if (isHidden) {
      panel.classList.remove('fima-hidden');
      localStorage.setItem(LS_KEY_OPEN, '1');
      focusInput();
      checkApiBanner();
    } else {
      panel.classList.add('fima-hidden');
      localStorage.removeItem(LS_KEY_OPEN);
    }
  }

  function checkApiBanner() {
    var banner = document.getElementById('fima-api-banner');
    if (!banner) return;
    banner.style.display = getApiKey() ? 'none' : 'flex';
  }

  // ─── API key settings modal ───────────────────────────────────────────────────
  function showApiSettings() {
    var existing = document.getElementById('fima-settings-modal');
    if (existing) { existing.remove(); return; }

    var overlay = document.createElement('div');
    overlay.id = 'fima-settings-modal';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:10000;display:flex;align-items:center;justify-content:center;padding:16px;';

    var box = document.createElement('div');
    box.style.cssText = 'background:#fff;border-radius:14px;padding:24px;width:100%;max-width:400px;font-family:"Segoe UI",system-ui,sans-serif;box-shadow:0 20px 60px rgba(0,0,0,.25);';
    box.innerHTML = [
      '<h3 style="margin:0 0 6px;font-size:16px;color:#1a365d;">⚙️ Configurazione FIMA</h3>',
      '<p style="margin:0 0 16px;font-size:12.5px;color:#718096;">Inserisci la chiave API Anthropic per abilitare il chatbot FIMA.<br>La chiave viene salvata solo nel browser (localStorage).</p>',
      '<label style="font-size:13px;font-weight:600;color:#2d3748;display:block;margin-bottom:6px;">Anthropic API Key</label>',
      '<input id="fima-api-input" type="password" placeholder="sk-ant-..." style="width:100%;border:1.5px solid #e2e8f0;border-radius:8px;padding:9px 12px;font-size:13.5px;box-sizing:border-box;outline:none;" value="' + escapeHtml(getApiKey()) + '">',
      '<p style="font-size:11px;color:#e53e3e;margin:6px 0 16px;">⚠️ Attenzione: in un ambiente di produzione, non esporre mai la chiave API lato client. Usa un backend proxy.</p>',
      '<div style="display:flex;gap:10px;justify-content:flex-end;">',
      '<button id="fima-api-cancel" style="background:#f7fafc;border:1px solid #e2e8f0;border-radius:8px;padding:8px 16px;font-size:13px;cursor:pointer;color:#4a5568;">Annulla</button>',
      '<button id="fima-api-save" style="background:linear-gradient(135deg,#1a365d,#2b6cb0);border:none;border-radius:8px;padding:8px 18px;font-size:13px;font-weight:600;color:#fff;cursor:pointer;">Salva</button>',
      '</div>',
    ].join('');

    overlay.appendChild(box);
    document.body.appendChild(overlay);

    document.getElementById('fima-api-input').focus();
    document.getElementById('fima-api-input').addEventListener('keydown', function (e) {
      if (e.key === 'Enter') document.getElementById('fima-api-save').click();
    });
    document.getElementById('fima-api-cancel').addEventListener('click', function () { overlay.remove(); });
    document.getElementById('fima-api-save').addEventListener('click', function () {
      var val = document.getElementById('fima-api-input').value.trim();
      setApiKey(val);
      overlay.remove();
      checkApiBanner();
    });
    overlay.addEventListener('click', function (e) { if (e.target === overlay) overlay.remove(); });
  }

  // ─── Welcome chips ────────────────────────────────────────────────────────────
  var QUICK_QUESTIONS = [
    'Polizza RC Auto',
    'Assicurazione casa',
    'Preventivo azienda',
    'Dove siete?',
    'Polizza vita e infortuni',
  ];

  function buildWelcome() {
    var div = document.createElement('div');
    div.id = 'fima-welcome';
    div.innerHTML =
      '<p>Ciao! Sono <strong>FIMA</strong>, l\'assistente di <strong>FIM Insurance Broker</strong>. Come posso aiutarti oggi?</p>' +
      '<div class="fima-chips">' +
      QUICK_QUESTIONS.map(function (q) {
        return '<button class="fima-chip" data-q="' + escapeHtml(q) + '">' + escapeHtml(q) + '</button>';
      }).join('') +
      '</div>';
    return div;
  }

  // ─── Build DOM ────────────────────────────────────────────────────────────────
  function buildWidget() {
    // Inject styles
    var style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    // Floating button
    var btn = document.createElement('button');
    btn.id = 'fima-chat-btn';
    btn.title = 'Parla con FIMA';
    btn.setAttribute('aria-label', 'Apri chat FIMA');
    btn.innerHTML =
      '<svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>' +
      '<span id="fima-chat-badge" aria-hidden="true">!</span>';
    btn.addEventListener('click', togglePanel);
    document.body.appendChild(btn);

    // Chat panel
    var panel = document.createElement('div');
    panel.id = 'fima-chat-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Chat con FIMA');
    panel.classList.add('fima-hidden');

    panel.innerHTML = [
      // Header
      '<div id="fima-chat-header">',
      '  <div id="fima-chat-avatar">F</div>',
      '  <div id="fima-chat-info">',
      '    <p id="fima-chat-name">FIMA – FIM Insurance Broker</p>',
      '    <p id="fima-chat-status">Online</p>',
      '  </div>',
      '  <button id="fima-chat-close" aria-label="Chiudi chat">',
      '    <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
      '  </button>',
      '</div>',
      // API banner
      '<div id="fima-api-banner" style="display:none;">',
      '  <span>🔑 Inserisci la chiave API:</span>',
      '  <input id="fima-banner-key" type="password" placeholder="sk-ant-...">',
      '  <button id="fima-banner-save">Salva</button>',
      '</div>',
      // Messages
      '<div id="fima-chat-messages" role="log" aria-live="polite" aria-label="Messaggi chat"></div>',
      // Input
      '<div id="fima-chat-input-area">',
      '  <form id="fima-chat-form" autocomplete="off">',
      '    <textarea id="fima-chat-input" rows="1" placeholder="Scrivi un messaggio…" aria-label="Messaggio"></textarea>',
      '    <button type="submit" id="fima-send-btn" aria-label="Invia">',
      '      <svg viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>',
      '    </button>',
      '  </form>',
      '  <div id="fima-settings-area">',
      '    <button id="fima-settings-link" type="button">⚙️ Configura API</button>',
      '  </div>',
      '  <div id="fima-chat-footer">Powered by Claude AI · FIM Insurance Broker</div>',
      '</div>',
    ].join('');

    document.body.appendChild(panel);

    // Insert welcome block
    var messagesEl = document.getElementById('fima-chat-messages');
    messagesEl.appendChild(buildWelcome());

    // Wire events
    document.getElementById('fima-chat-close').addEventListener('click', togglePanel);

    var form = document.getElementById('fima-chat-form');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      submitMessage(document.getElementById('fima-chat-input').value);
    });

    var input = document.getElementById('fima-chat-input');
    input.addEventListener('input', autoResizeInput);
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        submitMessage(input.value);
      }
    });

    // Quick chips
    messagesEl.addEventListener('click', function (e) {
      var chip = e.target.closest('.fima-chip');
      if (chip) submitMessage(chip.dataset.q);
    });

    // Banner save
    document.getElementById('fima-banner-save').addEventListener('click', function () {
      var val = document.getElementById('fima-banner-key').value.trim();
      setApiKey(val);
      checkApiBanner();
    });

    // Settings link
    document.getElementById('fima-settings-link').addEventListener('click', showApiSettings);

    // Re-open if was open
    if (localStorage.getItem(LS_KEY_OPEN)) {
      panel.classList.remove('fima-hidden');
      checkApiBanner();
    }
  }

  // ─── Init ─────────────────────────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildWidget);
  } else {
    buildWidget();
  }
})();
