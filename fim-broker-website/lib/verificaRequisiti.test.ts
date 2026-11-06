// Test di lib/verificaRequisiti.ts — `npm test` (node --test, Node 22.18 o successivo).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  normalizzaRisultato,
  riepilogoRequisiti,
  tipoLeadRequisiti,
  type RisultatoVerifica,
} from './verificaRequisiti.ts'

const RISULTATO: RisultatoVerifica = {
  documento: {
    tipo: 'Disciplinare di gara',
    committente: 'Comune di Esempio',
    oggetto: 'Manutenzione strade comunali',
    importo: '200.000,00 €',
    scadenza: '30/11/2026',
  },
  requisiti: [
    {
      categoria: 'garanzia_provvisoria',
      garanzia: 'Garanzia provvisoria',
      riferimento: 'Art. 10 del disciplinare',
      importo: '2% di 200.000 € = 4.000 €',
      quando: "con l'offerta",
      esito: 'scoperto',
      nota: 'x',
    },
    {
      categoria: 'car_cantiere',
      garanzia: 'Polizza CAR',
      riferimento: null,
      importo: null,
      quando: "prima dell'inizio lavori",
      esito: 'coperto',
      nota: 'x',
    },
  ],
  lacune: [],
  puntiDubbi: [],
  prossimiPassi: [],
  sintesi: 'x',
}

test('tipoLeadRequisiti: le cauzioni si riconoscono subito, poi le altre polizze', () => {
  assert.equal(tipoLeadRequisiti(RISULTATO), 'Verifica requisiti — Cauzioni, CAR / danni al cantiere')
  assert.equal(tipoLeadRequisiti({ requisiti: [] }), 'Verifica requisiti')
})

test('normalizzaRisultato: senza polizza nessun esito di confronto', () => {
  const r = normalizzaRisultato(RISULTATO, false)
  assert.deepEqual(r.requisiti.map((q) => q.esito), ['non_confrontato', 'non_confrontato'])
  const conPolizza = normalizzaRisultato(RISULTATO, true)
  assert.deepEqual(conPolizza.requisiti.map((q) => q.esito), ['scoperto', 'coperto'])
})

test('normalizzaRisultato: una categoria fuori elenco diventa «altro»', () => {
  const strano = { ...RISULTATO, requisiti: [{ ...RISULTATO.requisiti[0], categoria: 'boh' as never }] }
  assert.equal(normalizzaRisultato(strano, true).requisiti[0].categoria, 'altro')
})

test('riepilogoRequisiti: i dati per il preventivo indicativo, entro i 2.000 caratteri', () => {
  const testo = riepilogoRequisiti(normalizzaRisultato(RISULTATO, false), false, '3330000000')
  assert.match(testo, /Committente: Comune di Esempio/)
  assert.match(testo, /Garanzia provvisoria — 2% di 200\.000 € = 4\.000 € \(con l'offerta\): Da procurare/)
  assert.match(testo, /confronto non fatto/)
  assert.match(testo, /Telefono: 3330000000/)
  const lungo = riepilogoRequisiti({ ...RISULTATO, sintesi: '', documento: { ...RISULTATO.documento, oggetto: 'x'.repeat(5000) } }, true)
  assert.ok(lungo.length <= 2000)
})
