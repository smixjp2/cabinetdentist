import Header from "@/components/layout/header";
import InventoryTable from "@/components/inventory/inventory-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function InventoryPage() {
  return (
    <div className="flex flex-col h-full">
      <Header title="Gestion des stocks" />
      <main className="flex-1 overflow-auto p-4 md:p-6">
        <Card>
            <CardHeader className="flex-row items-center justify-between">
                <CardTitle>Consommables</CardTitle>
                <Button size="sm">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Ajouter produit
                </Button>
            </CardHeader>
            <CardContent>
                <InventoryTable />
            </CardContent>
        </Card>
      </main>
    </div>
  );
}
