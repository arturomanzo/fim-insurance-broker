---
name: fim-linkedin-articolo
description: Trasforma l'articolo settimanale del blog di fimbroker.it in un Articolo LinkedIn per la pagina aziendale FIM — angolo diverso, prima persona, copertina brandizzata, bozza pronta da incollare. Usa quando l'utente chiede "articolo LinkedIn", "l'articolo della settimana", "riscrivi il blog per LinkedIn", oppure quando parte la routine schedulata del lunedì.
---

# FIM LinkedIn Articolo

Riempie la sezione **Articoli** della pagina aziendale
`linkedin.com/company/fim-insurance-broker-s-a-s-di-manzo-arturo-c`.

Un'uscita a settimana, il **lunedì**. Il blog del sito pubblica il suo articolo
lunedì alle 08:00 (GitHub Actions `weekly-blog.yml`); questa skill gira dopo, lo
prende e ne ricava la versione LinkedIn. Arturo la legge e la pubblica lui.

Non è la stessa cosa del post breve del martedì e del giovedì — quella è
[`fim-linkedin-post`](../fim-linkedin-post/SKILL.md). Qui si scrive lungo, e
quello che si scrive resta nella libreria della Pagina anche fra due anni.

## La regola che tiene in piedi tutto: non è una copia

L'articolo LinkedIn e l'articolo del blog **non devono avere lo stesso testo**.
Se lo hanno, Google si trova due copie dello stesso contenuto e sceglie lui
quale indicizzare — e LinkedIn ha un'autorità di dominio che fimbroker.it non
può reggere. Vincerebbe LinkedIn, e il sito perderebbe la posizione che si è
guadagnato.

Quindi il blog resta la fonte, e la versione LinkedIn è un pezzo diverso:

- **angolo diverso**: il blog spiega la materia, LinkedIn racconta il mestiere.
  Dove il blog scrive "cosa copre la polizza", qui si scrive "cosa ho visto
  succedere a chi non ce l'aveva";
- **prima persona**: chi firma è un broker con vent'anni di pratiche sul tavolo,
  non una voce da manuale;
- **un solo filo**: il blog copre sei sezioni, l'articolo LinkedIn ne prende una
  e la porta fino in fondo. Meglio una cosa detta bene che sei accennate;
- **rimando esplicito** all'articolo completo su fimbroker.it, con il link vero
  nel corpo (negli Articoli LinkedIn il link nel testo non penalizza: non è un
  post del feed).

Se al terzo paragrafo ti accorgi di stare parafrasando il blog, fermati e
cambia angolo. La parafrasi è la copia con le parole spostate.

## 1. Prendi l'articolo della settimana

```bash
cd fim-broker-website && git pull
python3 -c "
import json
p = json.load(open('data/blog-posts.json'))['posts'][0]
print(p['date'], '|', p['title'], '|', p['slug'])
for s in p['sections']:
    print('##', s['heading']); print(s['body']); print()
"
```

`posts[0]` è il più recente. Se la data non è di oggi, la GitHub Action del
lunedì non è ancora passata o è fallita: **fermati e segnalalo**, non ripescare
un articolo vecchio. L'URL pubblico è `https://www.fimbroker.it/blog/<slug>`.

Poi leggi le bozze già in `public/social/linkedin/articoli/` e non riprendere
un angolo usato nelle ultime quattro settimane. Il blog cambia tema ogni
settimana, ma il taglio ("l'errore che vedo più spesso") si logora in fretta.

## 2. Scegli l'angolo

Dalle sezioni del blog, tieni quella che ha dentro un conflitto: un equivoco
diffuso, un obbligo che nessuno conosce, una clausola che si scopre tardi.
Nell'articolo sulla RC del proprietario di immobile, per dire, il pezzo vivo non
è "cosa copre": è che la polizza del condominio non copre il tuo appartamento e
quasi nessuno lo sa.

Se nessuna sezione ha un conflitto dentro, prendi la materia del blog e cercalo
altrove: una scadenza in arrivo, un dato IVASS o ANIA fresco, una sentenza. Ma
verifica sempre sulla fonte primaria prima di scriverlo — qui si firma con un
numero RUI.

## 3. Scrivi

- **Titolo sotto i 100 caratteri.** Compare nella ricerca di LinkedIn e su
  Google: dentro ci va la parola che una persona cercherebbe davvero. Niente
  due punti con sottotitolo, niente "Guida completa 2026" — quello è il blog.
- **900-1.200 parole.** Sotto le 700 tanto vale un post; sopra le 1.400 lo
  finisce solo chi è pagato per farlo.
- **Le prime tre righe decidono.** LinkedIn mostra l'anteprima dell'articolo nel
  feed: se lì dentro non c'è una ragione per aprire, l'articolo non si apre.
  Parti da un fatto o da una scena, mai da una definizione.
- **Sottotitoli ogni 200-250 parole**, in forma di frase e non di etichetta:
  "Il condominio non ti copre" funziona, "La polizza condominiale" no.
- **Tono del brand** (`CLAUDE.md`, sezione "Stile di scrittura"): il broker che
  spiega a un cliente davanti a un caffè. Vietate "fondamentale", "inoltre",
  "panorama", "in conclusione" e i loro cloni. Niente elenchi puntati dove basta
  il discorso, niente riassunto finale di rito.
- **Un numero vero, non tre.** Un dato verificato regge un articolo; tre dati
  buttati lì lo fanno sembrare un comunicato.
- **Chiudi con una domanda vera** e con il rimando: "Sul sito ho scritto la
  versione lunga, con i massimali e le esclusioni: <URL del blog>".
- **Hashtag**: tre, alla fine, mai dentro il corpo.

**Cosa non si scrive mai.** Nomi di compagnie in chiave comparativa. Promesse di
copertura o di risparmio ("ti fa risparmiare il 30%"). Casi di clienti reali se
il caso è riconoscibile, nemmeno anonimizzato. Il claim "30+ compagnie": i
mandati e le collaborazioni sono **20**, l'elenco sta nel `CLAUDE.md`.

**Compliance IVASS.** L'articolo promuove il servizio di intermediazione, quindi
è comunicazione pubblicitaria ai sensi del **Reg. IVASS 40/2018**. Chiudi sempre
con `FIM Insurance Broker S.a.s. — iscritta al RUI Sez. B n. B000405449`.

## 4. Genera la copertina

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

## 5. Salva la bozza

`fim-broker-website/public/social/linkedin/articoli/YYYY-MM-DD/` con dentro:

- `articolo.md` — frontmatter (titolo, angolo, articolo di origine e suo URL,
  data) e sotto il testo integrale pronto da incollare;
- `copertina.png`.

Cartella separata da quella dei post brevi apposta: sono due ritmi diversi e
serve poterli contare a colpo d'occhio.

**Il corpo va scritto senza markdown.** L'editor degli Articoli di LinkedIn non
interpreta il Markdown: incollato, un `## Titoletto` resta `## Titoletto` e un
`**grassetto**` mostra gli asterischi. Quindi niente cancelletti, niente
asterischi, niente trattini di elenco nel testo destinato al copia-incolla. I
titoletti sono righe brevi isolate, e su LinkedIn si selezionano e si marcano
con "Titolo 2" dalla barra. Scrivilo nel frontmatter, nel campo
`come-si-incolla`, così chi pubblica non deve ricordarselo.

## 6. Avvisa Arturo su Telegram

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
questo è l'inizio, il resto sta nella cartella.

## Come si pubblica (a mano, e per ora non si scappa)

Dalla Pagina FIM come amministratore: *Scrivi un articolo* → titolo, copertina,
corpo → *Pubblica*. LinkedIn crea da solo il post nel feed che rilancia
l'articolo. **Il primo commento è il posto giusto per il link al sito**, come nei
post brevi.

Pubblicare via API su una *pagina aziendale* richiede la Community Management
API, pratica avviata il 19/08/2026 e ancora in attesa. Vale anche per gli
Articoli. E quando l'accesso arriverà, la regola resta quella scritta nella
scheda della routine: **solo pubblicazione, mai gli endpoint di analytics**.

## Checklist prima di consegnare

- [ ] Il testo non è una parafrasi del blog: angolo diverso, prima persona, un solo filo
- [ ] Titolo sotto i 100 caratteri, con dentro la parola che si cercherebbe
- [ ] Le prime tre righe danno una ragione per aprire
- [ ] 900-1.200 parole, sottotitoli in forma di frase
- [ ] Nessuna parola da AI, nessun elenco puntato dove bastava una frase
- [ ] Numeri e date verificati sulla fonte primaria
- [ ] Link all'articolo completo del blog nel corpo
- [ ] Firma RUI in chiusura, tre hashtag
- [ ] Corpo senza markdown: niente `#`, niente `**`, titoletti come righe isolate
- [ ] Copertina 1200x627 leggibile in miniatura
- [ ] Angolo diverso dalle ultime quattro settimane
- [ ] Bozza salvata in `public/social/linkedin/articoli/<data>/`
