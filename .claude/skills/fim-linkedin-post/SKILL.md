---
name: fim-linkedin-post
description: Prepara il post LinkedIn per la pagina aziendale FIM Insurance Broker — sceglie il tema di attualità, scrive il testo nel tono del brand, genera l'immagine e salva la bozza pronta da pubblicare. Usa quando l'utente chiede "post LinkedIn", "bozza per LinkedIn", "prepara il post di martedì/giovedì", oppure quando parte la routine schedulata del lunedì/mercoledì sera.
---

# FIM LinkedIn Post

Routine editoriale della pagina aziendale
`linkedin.com/company/fim-insurance-broker-s-a-s-di-manzo-arturo-c`.

Due uscite a settimana, **martedì e giovedì**. La bozza si prepara la sera prima
(lunedì e mercoledì); Arturo la legge la mattina e pubblica lui.

## Le due rubriche

**Martedì — "Il fatto".** Attualità o normativa, con un numero in evidenza.
Si parte dal dato e si arriva a cosa cambia per chi legge.
Immagine: card brandizzata (vedi sotto).

**Giovedì — "Tradotto in italiano".** La stessa materia portata a terra: il caso
concreto, l'errore visto in agenzia, la clausola che nessuno legge. Quando c'è un
articolo fresco sul blog, il giovedì lo rilancia e porta traffico su fimbroker.it.
Immagine: generata con Higgsfield.

## 1. Scegli il tema

In ordine, finché non esce qualcosa di buono:

1. **Watcher IVASS** — tabella Supabase `ivass_watcher_state`: item degli ultimi
   10 giorni con priorità `high` o `medium`. È già triagiato, è già rilevante.
2. **WebSearch sull'attualità** italiana assicurativa degli ultimi 7 giorni
   (IVASS, ANIA, Gazzetta, stampa di settore, MIMIT per le catastrofali).
3. **Stagionalità e scadenze**: grandine e temporali a fine estate, check-up al
   rientro di settembre, rinnovi di fine anno, Legge di Bilancio a dicembre.
4. **Blog FIM** — `fim-broker-website/data/blog-posts.json`, l'articolo più recente.

Prima di scrivere, leggi le bozze già uscite in
`fim-broker-website/public/social/linkedin/` e **non ripetere un tema toccato
nelle ultime tre settimane**. Se due fonti si contraddicono su una data o una
cifra, verifica sulla fonte primaria (ivass.it, mimit.gov.it, Gazzetta) prima di
scrivere: qui si firma con un numero RUI.

## 2. Scrivi il post

- **Prime due righe = tutto.** LinkedIn taglia intorno ai 200 caratteri con "…altro".
  Se l'aggancio non è lì dentro, il post è morto.
- **1.200-1.800 caratteri.** Sotto sembra uno slogan, sopra non lo legge nessuno.
- **Righe corte, molti a capo.** Sul telefono un paragrafo di sei righe è un muro.
- **Tono del brand** (vedi `CLAUDE.md`, sezione "Stile di scrittura"): il broker
  che parla a un cliente davanti a un caffè. Mai le parole da AI — "fondamentale",
  "inoltre", "panorama", "in conclusione" e cloni. Niente riassunto finale di rito.
- **Un solo messaggio per post.** Se ne hai due, hai due post.
- **Chiudi con una domanda vera**, di quelle a cui un imprenditore risponde davvero.
- **3 hashtag**, non 12. Es. `#assicurazioni #PMI #broker`.
- **Link**: se l'obiettivo è traffico al blog, il link va nel corpo; se l'obiettivo
  è reach, va nel primo commento. Dichiara sempre quale delle due scelte hai fatto.
- **Niente nomi di compagnie** in chiave comparativa, niente promesse di copertura,
  niente dati di clienti reali nemmeno anonimizzati se il caso è riconoscibile.

**Compliance IVASS.** Se il post promuove un prodotto o un servizio, è
comunicazione pubblicitaria di intermediario (Reg. IVASS 40/2018): chiudi con
`FIM Insurance Broker S.a.s. — iscritta al RUI Sez. B n. B000405449`.
Sui post puramente informativi non serve, ma non fa danno.

## 3. Genera l'immagine

**Card brandizzata (martedì).** Endpoint del sito, nessun tool esterno:

```
https://www.fimbroker.it/api/og/linkedin
  ?dato=1.499
  &label=ricorsi all'Arbitro in 4 mesi
  &title=Prima di fare causa alla compagnia c'è un passaggio che quasi nessuno fa bene
  &rubrica=Il fatto
  &fonte=IVASS, maggio 2026
```

Esce PNG 1200x627 già firmato RUI. In locale gira su `http://localhost:3000`.
Il `dato` è opzionale: senza, il titolo diventa grande e la card fa da copertina.
La rotta è in `app/api/og/linkedin/route.tsx` ed è nell'allowlist GET del
middleware — se ne aggiungi altre, ricordati `API_GET_ALLOWED` in `middleware.ts`.

**Immagine generata (giovedì).** Higgsfield `generate_image`, formato landscape.
Fotografia editoriale o illustrazione, luce naturale, ambientazione italiana
credibile (capannone, cantiere, negozio, porto, studio professionale). Mai stock
americano, mai gente in giacca che stringe mani, mai grafica con testo dentro —
il testo lo sbaglia sempre. Poi converti: `sips -s format jpeg <file>.png --out <file>.jpg`.

## 4. Salva la bozza

`fim-broker-website/public/social/linkedin/YYYY-MM-DD/` con dentro:

- `post.md` — testo pronto da incollare, più una riga con tema, fonte, tipo di
  immagine e dove va il link;
- l'immagine (`card.png` oppure `immagine.jpg`).

Cartella pubblica di proposito: serve URL raggiungibili da fuori il giorno in cui
si automatizza la pubblicazione via API. Stesso schema del carosello Instagram in
`public/social/carosello-clima-2026-08/`.

## 5. Avvisa Arturo su Telegram

POST al webhook n8n, che gira il messaggio sul suo Telegram:

```bash
python3 -c "import json;print(json.dumps({'giorno':'...','tema':'...','post':open('post.md').read().split('---',2)[2].strip(),'cartella':'...','branch':'...'},ensure_ascii=False))" > /tmp/bozza.json
curl -s -X POST https://n8n.srv1762577.hstgr.cloud/webhook/fim-linkedin-bozza \
  -H "Content-Type: application/json" --data-binary @/tmp/bozza.json
```

Il JSON si costruisce con `json.dumps` e si manda con `--data-binary @file`:
composto a mano, accenti e virgolette rompono la chiamata. Risposta attesa
`{"message":"Workflow was started"}`; un `404 webhook not registered` significa
che il workflow n8n «FIM — Bozza LinkedIn → Telegram» è da ripubblicare.

Il campo `post` contiene il testo INTEGRALE, così Arturo lo legge e lo copia dal
telefono senza aprire il Mac. Telegram taglia a 4096 caratteri e il nodo accorcia
il post a 3.200, quindi non allegare altro al messaggio.

## Quando arriverà l'accesso API (vincolo)

La richiesta Community Management API inviata a LinkedIn il 19 agosto 2026
dichiara due casi d'uso, Page management e **Page analytics**. Il secondo c'è per
un errore di compilazione e il form non è più modificabile.

**La routine non deve usare gli endpoint di analytics.** Nemmeno quando
l'accesso sarà concesso: si pubblica e basta. Le statistiche dei post, se
servono, si guardano a mano dalla Pagina. Se un giorno si chiede lo Standard
Tier, nel nuovo form si dichiara **solo Page management**.

## Checklist prima di consegnare

- [ ] L'aggancio sta nei primi 200 caratteri
- [ ] Nessuna parola da AI, nessun elenco puntato dove bastava una frase
- [ ] Numeri e date verificati sulla fonte primaria, fonte citata nel post
- [ ] Firma RUI se il post è promozionale
- [ ] Immagine 1200x627, leggibile anche in miniatura
- [ ] Tema diverso dalle ultime tre settimane
- [ ] Bozza salvata nella cartella della data giusta
