import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { Badge } from "@/components/ui/badge"
  import { Progress } from "@/components/ui/progress"
  import { inventory } from "@/lib/data"
  import type { InventoryItem } from "@/lib/types"

  const statusVariant: { [key in InventoryItem['status']]: 'default' | 'secondary' | 'destructive' } = {
    'In Stock': 'default',
    'Low Stock': 'secondary',
    'Out of Stock': 'destructive',
  }
  
  export default function InventoryTable() {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Produit</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Stock Actuel</TableHead>
            <TableHead className="w-[30%]">Niveau de stock</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inventory.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>
                <Badge variant={statusVariant[item.status]}>
                    {item.status === 'In Stock' ? 'En stock' : item.status === 'Low Stock' ? 'Stock faible' : 'Rupture'}
                </Badge>
              </TableCell>
              <TableCell>{item.stock}</TableCell>
              <TableCell>
                <Progress value={(item.stock / item.maxStock) * 100} className="h-3" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
  