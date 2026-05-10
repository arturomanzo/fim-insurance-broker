---
name: fim-ivass-watcher
description: Monitora novità IVASS, ANIA, Gazzetta Ufficiale e stampa di settore assicurativo italiano. Produce un report delle ultime novità con valutazione di impatto sui clienti FIM e suggerimenti di contenuti blog/newsletter. Usa quando l'utente chiede "controlla novità IVASS", "cosa c'è di nuovo nel settore assicurativo", "aggiornamenti normativi", "trend di settore", "idee per articoli blog".
---

# FIM IVASS Watcher

Skill per monitorare l'ecosistema assicurativo italiano e trasformare le novità in contenuti utili per il blog, la newsletter o la consulenza ai clienti di FIM Insurance Broker.

## Cosa fa

Questa skill:
1. Scansiona fonti ufficiali e di settore per novità recenti
2. Filtra per rilevanza sul target FIM (famiglie, professionisti, PMI, condomini)
3. Produce un report settimanale con priorità e suggerimenti operativi

**Importante:** non automatizzi la pubblicazione. Produci bozze e segnalazioni che l'umano decide se e come usare.

## Fonti da monitorare

### Fonti ufficiali (massima priorità)
- **IVASS — Comunicati e provvedimenti**: https://www.ivass.it/media/avviso/
- **IVASS — Normativa**: https://www.ivass.it/normativa/
- **Gazzetta Ufficiale — Serie Generale** (filtrata per keyword "assicuraz", "polizza", "IVASS", "IDD")
- **ANIA — Notizie**: https://www.ania.it/press-area/comunicati-stampa
- **EIOPA** (per direttive UE che impatteranno l'Italia): https://www.eiopa.europa.eu/

### Stampa di settore
- **Insurance Daily**: https://www.insurancedaily.it
- **Assinews**: https://www.assinews.it
- **Intermediari Assicurativi**: https://www.intermediariassicurativi.it
- **Broker e Professionisti**: https://www.brokereprofessionisti.com

### Fonti economiche (per contesto)
- **Il Sole 24 Ore — Assicurazioni**
- **Milano Finanza — settore insurance**

## Workflow

### 1. Definisci finestra temporale

Chiedi all'utente il periodo di riferimento se non specificato:
- "Ultima settimana" (default)
- "Ultimo mese"
- "Da una data specifica"

### 2. Scansiona le fonti

Usa `WebSearch` e `WebFetch` per:
- Cercare su Google con query tipo `site:ivass.it "provvedimento" after:YYYY-MM-DD`
- Fetchare le pagine news delle fonti principali
- Estrarre titoli, date, link, abstract

**Regole di fetch:**
- Limita a 3-5 fonti per sessione per evitare rate limiting
- Se una fonte è down, passa oltre e segnalalo nel report
- Deduplica: stessa news da più fonti = una sola voce

### 3. Filtra per rilevanza FIM

Non tutto è rilevante. Tieni solo contenuti che rispondono a **almeno una** di queste domande:

- Impatta clienti famiglie / privati?
- Impatta clienti professionisti / PMI / condomini?
- È un obbligo nuovo o in scadenza?
- Crea opportunità di cross-selling?
- È un topic ad alto volume di ricerca su Google (valuta con WebSearch)?

**Scarta:**
- News solo corporate/finanziarie (M&A, risultati di bilancio compagnie)
- Novità tecniche interne IVASS senza impatto commerciale
- Contenuti anglofoni senza versione italiana

### 4. Produci il report

Formato Markdown:

```markdown
# Novità Settore Assicurativo — [periodo]

**Data report:** [YYYY-MM-DD]
**Fonti scansionate:** IVASS, ANIA, Gazzetta Ufficiale, [altre...]
**Notizie rilevanti trovate:** [N]

## 🔴 Alta priorità — impatto diretto sui clienti FIM

### [Titolo novità 1]
**Fonte:** [Nome fonte] — [Link]
**Data:** [YYYY-MM-DD]

[2-3 frasi che riassumono la novità e perché è rilevante per FIM]

**Clienti impattati:** [famiglie / professionisti / PMI / condomini / tutti]

**Azioni suggerite:**
- 📝 Articolo blog: "[titolo proposto]"
- 📧 Newsletter: includere in quella del [data]
- 📞 Contatti clienti: segmento X (es. "clienti con polizza cyber") va avvisato

---

## 🟡 Media priorità — da tenere d'occhio

[Stesso formato, per novità meno urgenti]

---

## 🟢 Nota — cultura di settore

[Novità informative, utili per aggiornamento ma senza urgenza operativa]

---

## 💡 Idee contenuti blog

Basato sulle novità trovate, ecco 3 topic ad alto potenziale:

1. **[Titolo proposto]** — keyword target: `[keyword]` — angolo: [come trattarlo]
2. **[Titolo proposto]** — keyword target: `[keyword]` — angolo: [come trattarlo]
3. **[Titolo proposto]** — keyword target: `[keyword]` — angolo: [come trattarlo]

Per scrivere uno di questi articoli, attiva la skill `fim-blog-writer` con il titolo scelto.

---

*Report generato automaticamente. Verificare sempre le fonti prima di usare le informazioni per comunicazioni ufficiali.*
```

### 5. Azioni opzionali post-report

Dopo aver consegnato il report, chiedi all'utente:

> Vuoi che:
> 1. Scriva subito uno degli articoli blog proposti? (usa skill `fim-blog-writer`)
> 2. Prepari una bozza di email newsletter?
> 3. Aggiunga una voce nel glossario del sito?

**Non** procedere senza conferma esplicita.

## Automazione via cron (opzionale)

Se l'utente chiede di far girare questa skill **automaticamente ogni settimana**:

1. Ricordagli che esiste già l'infrastruttura Vercel Cron nel progetto (vedi `vercel.json` e `app/api/cron/`)
2. Proponi di creare un endpoint `/api/cron/ivass-watcher` che:
   - Esegue la stessa logica di questa skill
   - Invia il report via email a `info@fimbroker.it` tramite Resend (già integrato)
   - Frequenza consigliata: ogni lunedì alle 8:00 (`0 8 * * 1`)
3. **Non** implementare senza approvazione esplicita — il cron Vercel gratuito ha limiti (2/giorno su hobby plan) e questo è un cambiamento architetturale.

## Output compliance

Il report prodotto deve:
- ✅ Citare sempre la fonte con link cliccabile
- ✅ Distinguere fatto verificato vs opinione/analisi
- ✅ Usare condizionale per previsioni ("potrebbe", "è probabile")
- ✅ Non inventare date, importi o riferimenti normativi
- ✅ Se una fonte è ambigua, marcare con [DA VERIFICARE]

## Esempi di trigger

- "Controlla le novità IVASS di questa settimana"
- "Cosa c'è di nuovo in ambito normativo?"
- "Dammi idee per articoli blog"
- "Quali trend vedi nel settore assicurativo?"
- "Fai un giro delle news di settore"
- "Aggiornamenti sulla polizza catastrofale"
