<<<<<<< HEAD
"use client";

=======
>>>>>>> c7add20c10b63cc763c2475a75f05dad6609a9d1
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
<<<<<<< HEAD
import type { Treatment } from "@/lib/types"

interface TreatmentsListProps {
  treatments: Treatment[];
}

export default function TreatmentsList({ treatments }: TreatmentsListProps) {
=======
import { treatments } from "@/lib/data"

export default function TreatmentsList() {
>>>>>>> c7add20c10b63cc763c2475a75f05dad6609a9d1
  return (
    <Accordion type="single" collapsible className="w-full">
      {treatments.map((treatment) => (
        <AccordionItem value={`item-${treatment.id}`} key={treatment.id}>
          <AccordionTrigger>
            <div className="flex justify-between w-full pr-4">
              <span>{`Dent n°${treatment.tooth}: ${treatment.procedure}`}</span>
              <span className="text-muted-foreground">{treatment.date}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <p className="font-semibold">Notes:</p>
            <p className="text-muted-foreground">{treatment.notes}</p>
            <p className="font-semibold mt-2">Coût:</p>
            <p className="text-muted-foreground">{treatment.cost.toFixed(2)} MAD</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
