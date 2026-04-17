---
name: fim-policy-analyzer
description: Analizza PDF di polizze assicurative italiane per estrarre clausole chiave, massimali, esclusioni, franchigie e condizioni particolari. Produce un riassunto strutturato in italiano per consulenza al cliente. Usa quando l'utente fornisce un PDF di polizza, condizioni generali, contratto assicurativo, dichiarazione o denuncia sinistro, oppure chiede di "analizzare una polizza", "confrontare due polizze", "estrarre dati da una polizza".
---

# FIM Policy Analyzer

Skill per analizzare documenti assicurativi PDF e produrre report utili al lavoro quotidiano di broker.

## Contesto

FIM Insurance Broker riceve quotidianamente PDF di polizze, condizioni generali, preventivi compagnie, denunce sinistri. Questa skill automatizza l'estrazione delle informazioni chiave in italiano in formato strutturato.

**Importante:** non sostituisci la consulenza umana. Produci un **riassunto tecnico** che il broker usa come base per parlare col cliente. Ogni output termina con un disclaimer che invita a leggere sempre il documento originale.

## Tipi di documento supportati

1. **Polizza / Contratto assicurativo** — analisi completa di garanzie e condizioni
2. **Condizioni generali di assicurazione (CGA)** — estrazione esclusioni e obblighi
3. **Preventivo compagnia** — confronto strutturato con la polizza attuale
4. **Denuncia sinistro** — estrazione dati per apertura pratica
5. **Dichiarazione precontrattuale** — verifica completezza e coerenza

## Workflow

### 1. Identificazione del documento

Appena ricevi il PDF:
1. Usa il tool Read sul file PDF — Claude Code supporta PDF nativamente
2. Se il PDF ha più di 10 pagine, usa il parametro `pages` per leggere a blocchi
3. Identifica il tipo di documento dai primi paragrafi (polizza, CGA, preventivo, ecc.)
4. Identifica la compagnia emittente (Generali, AXA, Allianz, UnipolSai, Zurich, ecc.)
5. Identifica il ramo assicurativo (auto, casa, vita, RC professionale, D&O, ecc.)

### 2. Estrazione strutturata

Estrai e organizza le seguenti informazioni (quando presenti nel documento):

#### Anagrafica
- Contraente / Assicurato / Beneficiario
- Data decorrenza — data scadenza
- Numero di polizza
- Compagnia e mandato

#### Garanzie (sezione per sezione)
Per ogni garanzia:
- **Nome** (es. "RC auto", "Kasko", "Incendio e Scoppio")
- **Massimale** / somma assicurata
- **Franchigia / scoperto** (se presenti)
- **Oggetto della copertura** (cosa copre concretamente)
- **Esclusioni specifiche** (cosa NON copre)

#### Clausole particolari
- Clausole di rinnovo tacito / disdetta
- Periodo di carenza / franchigia temporale
- Retroattività (per RC professionale)
- Ultrattività / claims made vs loss occurrence
- Vincoli (banche, leasing, terzi)
- Rivalse e regresso

#### Premio e pagamenti
- Premio annuo totale
- Scadenza frazionamenti (se applicabile)
- Modalità di pagamento accettate

### 3. Output — formato report

Produci sempre un report in questo formato Markdown:

```markdown
# Analisi Polizza — [Compagnia] [Ramo]

**Tipo documento:** [polizza / CGA / preventivo / ...]
**Contraente:** [nome]
**Periodo:** dal [data] al [data]
**Premio annuo:** € [importo]

## 🛡 Garanzie incluse

### [Nome garanzia]
- **Massimale:** € XXX.XXX
- **Franchigia:** € XXX / XX%
- **Copre:** [sintesi in 1-2 frasi]
- **Esclusioni chiave:** [lista bullet]

[ripeti per ogni garanzia]

## ⚠️ Punti di attenzione

[Elenca cose che il broker DEVE segnalare al cliente, ad esempio:
- sottossicurazioni evidenti
- esclusioni importanti non sempre evidenti
- clausole di rivalsa
- vincoli in favore di terzi
- claims made con retroattività limitata
- franchigie molto alte]

## 💡 Domande da fare al cliente

[Elenca 3-5 domande che il broker dovrebbe porre al cliente per capire se la polizza è adeguata al suo profilo reale]

## 📋 Dati tecnici

- Numero polizza: [...]
- Compagnia: [...]
- Rinnovo tacito: [Sì/No]
- Preavviso disdetta: [X giorni]

---
*Report generato automaticamente. Verificare sempre i dettagli sul documento originale della compagnia. Il broker resta responsabile della consulenza al cliente.*
```

### 4. Confronto tra polizze (se richiesto)

Se l'utente carica 2 PDF e chiede un confronto:
1. Analizza entrambi separatamente
2. Produci una **tabella comparativa** con colonne: Garanzia | Polizza A | Polizza B | Vincitore
3. Alla fine, una sezione "**Raccomandazione FIM**" con i 3 punti principali da discutere col cliente

### 5. Privacy e sicurezza

**MAI** committare PDF con dati cliente nel repo Git. Lavora solo in memoria.

**MAI** inviare il contenuto del PDF a servizi esterni non autorizzati (solo l'API Anthropic usata da Claude Code è ok).

Se il PDF è nella cartella del progetto, alla fine dell'analisi **suggerisci** di spostarlo fuori dal repo per privacy GDPR (art. 32 — integrità e riservatezza).

## Integrazioni possibili

Se l'utente chiede "salva questa analisi nell'area cliente" o "archivia nel gestionale":
- Riferisci alle API del gestionale documentate in `CLAUDE.md` (`fim-gestionale-next.vercel.app/api/v1`)
- **Non** implementare l'integrazione senza conferma esplicita — spiega cosa servirebbe (endpoint + auth) e chiedi il permesso

## Esempi di trigger

L'utente potrebbe dire:
- "Analizza questa polizza [allega PDF]"
- "Cosa copre questo contratto?"
- "Confronta questi due preventivi"
- "Estrai i dati da questa denuncia sinistro"
- "Quali sono le esclusioni di questa RC professionale?"
- "Questo cliente è coperto in caso di [scenario]?"

In tutti questi casi, attiva questa skill.
