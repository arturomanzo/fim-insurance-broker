---
name: fim-linkedin-articolo
description: Scrive l'Articolo LinkedIn del lunedì per la pagina aziendale FIM — argomento originale che il blog non copre, prima persona, copertina e grafiche interne brandizzate, bozza pronta da incollare. Usa quando l'utente chiede "articolo LinkedIn", "l'articolo della settimana", oppure quando parte la routine schedulata del lunedì.
---

# FIM LinkedIn Articolo

Riempie la sezione **Articoli** della pagina aziendale
`linkedin.com/company/fim-insurance-broker-s-a-s-di-manzo-arturo-c`.

Un'uscita a settimana, il **lunedì**, con un **argomento originale**: dal
01/09/2026 l'Articolo non deriva più dal pezzo del blog — ha un argomento suo,
che sul sito non c'è. Arturo lo legge e lo pubblica lui.

Non è la stessa cosa del post breve del martedì e del giovedì — quella è
[`fim-linkedin-post`](../fim-linkedin-post/SKILL.md). Qui si scrive lungo, e
quello che si scrive resta nella libreria della Pagina anche fra due anni.

## La regola che tiene in piedi tutto: l'argomento non sta sul blog

Fino ad agosto 2026 l'Articolo era la riscrittura del pezzo del blog con un
angolo diverso, e il vincolo era non farsi indicizzare al posto del sito. Ora il
vincolo si risolve alla radice: l'argomento è originale, il testo esiste solo su
LinkedIn e Google non ha due copie fra cui scegliere.

Il corollario però resta. Se l'articolo LinkedIn copre lo stesso argomento di
una guida del blog — anche con parole tutte diverse — i due pezzi si contendono
la stessa ricerca, e fra linkedin.com e fimbroker.it vince LinkedIn, che ha
un'autorità di dominio più alta. Quindi la divisione è netta:

- il blog copre **la materia**: le guide sui prodotti, "cosa copre la polizza
  X", le keyword che una persona cerca su Google;
- LinkedIn copre **il mestiere**: quello che si vede dalla scrivania del broker.
  Equivoci ricorrenti, clausole che si scoprono tardi, scadenze normative in
  arrivo, dati IVASS e ANIA letti con l'occhio di chi le pratiche le gestisce,
  dinamiche del mercato assicurativo.

Il test è semplice: se l'argomento che hai in mente risponde alla domanda "cosa
copre la polizza X", è materia da blog. Lascialo al blog e scegline un altro.

## 1. Scegli l'argomento (e verifica che sia libero)

```bash
cd fim-broker-website && git pull
python3 -c "
import json
for p in json.load(open('data/blog-posts.json'))['posts']:
    print(p['date'], '|', p['title'])
"
grep -h -E '^(titolo|argomento):' public/social/linkedin/articoli/*/articolo.md
```

Tre controlli, tutti e tre bloccanti:

1. **non un argomento già coperto dal blog** (l'elenco sopra, oggi una
   quarantina di guide) — nemmeno "lo stesso ma raccontato da me": è la
   parafrasi con la firma cambiata;
2. **non un argomento già usato** negli articoli LinkedIn passati (il `grep`
   sulle bozze), e non lo stesso taglio delle ultime quattro settimane;
3. **non l'argomento che il blog ha pubblicato stamattina**: `posts[0]` esce il
   lunedì alle 08:00, la routine gira dopo apposta per poterlo leggere e girare
   al largo. Se la data di `posts[0]` non è di oggi, la Action del blog è
   saltata: per te non è più bloccante, ma scrivilo nel messaggio Telegram così
   Arturo lo sa.

Dove si pesca l'argomento, in ordine di resa:

- un **equivoco che i clienti portano in ufficio** (la polizza che credevano di
  avere, la garanzia che credevano compresa);
- una **scadenza normativa nei prossimi 60-90 giorni** che tocca famiglie, PMI
  o professionisti;
- un **dato fresco** IVASS, ANIA o di stampa di settore, con la lettura che ne
  dà un broker e non un comunicato;
- una **sentenza o un provvedimento** recente che cambia qualcosa nella pratica;
- una **dinamica del mercato** (premi che salgono, garanzie che spariscono dai
  contratti, compagnie che escono da un ramo).

Ogni articolo deve poter rispondere alla domanda **"perché proprio questo
lunedì"**: una stagionalità, una scadenza, un dato appena uscito. Se la risposta
è "così", l'argomento è debole — cambialo. E l'argomento buono ha dentro un
conflitto: un equivoco diffuso, un obbligo che nessuno conosce, una clausola che
si scopre tardi. Numeri, date e norme si verificano **sulla fonte primaria**
prima di scriverli — qui si firma con un numero RUI.

## 2. Scrivi

- **Titolo sotto i 100 caratteri.** Compare nella ricerca di LinkedIn e su
  Google: dentro ci va la parola che una persona cercherebbe davvero. Niente
  due punti con sottotitolo, niente "Guida completa 2026" — quello è il blog.
- **900-1.200 parole.** Sotto le 700 tanto vale un post; sopra le 1.400 lo
  finisce solo chi è pagato per farlo.
- **Le prime tre righe decidono.** LinkedIn mostra l'anteprima dell'articolo nel
  feed: se lì dentro non c'è una ragione per aprire, l'articolo non si apre.
  Parti da un fatto o da una scena, mai da una definizione.
- **Prima persona**: chi firma è un broker con vent'anni di pratiche sul tavolo,
  non una voce da manuale.
- **Sottotitoli ogni 200-250 parole**, in forma di frase e non di etichetta:
  "Il condominio non ti copre" funziona, "La polizza condominiale" no.
- **Tono del brand** (`CLAUDE.md`, sezione "Stile di scrittura"): il broker che
  spiega a un cliente davanti a un caffè. Vietate "fondamentale", "inoltre",
  "panorama", "in conclusione" e i loro cloni. Niente elenchi puntati dove basta
  il discorso, niente riassunto finale di rito.
- **Un numero vero, non tre.** Un dato verificato regge un articolo; tre dati
  buttati lì lo fanno sembrare un comunicato.
- **Chiudi con una domanda vera** e con il rimando al sito — regola fissa,
  vedi sotto.
- **Hashtag**: tre, alla fine, mai dentro il corpo.

**Il link al blog resta, ed è una regola fissa.** L'articolo originale, da solo,
non porta niente a fimbroker.it: il link sì. Chiudi sempre con il rimando alla
guida del blog **più affine** all'argomento: "Sul sito c'è la guida completa su
<materia>: <URL>". Con quaranta guide in archivio un pezzo affine c'è sempre;
l'URL è `https://www.fimbroker.it/blog/<slug>` e negli Articoli LinkedIn il link
nel corpo non penalizza (non è un post del feed).

**Cosa non si scrive mai.** Nomi di compagnie in chiave comparativa. Promesse di
copertura o di risparmio ("ti fa risparmiare il 30%"). Casi di clienti reali se
il caso è riconoscibile, nemmeno anonimizzato. Il claim "30+ compagnie": i
mandati e le collaborazioni sono **20**, l'elenco sta nel `CLAUDE.md`.

**Compliance IVASS.** L'articolo promuove il servizio di intermediazione, quindi
è comunicazione pubblicitaria ai sensi del **Reg. IVASS 40/2018**. Chiudi sempre
con `FIM Insurance Broker S.a.s. — iscritta al RUI Sez. B n. B000405449`.

## 3. Genera la copertina e le grafiche interne

Stesso endpoint dei post, rubrica dedicata:

```bash
curl -s "https://www.fimbroker.it/api/og/linkedin?rubrica=Approfondimento\
&title=<titolo o frase chiave, max 120 caratteri>\
&fonte=<fonte del dato, oppure niente>" -o copertina.png
```

Esce un PNG 1200x627 già firmato RUI — è il rapporto che LinkedIn usa per
l'anteprima nel feed. Con `dato=` e `label=` il numero diventa protagonista:
usali quando l'articolo ruota intorno a una cifra, lasciali fuori quando ruota
intorno a un'idea, così il titolo prende tutto lo spazio. In locale l'endpoint
gira su `http://localhost:3000`. La rotta sta in `app/api/og/linkedin/route.tsx`
e va tenuta in `API_GET_ALLOWED` del middleware, altrimenti risponde 405.

Oltre alla copertina, **una o due grafiche interne** con lo stesso endpoint,
salvate come `grafica-1.png` e `grafica-2.png`:

- se l'articolo ruota intorno a un numero, la card del dato:
  `?rubrica=Il dato&dato=<cifra>&label=<cosa misura>&title=<la lettura del
  numero in una frase>&fonte=<fonte primaria>`;
- la card della frase chiave: `?rubrica=Da ricordare&title=<la frase che il
  lettore deve portarsi via>` — una frase del testo, non uno slogan nuovo.

Al massimo una grafica ogni 400-500 parole. Se l'articolo non ha né un numero né
una frase che regga da sola, meglio la sola copertina di una grafica
riempitiva. Il corpo del testo resta pulito, **senza segnaposto**: dove va
inserita ciascuna grafica lo dice il frontmatter (campo `immagini`), perché
nell'editor di LinkedIn le immagini si trascinano a mano.

## 4. Salva la bozza

`fim-broker-website/public/social/linkedin/articoli/YYYY-MM-DD/` con dentro:

- `articolo.md` — frontmatter e sotto il testo integrale pronto da incollare;
- `copertina.png`, più le eventuali `grafica-1.png` e `grafica-2.png`.

Frontmatter: `titolo`, `argomento` (una riga: di cosa parla e con che taglio),
`perche-ora` (la ragione per cui esce questo lunedì), `link-affine` (titolo e
URL della guida blog richiamata in chiusura), `copertina`, `immagini` (per ogni
grafica: file e "va inserita dopo il titoletto ..."), `stato`,
`come-si-incolla`.

Cartella separata da quella dei post brevi apposta: sono due ritmi diversi e
serve poterli contare a colpo d'occhio.

**Il corpo va scritto senza markdown.** L'editor degli Articoli di LinkedIn non
interpreta il Markdown: incollato, un `## Titoletto` resta `## Titoletto` e un
`**grassetto**` mostra gli asterischi. Quindi niente cancelletti, niente
asterischi, niente trattini di elenco nel testo destinato al copia-incolla. I
titoletti sono righe brevi isolate, e su LinkedIn si selezionano e si marcano
con "Titolo 2" dalla barra. Scrivilo nel frontmatter, nel campo
`come-si-incolla`, così chi pubblica non deve ricordarselo.

## 5. Avvisa Arturo su Telegram

Stesso webhook dei post, con `giorno` che dichiara di che si tratta:

```bash
python3 -c "import json;print(json.dumps({'giorno':'Articolo di lunedì','tema':'<titolo>','post':open('articolo.md').read().split('---',2)[2].strip()[:2800],'cartella':'<path>','branch':'<branch>'},ensure_ascii=False))" > /tmp/bozza.json
curl -s -X POST https://n8n.srv1762577.hstgr.cloud/webhook/fim-linkedin-bozza \
  -H "Content-Type: application/json" --data-binary @/tmp/bozza.json
```

Il JSON si costruisce con `json.dumps` e si manda con `--data-binary @file`:
composto a mano, accenti e virgolette rompono la chiamata. Risposta attesa
`{"message":"Workflow was started"}`; un `404 webhook not registered` significa
che il workflow n8n «FIM — Bozza LinkedIn → Telegram» è da ripubblicare.

Un articolo intero non entra in un messaggio Telegram — il nodo accorcia a 3.200
caratteri e Telegram taglia a 4.096. Quindi qui si manda **l'apertura**, e il
testo completo si legge dal file nel branch. Nel messaggio dev'essere chiaro:
questo è l'inizio, il resto sta nella cartella — e se ci sono grafiche interne,
dillo, sennò chi pubblica incolla solo il testo.

## Come si pubblica (a mano, e per ora non si scappa)

Dalla Pagina FIM come amministratore: *Scrivi un articolo* → titolo, copertina,
corpo → le grafiche interne si trascinano nel punto indicato dal frontmatter →
*Pubblica*. LinkedIn crea da solo il post nel feed che rilancia l'articolo. **Il
primo commento è il posto giusto per il link al sito**, come nei post brevi.

Pubblicare via API su una *pagina aziendale* richiede la Community Management
API, pratica avviata il 19/08/2026 e ancora in attesa. Vale anche per gli
Articoli. E quando l'accesso arriverà, la regola resta quella scritta nella
scheda della routine: **solo pubblicazione, mai gli endpoint di analytics**.

## Checklist prima di consegnare

- [ ] L'argomento non è coperto dal blog (nemmeno riscritto) né dagli articoli passati
- [ ] L'argomento risponde a "perché proprio questo lunedì"
- [ ] Titolo sotto i 100 caratteri, con dentro la parola che si cercherebbe
- [ ] Le prime tre righe danno una ragione per aprire
- [ ] 900-1.200 parole, prima persona, sottotitoli in forma di frase
- [ ] Nessuna parola da AI, nessun elenco puntato dove bastava una frase
- [ ] Numeri, date e norme verificati sulla fonte primaria
- [ ] Link alla guida blog più affine nel corpo, in chiusura
- [ ] Firma RUI in chiusura, tre hashtag
- [ ] Corpo senza markdown e senza segnaposto: titoletti come righe isolate
- [ ] Copertina 1200x627 leggibile in miniatura; grafiche interne solo se reggono da sole
- [ ] Frontmatter completo: argomento, perche-ora, link-affine, immagini con posizione
- [ ] Bozza salvata in `public/social/linkedin/articoli/<data>/`
