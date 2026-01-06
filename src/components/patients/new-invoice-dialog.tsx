'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import type { Invoice, Treatment } from '@/lib/types';
import { FileText, Loader2, Wand2 } from 'lucide-react';
import { format } from 'date-fns';
import { generateInvoiceAction } from '@/lib/actions';
import { Textarea } from '../ui/textarea';

interface NewInvoiceDialogProps {
  treatments: Treatment[];
  onAddInvoice: (
    newInvoice: Omit<Invoice, 'id' | 'status' | 'paidAmount'>
  ) => void;
}

export default function NewInvoiceDialog({
  treatments,
  onAddInvoice,
}: NewInvoiceDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState<number | string>('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      handleGenerateSuggestion();
    } else {
      // Reset when dialog is closed
      setDescription('');
      setAmount('');
      setIsLoading(false);
    }
  }, [isOpen]);

  const handleGenerateSuggestion = async () => {
    setIsLoading(true);
    const result = await generateInvoiceAction({ treatments });
    setIsLoading(false);

    if (result.error) {
      toast({
        variant: 'destructive',
        title: 'Erreur IA',
        description: result.error,
      });
    } else {
      setDescription(result.description);
      setAmount(result.amount);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!description || !amount) {
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Veuillez remplir tous les champs.',
      });
      return;
    }

    onAddInvoice({
      date: format(new Date(), 'yyyy-MM-dd'),
      description,
      amount: parseFloat(amount as string),
    });

    toast({ title: 'Succès', description: 'Facture créée.' });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <FileText className="mr-2 h-4 w-4" /> Nouvelle Facture
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Créer une nouvelle facture</DialogTitle>
          <DialogDescription>
            L'IA a pré-rempli les détails de la facture. Vous pouvez les
            modifier avant de sauvegarder.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {isLoading ? (
              <div className="flex h-48 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="description" className="text-right pt-2">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Ex: Consultation, Détartrage"
                    className="col-span-3"
                    rows={4}
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="amount" className="text-right">
                    Montant (DH)
                  </Label>
                  <Input
                    id="amount"
                    name="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Ex: 400"
                    className="col-span-3"
                    required
                  />
                </div>
              </>
            )}
          </div>
          <DialogFooter className="sm:justify-between">
            <Button
              type="button"
              variant="ghost"
              onClick={handleGenerateSuggestion}
              disabled={isLoading}
            >
              <Wand2 className="mr-2 h-4 w-4" />
              Régénérer
            </Button>
            <div className="flex gap-2">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Annuler
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isLoading}>
                Enregistrer
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
