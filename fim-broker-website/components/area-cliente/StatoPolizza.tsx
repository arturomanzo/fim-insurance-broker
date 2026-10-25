import Badge from '@/components/ui/Badge'
import type { StatoVisibile } from '@/lib/areaCliente'

export default function StatoPolizza({ stato, giorni }: { stato: StatoVisibile; giorni: number | null }) {
  switch (stato) {
    case 'in-scadenza':
      return (
        <Badge variant="warning" className="font-semibold">
          {giorni === 0 ? 'Scade oggi' : `Scade tra ${giorni} ${giorni === 1 ? 'giorno' : 'giorni'}`}
        </Badge>
      )
    case 'sospesa':
      return <Badge className="font-semibold">Sospesa</Badge>
    case 'da-aggiornare':
      return <Badge variant="primary" className="font-semibold">Scadenza da aggiornare</Badge>
    default:
      return <Badge variant="success" className="font-semibold">Attiva</Badge>
  }
}
