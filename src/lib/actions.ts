'use server';

import {
  generatePersonalizedReminder,
  type PersonalizedReminderInput,
} from '@/ai/flows/personalized-automated-reminders';
import {
  generateInvoiceDetails,
  type InvoiceGenerationInput,
} from '@/ai/flows/invoice-generation';
import { z } from 'zod';

const ReminderSchema = z.object({
  patientName: z.string().min(1, 'Le nom du patient est requis.'),
  appointmentDateTime: z
    .string()
    .min(1, 'La date du rendez-vous est requise.'),
});

export type ReminderState = {
  message?: string;
  errorMessage?: string;
};

export async function generateReminderAction(
  prevState: ReminderState,
  formData: FormData
): Promise<ReminderState> {
  const validatedFields = ReminderSchema.safeParse({
    patientName: formData.get('patientName'),
    appointmentDateTime: formData.get('appointmentDateTime'),
  });

  if (!validatedFields.success) {
    return {
      errorMessage:
        validatedFields.error.flatten().fieldErrors.patientName?.[0] ||
        validatedFields.error.flatten().fieldErrors.appointmentDateTime?.[0],
    };
  }

  try {
    const input: PersonalizedReminderInput = {
      ...validatedFields.data,
      dentistName: 'Dr. Alaoui',
      practiceName: 'Ibtisasama Modern Dentistry',
    };

    const result = await generatePersonalizedReminder(input);

    return { message: result.reminderMessage };
  } catch (error) {
    console.error('Error generating reminder:', error);
    return {
      errorMessage:
        'Une erreur est survenue lors de la génération du rappel.',
    };
  }
}

export async function generateInvoiceAction(input: InvoiceGenerationInput) {
  try {
    const result = await generateInvoiceDetails(input);
    return result;
  } catch (error) {
    console.error('Error generating invoice details:', error);
    return {
      description: '',
      amount: 0,
      error: "Une erreur est survenue lors de la suggestion de l'IA.",
    };
  }
}
