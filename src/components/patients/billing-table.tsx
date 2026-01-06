import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { invoices } from "@/lib/data"
import type { Invoice } from "@/lib/types"

const statusVariant: { [key in Invoice['status']]: 'default' | 'secondary' | 'destructive' } = {
  Paid: 'default',
  Partial: 'secondary',
  Unpaid: 'destructive',
}

export default function BillingTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>N° Facture</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead className="text-right">Montant</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-medium">{invoice.id}</TableCell>
            <TableCell>{invoice.date}</TableCell>
            <TableCell>{invoice.description}</TableCell>
            <TableCell>
              <Badge variant={statusVariant[invoice.status]}>
                {invoice.status === 'Paid' ? 'Payé' : invoice.status === 'Partial' ? 'Partiel' : 'Impayé'}
              </Badge>
            </TableCell>
            <TableCell className="text-right">{invoice.amount.toFixed(2)} MAD</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
