import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Card from '@/components/ui/Card'
import QuestionarioForm from '@/components/forms/QuestionarioForm'
import { apriQuestionario, tokenValido } from '@/lib/questionario'

export const metadata: Metadata = {
  title: 'Questionario richieste ed esigenze',
  robots: { index: false, follow: false },
}

interface PageProps {
  params: Promise<{ token: string }>
}

function Avviso({ titolo, testo }: { titolo: string; testo: string }) {
  return (
    <Card className="text-center max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-primary mb-2">{titolo}</h1>
      <p className="text-gray-600">{testo}</p>
      <a href="tel:+390696883381" className="inline-block mt-6 text-primary font-semibold underline">
        Chiama lo 06 96883381
      </a>
    </Card>
  )
}

export default async function QuestionarioPage({ params }: PageProps) {
  const { token } = await params
  if (!tokenValido(token)) notFound()
  const vista = await apriQuestionario(token)

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="gradient-primary py-12 text-white">
        <div className="container-custom max-w-3xl">
          <p className="text-white/70 text-sm mb-2">FIM Insurance Broker · Questionario</p>
          <h1 className="text-3xl md:text-4xl font-black mb-3">Ci dica di cosa ha bisogno</h1>
          <p className="text-white/80">
            Prima di proporle una polizza dobbiamo capire cosa vuole proteggere e come. Bastano pochi minuti.
          </p>
        </div>
      </section>

      <div className="container-custom max-w-3xl py-10">
        {!vista && (
          <Avviso titolo="Non riusciamo ad aprire il questionario" testo="È un problema nostro, non del link. Riprovi tra qualche minuto oppure ci chiami." />
        )}
        {vista?.stato === 'non_trovato' && (
          <Avviso titolo="Link non valido" testo="Il link non corrisponde a nessun questionario. Controlli di averlo copiato per intero, oppure ce ne chieda uno nuovo." />
        )}
        {vista?.stato === 'scaduto' && (
          <Avviso titolo="Il link è scaduto" testo="I link del questionario valgono 30 giorni. Ce ne chieda uno nuovo: glielo mandiamo subito." />
        )}
        {vista?.stato === 'annullato' && (
          <Avviso titolo="Questo link non è più attivo" testo="Le abbiamo mandato un questionario più recente: usi l'ultimo link che ha ricevuto." />
        )}
        {vista?.stato === 'firmato' && (
          <Avviso titolo="Questionario già confermato" testo="Abbiamo già ricevuto le sue risposte. Se nel frattempo qualcosa è cambiato, ce lo dica." />
        )}
        {vista && (vista.stato === 'da_compilare' || vista.stato === 'da_confermare') && (
          <>
            <Card className="mb-6">
              <p className="text-sm text-gray-500">Contraente</p>
              <p className="font-bold text-primary">{vista.nome}</p>
              <p className="text-sm text-gray-600 mt-1">
                {vista.riferimento}
                {vista.ramo ? ` · ${vista.ramo}` : ''}
              </p>
              <p className="text-xs text-gray-500 mt-3">
                Le chiediamo queste informazioni perché la normativa (art. 58 del Regolamento IVASS n. 40/2018) ci
                obbliga a proporle solo contratti coerenti con le sue richieste ed esigenze. Le domande con * sono obbligatorie.
                Non servono informazioni sulla salute.
              </p>
            </Card>
            <QuestionarioForm
              token={token}
              ramo={vista.ramo}
              sezioni={vista.sezioni}
              dichiarazioni={vista.dichiarazioni}
              conferma={vista.stato === 'da_confermare' ? vista.conferma : undefined}
            />
            <p className="text-xs text-gray-400 mt-8">
              FIM Insurance Broker S.a.s. di Manzo Arturo &amp; C. · Via Roma 41, 04012 Cisterna di Latina (LT) ·
              Iscritta al RUI Sezione B N. B000405449 · Soggetta alla vigilanza dell&apos;IVASS (www.ivass.it) ·
              Versione del questionario {vista.versione}
            </p>
          </>
        )}
      </div>
    </div>
  )
}
