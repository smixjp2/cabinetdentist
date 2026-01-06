"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import type { Treatment } from "@/lib/types"

interface TreatmentsListProps {
  treatments: Treatment[];
}

export default function TreatmentsList({ treatments }: TreatmentsListProps) {
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
