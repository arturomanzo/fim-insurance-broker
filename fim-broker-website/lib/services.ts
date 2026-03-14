export interface Service {
  slug: string;
  nome: string;
  descrizione: string;
  icona: string;
  dettaglio: string;
}

export const services: Service[] = [
  {
    slug: 'rca',
    nome: 'RCA / Assicurazione Auto',
    descrizione: 'Copertura obbligatoria per la responsabilità civile verso terzi e soluzioni complementari per proteggere il tuo veicolo.',
    icona: '🚗',
    dettaglio: `L'assicurazione RCA (Responsabilità Civile Auto) è obbligatoria per legge per tutti i veicoli a motore circolanti su suolo pubblico. FIM Insurance Broker ti offre le migliori soluzioni RCA in collaborazione con compagnie leader come Allianz, Prima e Bene Assicurazioni.

Oltre alla copertura base RCA, proponiamo garanzie accessorie come:
- Kasko e Mini Kasko per danni al proprio veicolo
- Furto e Incendio
- Cristalli
- Assistenza stradale 24/7
- Tutela legale automobilistica
- Infortuni conducente

Il nostro team analizza il tuo profilo di rischio per trovare la soluzione più conveniente e adeguata alle tue esigenze.`,
  },
  {
    slug: 'vita',
    nome: 'Polizze Vita',
    descrizione: 'Soluzioni per proteggere il futuro tuo e della tua famiglia: temporanee caso morte, rivalutabili, unit linked e piani di accumulo.',
    icona: '❤️',
    dettaglio: `Le polizze vita sono strumenti fondamentali per garantire sicurezza economica alla propria famiglia e pianificare il futuro. FIM Insurance Broker propone una vasta gamma di soluzioni assicurative vita:

**Temporanee Caso Morte (TCM)**
Proteggono i tuoi cari in caso di decesso prematuro, garantendo un capitale ai beneficiari.

**Polizze Vita Rivalutabili (Ramo I)**
Investimento sicuro con rivalutazione annuale legata alla gestione separata, con garanzia del capitale.

**Unit Linked (Ramo III)**
Combinano protezione assicurativa e investimento in fondi, con maggiore potenziale di rendimento.

**Piani di Accumulo**
Soluzioni per costruire progressivamente un capitale nel tempo, ideali per obiettivi futuri come l'istruzione dei figli o la pensione complementare.

Collaboriamo con le principali compagnie del settore vita per offrirti soluzioni personalizzate.`,
  },
  {
    slug: 'infortuni',
    nome: 'Infortuni e Malattia',
    descrizione: 'Polizze infortuni individuali e collettive, diaria da ricovero, invalidità permanente e coperture per malattia grave.',
    icona: '🏥',
    dettaglio: `Le coperture Infortuni e Malattia proteggono te e la tua famiglia dalle conseguenze economiche di eventi imprevisti che possono compromettere la capacità lavorativa e la qualità della vita.

**Infortuni Individuali**
- Indennità giornaliera per inabilità temporanea
- Capitale per invalidità permanente
- Rimborso spese mediche
- Diaria da ricovero ospedaliero

**Infortuni Collettivi per Aziende**
Soluzioni su misura per proteggere i dipendenti durante l'attività lavorativa e nel tempo libero.

**Malattie Gravi (Dread Disease)**
Capitale erogato alla diagnosi di patologie gravi come infarto, ictus, tumori, che copre le spese straordinarie di cura.

**Long Term Care**
Rendita in caso di perdita di autosufficienza, per garantire cure adeguate senza gravare sui familiari.

FIM Insurance Broker analizza le tue esigenze specifiche per costruire un programma di protezione completo.`,
  },
  {
    slug: 'casa',
    nome: 'Casa e Patrimonio',
    descrizione: 'Protezione completa per la tua abitazione: incendio, furto, responsabilità civile del capofamiglia, danni da acqua e molto altro.',
    icona: '🏠',
    dettaglio: `La polizza Casa di FIM Insurance Broker è pensata per proteggere il tuo bene più prezioso con coperture modulabili e personalizzabili.

**Coperture per il Fabbricato**
- Incendio, scoppio e fulmine
- Danni da acqua condutture
- Terremoto e catastrofi naturali
- Danni elettrici
- Fenomeni atmosferici

**Coperture per il Contenuto**
- Furto e rapina
- Danni accidentali a beni di valore
- Apparecchi elettronici

**Responsabilità Civile della Famiglia**
Tutela in caso di danni causati involontariamente a terzi dal nucleo familiare, inclusi animali domestici.

**Tutela Legale**
Assistenza legale per controversie legate all'immobile.

Disponibile sia per proprietari che per inquilini. Soluzioni anche per case vacanza e seconde abitazioni.`,
  },
  {
    slug: 'aziende',
    nome: 'Rischi Aziendali',
    descrizione: 'Programmi assicurativi integrati per proteggere la tua impresa: property, RC generale, tutela legale, cyber risk e polizze per i dipendenti.',
    icona: '🏢',
    dettaglio: `FIM Insurance Broker offre soluzioni assicurative complete per le imprese di ogni dimensione, dalla piccola attività artigianale alla media impresa strutturata.

**Property Aziendale**
- Incendio e rischi accessori per stabilimenti e uffici
- Danni da acqua e cause naturali
- Rottura macchinari
- Perdita di profitti (Business Interruption)

**Responsabilità Civile Generale (RCG)**
Copertura per danni a terzi causati dall'attività aziendale, prodotti e lavorazioni.

**RC Prodotti**
Garanzia specifica per i danni causati dai prodotti commercializzati.

**Cyber Risk**
Protezione contro attacchi informatici, violazioni dei dati e responsabilità GDPR.

**Tutela Legale Aziendale**
Assistenza legale per controversie commerciali, fiscali e del lavoro.

**Programmi per i Dipendenti**
Infortuni professionali ed extraprofessionali, sanitaria collettiva, polizze vita.

Collaboriamo con DUAL/Arch per soluzioni assicurative corporate specializzate.`,
  },
  {
    slug: 'rc-professionale',
    nome: 'RC Professionale',
    descrizione: 'Copertura per la responsabilità civile professionale di medici, avvocati, ingegneri, commercialisti, consulenti e tutte le professioni regolamentate.',
    icona: '⚖️',
    dettaglio: `La Responsabilità Civile Professionale (RCP) è indispensabile per tutti i professionisti: protegge dalle richieste di risarcimento da parte dei clienti per errori, omissioni o negligenze nell'esercizio dell'attività professionale.

**Professionisti Regolamentati**
- Medici e odontoiatri (RC Medica)
- Avvocati e notai
- Ingegneri, architetti e geometri
- Commercialisti e consulenti del lavoro
- Farmacisti
- Psicologi e psicoterapeuti

**Professionisti Non Regolamentati**
- Consulenti di management e IT
- Agenti immobiliari
- Formatori e coach
- Professionisti del marketing e comunicazione

**Cosa Copre la RCP**
- Errori e omissioni professionali
- Violazione della riservatezza
- Perdita di documenti
- Spese legali per difesa in giudizio
- Danni consequenziali

FIM Insurance Broker, in collaborazione con DUAL/Arch, offre programmi RCP su misura con massimali adeguati alle specifiche esigenze professionali.`,
  },
  {
    slug: 'trasporti',
    nome: 'Trasporti e Logistica',
    descrizione: 'Coperture per merci in transito, responsabilità del vettore, flotte aziendali e rischi logistici per import/export.',
    icona: '🚢',
    dettaglio: `FIM Insurance Broker offre soluzioni assicurative specializzate per il settore dei trasporti e della logistica, tutelandoti in ogni fase della catena di distribuzione.

**Assicurazione Merci in Transito**
- Copertura all risks per merci trasportate via terra, mare e aria
- Polizze open cover per spedizioni continuative
- Coperture per import/export internazionale
- Magazzinaggio e stoccaggio

**Responsabilità del Vettore**
- RC del trasportatore terrestre (CMR)
- RC dello spedizioniere
- Responsabilità del magazziniere

**Flotte Aziendali**
- Gestione assicurativa di flotte di veicoli commerciali
- RC auto, kasko, tutela legale
- Assistenza e soccorso stradale

**Cargo Marittimo**
- Corpo navi e imbarcazioni commerciali
- Merci via mare secondo le condizioni delle polizze marittime standard

**Import/Export e Commercio Internazionale**
Soluzioni per le imprese che operano sui mercati internazionali, con coperture conformi alle normative Incoterms.`,
  },
  {
    slug: 'agricoltura',
    nome: 'Agricoltura',
    descrizione: 'Polizze agevolate e non per il settore agricolo: grandine, avversità atmosferiche, bestiame, responsabilità civile agricola e mezzi agricoli.',
    icona: '🌾',
    dettaglio: `FIM Insurance Broker propone soluzioni assicurative dedicate al settore primario, con un'attenzione particolare alle agevolazioni statali e ai contributi disponibili per le imprese agricole.

**Polizze Agevolate (ex ISMEA)**
- Grandine e avversità atmosferiche
- Polizze multirischio colture
- Polizze Zootecnica per bestiame
- Agevolazioni contributive per le imprese agricole

**Avversità Atmosferiche**
- Grandine, gelo, siccità
- Alluvione e allagamento
- Tromba d'aria e uragano

**Bestiame e Zootecnia**
- Mortalità animali per malattia e infortuni
- Bestiame da reddito (bovini, suini, ovicaprini, avicoli)
- Strutture zootecniche

**RC Agricola**
Responsabilità civile dell'imprenditore agricolo per danni a terzi derivanti dall'attività, incluso l'uso di macchine agricole.

**Mezzi Agricoli**
Assicurazione RCA obbligatoria e garanzie complementari per trattori, macchine operatrici e veicoli agricoli.

**Fabbricati Rurali**
Incendio e rischi accessori per cascine, serre, depositi e strutture agricole.`,
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}
