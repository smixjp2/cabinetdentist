'use server';
/**
 * @fileOverview A flow to generate invoice details based on recent treatments.
 *
 * - generateInvoiceDetails - A function that suggests invoice description and amount.
 * - InvoiceGenerationInput - The input type for the function.
 * - InvoiceGenerationOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import type { Treatment } from '@/lib/types';
import { z } from 'genkit';

const TreatmentSchema = z.object({
  id: z.string(),
  tooth: z.number(),
  procedure: z.string(),
  date: z.string(),
  notes: z.string(),
  cost: z.number(),
});

const InvoiceGenerationInputSchema = z.object({
  treatments: z.array(TreatmentSchema).describe('List of recent treatments for the patient.'),
});
export type InvoiceGenerationInput = z.infer<typeof InvoiceGenerationInputSchema>;

const InvoiceGenerationOutputSchema = z.object({
  description: z.string().describe('A summary of the treatments for the invoice description. Should be in French.'),
  amount: z.number().describe('The total amount calculated from the treatments.'),
});
export type InvoiceGenerationOutput = z.infer<typeof InvoiceGenerationOutputSchema>;

export async function generateInvoiceDetails(
  input: InvoiceGenerationInput
): Promise<InvoiceGenerationOutput> {
  return invoiceGenerationFlow(input);
}

const invoicePrompt = ai.definePrompt({
  name: 'invoiceGenerationPrompt',
  input: { schema: InvoiceGenerationInputSchema },
  output: { schema: InvoiceGenerationOutputSchema },
  prompt: `You are an expert dental office assistant. Your task is to generate an invoice based on a list of recent, unbilled treatments for a patient.

Analyze the following treatments:
{{#each treatments}}
- Procedure: {{procedure}} on tooth {{tooth}}
- Cost: {{cost}} DH
- Notes: {{notes}}
{{/each}}

Based on this information:
1.  Create a concise, clear description for the invoice. Combine the procedures into a single description. For example: "Soin carie dent n°15, Détartrage complet". The description must be in French.
2.  Calculate the total amount by summing up the costs of all treatments.

Provide the final description and total amount.`,
});

const invoiceGenerationFlow = ai.defineFlow(
  {
    name: 'invoiceGenerationFlow',
    inputSchema: InvoiceGenerationInputSchema,
    outputSchema: InvoiceGenerationOutputSchema,
  },
  async (input) => {
    // In a real application, you'd first filter for unbilled treatments.
    // For this example, we'll assume the input contains only unbilled treatments.

    if (input.treatments.length === 0) {
      return {
        description: '',
        amount: 0,
      };
    }
    
    const { output } = await invoicePrompt(input);
    return output!;
  }
);
