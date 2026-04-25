'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'

const IRES = 0.24
const IRAP = 0.039
const FISCAL_DEDUCTION = IRES + IRAP // 27,9%
const SALARY_GROSSUP_FACTOR = 1.85

const formatEuro = (n: number) =>
  new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(
    Number.isFinite(n) ? n : 0
  )

export default function WelfareCalculator() {
  const [dipendenti, setDipendenti] = useState(15)
  const [premio, setPremio] = useState(500)

  const result = useMemo(() => {
    const n = Math.max(0, Number(dipendenti) || 0)
    const p = Math.max(0, Number(premio) || 0)
    const costoLordo = n * p
    const risparmioFiscale = costoLordo * FISCAL_DEDUCTION
    const costoNetto = costoLordo - risparmioFiscale
    const costoStipendioEquivalente = costoLordo * SALARY_GROSSUP_FACTOR
    const risparmioTotale = costoStipendioEquivalente - costoNetto
    return { costoLordo, risparmioFiscale, costoNetto, costoStipendioEquivalente, risparmioTotale }
  }, [dipendenti, premio])

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary-dark p-6 md:p-8 text-white">
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1 text-xs font-bold mb-3">
          🧮 Calcolatore
        </div>
        <h3 className="text-2xl md:text-3xl font-black mb-2">Quanto risparmi davvero con il welfare?</h3>
        <p className="text-white/80 text-sm md:text-base">
          Inserisci il numero di dipendenti e il premio medio annuo per calcolare risparmio fiscale,
          costo netto aziendale e quanto avresti dovuto spendere in stipendio per dare lo stesso valore netto.
        </p>
      </div>

      {/* Inputs */}
      <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-gray-100">
        <div>
          <label className="label-field flex items-center justify-between">
            <span>Numero dipendenti coinvolti</span>
            <span className="text-primary font-black text-lg">{dipendenti}</span>
          </label>
          <input
            type="range"
            min={1}
            max={250}
            step={1}
            value={dipendenti}
            onChange={(e) => setDipendenti(Number(e.target.value))}
            className="w-full accent-accent mt-2"
            aria-label="Numero dipendenti"
          />
          <input
            type="number"
            min={1}
            max={5000}
            value={dipendenti}
            onChange={(e) => setDipendenti(Number(e.target.value))}
            className="input-field mt-2"
            aria-label="Numero dipendenti (input numerico)"
          />
        </div>
        <div>
          <label className="label-field flex items-center justify-between">
            <span>Premio medio annuo per dipendente</span>
            <span className="text-primary font-black text-lg">{formatEuro(premio)}</span>
          </label>
          <input
            type="range"
            min={100}
            max={3000}
            step={50}
            value={premio}
            onChange={(e) => setPremio(Number(e.target.value))}
            className="w-full accent-accent mt-2"
            aria-label="Premio annuo per dipendente"
          />
          <input
            type="number"
            min={0}
            max={20000}
            step={50}
            value={premio}
            onChange={(e) => setPremio(Number(e.target.value))}
            className="input-field mt-2"
            aria-label="Premio annuo per dipendente (input numerico)"
          />
        </div>
      </div>

      {/* Output: 3 metrics */}
      <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 border-b border-gray-100">
        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <p className="text-gray-500 text-xs uppercase tracking-widest font-bold mb-2">Costo lordo</p>
          <p className="text-2xl md:text-3xl font-black text-primary">{formatEuro(result.costoLordo)}</p>
          <p className="text-xs text-gray-500 mt-1">premio annuo totale</p>
        </div>
        <div className="bg-accent/5 rounded-xl p-5 border-2 border-accent">
          <p className="text-accent text-xs uppercase tracking-widest font-bold mb-2">Risparmio fiscale</p>
          <p className="text-2xl md:text-3xl font-black text-accent">{formatEuro(result.risparmioFiscale)}</p>
          <p className="text-xs text-gray-600 mt-1">deducibilità IRES + IRAP (27,9%)</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <p className="text-gray-500 text-xs uppercase tracking-widest font-bold mb-2">Costo netto</p>
          <p className="text-2xl md:text-3xl font-black text-primary">{formatEuro(result.costoNetto)}</p>
          <p className="text-xs text-gray-500 mt-1">esborso effettivo per l&apos;azienda</p>
        </div>
      </div>

      {/* Welfare vs. Stipendio */}
      <div className="p-6 md:p-8">
        <h4 className="text-lg font-black text-primary mb-1">Welfare vs. aumento di stipendio</h4>
        <p className="text-sm text-gray-500 mb-5">
          Per dare lo stesso valore netto al dipendente, un aumento di stipendio costa molto di più.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          <div className="bg-red-50 border border-red-100 rounded-xl p-5">
            <p className="text-xs uppercase tracking-widest font-bold text-red-700 mb-2">Stipendio aggiuntivo</p>
            <p className="text-3xl font-black text-red-700 mb-1">{formatEuro(result.costoStipendioEquivalente)}</p>
            <p className="text-xs text-red-700/80">
              costo lordo per l&apos;azienda (lordo busta + contributi) per dare ai dipendenti lo stesso valore netto del welfare
            </p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-5">
            <p className="text-xs uppercase tracking-widest font-bold text-green-700 mb-2">Welfare via polizze</p>
            <p className="text-3xl font-black text-green-700 mb-1">{formatEuro(result.costoNetto)}</p>
            <p className="text-xs text-green-700/80">
              costo netto annuo dopo deducibilità IRES + IRAP. Per il dipendente è netto al 100%.
            </p>
          </div>
        </div>
        <div className="bg-primary text-white rounded-xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-white/70 text-xs uppercase tracking-widest font-bold mb-1">Risparmio annuo per l&apos;azienda</p>
            <p className="text-3xl font-black text-accent">{formatEuro(result.risparmioTotale)}</p>
          </div>
          <Link
            href={`/preventivo?profilo=pmi&settore=Welfare+Aziendale`}
            className="btn-primary whitespace-nowrap"
          >
            Personalizza il piano →
          </Link>
        </div>
        <p className="text-xs text-gray-400 mt-5 leading-relaxed">
          * Stima orientativa basata su aliquota IRES 24%, IRAP 3,9% e gross-up stipendio di 1,85x (valore tipico considerando IRPEF marginale 38%, contributi INPS dipendente 9,49% e contributi INPS azienda ~30%). I valori effettivi dipendono dal regime fiscale dell&apos;azienda, dal CCNL applicato, dalla fascia di reddito dei dipendenti e dalla struttura del piano welfare. Verifica sempre con il tuo commercialista. La copertura welfare deve rispettare l&apos;art. 51, comma 2 e l&apos;art. 100 TUIR e la L. 208/2015 (commi 182-190) per beneficiare delle agevolazioni fiscali.
        </p>
      </div>
    </div>
  )
}
