---
name: fim-substack
description: Prepara le tre uscite settimanali della newsletter Substack di FIM (fiminsurancebroker.substack.com) — mercoledì il caso dietro le quinte, venerdì la domanda spiegata, domenica "Assicurazioni, senza complicazioni" — con testo pronto da incollare e copertina generata. Usa quando l'utente chiede "articoli Substack", "la newsletter di domenica", "il pezzo del venerdì", oppure quando parte la routine settimanale del lunedì.
---

# FIM Substack

Newsletter: https://fiminsurancebroker.substack.com. Firma Arturo, in prima persona.
Pubblica sempre Arturo: la routine prepara bozze, non tocca Substack.

## La settimana (decisa da Arturo il 07/11/2026)

**Mercoledì — il caso dietro le quinte.** 550-700 parole. Struttura: scena, cosa
avevamo in mano, "Cosa dice la legge", tre controlli, invito a rispondere alla
mail, firma "Arturo", footer RUI e riga "I casi raccontati sono reali, con
dettagli modificati...". **Il caso deve essere vero e venire da Arturo.** Se in
`piano.md` non ci sono fatti suoi per quella data, non si inventa niente: si
scrive un pezzo senza caso, in formato venerdì, e lo si segnala nel frontmatter.

**Venerdì — la domanda.** 550-700 parole, senza caso. Modello: "Chi mi paga quando
ti vendo una polizza" (31/10) e "Quando ti dico di non comprare niente" (13/11).
Una domanda che il cliente dovrebbe fare e non fa, la risposta breve subito, il
dietro le quinte onesto del mestiere, "Cosa dice la legge" con la norma letta,
tre controlli o tre domande, invito a rispondere alla mail.

**Domenica — "Assicurazioni, senza complicazioni".** 550-700 parole, voce "noi".
Sezioni in maiuscolo: SCADENZE (tre voci), IL CASO DEL MESE (storia dichiarata
inventata, con la frase "una storia inventata di sana pianta: nessun cliente,
nessun dato vero"), NOVITÀ E NORMATIVA IN 3 MINUTI (due notizie), "Fonti
ufficiali (verificate il ...)" con gli URL, "Alla prossima domenica.", firma
"FIM Insurance Broker - www.fimbroker.it". Niente numerazione dei numeri ("il
sesto numero"): non sappiamo se Arturo ha saltato una domenica.

## 1. Cosa preparare

La routine gira il lunedì e prepara la settimana **successiva** (mer, ven, dom).
Per ogni data:

- se la cartella `fim-broker-website/public/social/substack/YYYY-MM-DD/` ha già
  `articolo.md`, salta;
- se la data è fra "Già programmati su Substack" in `piano.md`, salta;
- altrimenti scrivi.

Prima di scegliere un tema leggi l'archivio pubblicato, che è la fonte vera:

```bash
curl -s "https://fiminsurancebroker.substack.com/api/v1/archive?sort=new&limit=12" \
  | python3 -c "import json,sys;[print(p['post_date'][:10],p['title']) for p in json.load(sys.stdin)['posts']]"
```

(`limit` massimo 12; il testo di un'uscita da `/api/v1/posts/<slug>`, campo `body_html`.)
Leggi anche `piano.md` e le cartelle di `public/social/linkedin/` delle ultime tre
settimane: nessun tema già uscito su Substack, niente doppioni a ridosso di LinkedIn.

## 2. Fonti e norme

- Ogni norma citata si legge sul testo vigente prima di scrivere. Normattiva:
  la pagina dell'atto non contiene il testo degli articoli; si scarica
  `https://www.normattiva.it/esporta/attoCompleto?...` (per il CAP funziona
  intero) oppure il singolo articolo da
  `https://www.normattiva.it/atto/caricaArticolo?...&art.idArticolo=<n>...`
  (il link esatto sta nell'HTML della pagina dell'atto, con i cookie della
  stessa sessione). I PDF IVASS si leggono con PDFKit via `swift`.
- Ogni norma va in `fim-broker-website/data/norme-citabili.json` in stato
  `verificata`, con fonte e data; poi `npm test` dentro `fim-broker-website`.
- Per la domenica: scadenze e notizie solo da fonte primaria (ivass.it,
  agenziaentrate.gov.it, inps.it, mimit.gov.it, gazzettaufficiale.it), con
  l'URL nella sezione fonti. Un numero di mercato esce solo con la fonte nella
  stessa frase. Se una notizia non si verifica, non esce.
- Niente nomi di compagnie in chiave comparativa. Mai citare Dalbogg. Su
  WAKAM vale l'ultimo comunicato IVASS letto.

## 3. Scrivi

Stile da `CLAUDE.md`, sezione "Stile di scrittura", più il pass di
`fim-humanizer`: niente "fondamentale", "inoltre", "panorama", "in conclusione",
frasi brevi, niente riassunto finale, il broker che parla a un cliente.

Il file `articolo.md` ha questo frontmatter:

```
titolo / sottotitolo / rubrica / argomento / uscita-proposta (giorno, data, 07:00)
fonti (norme e URL, con la data di lettura) / immagine / stato: bozza da approvare
da-confermare-arturo (ogni frase che lo impegna o che afferma la sua esperienza)
come-si-incolla (quali righe sono titoletti ed elenchi nell'editor di Substack)
```

Il corpo è testo semplice senza markdown: le righe brevi isolate sono i
titoletti. Footer dei pezzi di mercoledì e venerdì:

```
FIM Insurance Broker S.A.S. — intermediario assicurativo iscritto al RUI, Sez. B, n. B000405449, soggetto alla vigilanza IVASS. fimbroker.it
```

poi la riga sullo scopo informativo, e per ultima
`Immagine generata con intelligenza artificiale.` (AI Act, art. 50).

## 4. Copertina

Higgsfield `generate_image_batch`, modello `gpt_image_2_6`. Mercoledì e venerdì
`16:9`, domenica `21:9`. Fotografia editoriale, luce calda, ambientazione italiana
credibile, nessun testo, nessun logo, nessuna targa, nessuna persona
riconoscibile (mani e figure di spalle vanno bene). Mai un fatto di cronaca reale
fatto passare per foto. Salva come `copertina.png` nella cartella della data e
guardala prima di consegnare: se ha testo o difetti, rigenerala.

## 5. Consegna

Branch `claude/substack-<data del lunedì>`, commit di cartelle, `piano.md`
aggiornato e registro norme. Niente PR se Arturo non la chiede. Poi avviso su
Telegram con il webhook n8n già usato da LinkedIn, un POST per uscita:

```bash
python3 -c "import json;print(json.dumps({'giorno':'...','tema':'Substack — ...','post':open('articolo.md').read().split('---',2)[2].strip(),'cartella':'...','branch':'...'},ensure_ascii=False))" > /tmp/bozza.json
curl -s -X POST https://n8n.srv1762577.hstgr.cloud/webhook/fim-linkedin-bozza \
  -H "Content-Type: application/json" --data-binary @/tmp/bozza.json
```

Il nodo taglia a 3.200 caratteri: per i pezzi lunghi Arturo apre il file dal branch.

## Checklist

- [ ] Nessun caso inventato presentato come vero; la domenica dichiara il suo come inventato
- [ ] Ogni norma letta sul testo vigente e presente nel registro, `npm test` verde
- [ ] Ogni scadenza e notizia della domenica con URL di fonte primaria aperto
- [ ] Tema non già uscito su Substack né su LinkedIn nelle ultime tre settimane
- [ ] 550-700 parole, nessuna parola vietata, nessun riassunto finale
- [ ] Copertina guardata, senza testo, riga sull'immagine generata con IA
- [ ] `da-confermare-arturo` compilato
