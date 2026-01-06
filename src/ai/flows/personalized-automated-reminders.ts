'use server';

/**
 * @fileOverview A flow to generate personalized appointment reminders for patients via WhatsApp, including the appointment time.
 *
 * - generatePersonalizedReminder - A function that generates personalized appointment reminders.
 * - PersonalizedReminderInput - The input type for the generatePersonalizedReminder function.
 * - PersonalizedReminderOutput - The return type for the generatePersonalizedReminder function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedReminderInputSchema = z.object({
  patientName: z.string().describe('The name of the patient.'),
  appointmentDateTime: z.string().describe('The date and time of the appointment (e.g., "January 1, 2024, 10:00 AM").'),
  dentistName: z.string().describe('The name of the dentist.'),
  practiceName: z.string().describe('The name of the dental practice.'),
  patientPreferences: z.string().optional().describe('Any specific preferences the patient has for reminders.'),
});
export type PersonalizedReminderInput = z.infer<typeof PersonalizedReminderInputSchema>;

const PersonalizedReminderOutputSchema = z.object({
  reminderMessage: z.string().describe('The personalized reminder message for the patient.'),
});
export type PersonalizedReminderOutput = z.infer<typeof PersonalizedReminderOutputSchema>;

export async function generatePersonalizedReminder(input: PersonalizedReminderInput): Promise<PersonalizedReminderOutput> {
  return personalizedReminderFlow(input);
}

const reminderPrompt = ai.definePrompt({
  name: 'personalizedReminderPrompt',
  input: {schema: PersonalizedReminderInputSchema},
  output: {schema: PersonalizedReminderOutputSchema},
  prompt: `You are an AI assistant specializing in crafting personalized appointment reminders for dental patients via WhatsApp.

  Your goal is to create a friendly and effective reminder message that reduces no-shows and improves patient engagement. The reminder should include the appointment time and other relevant details.

  Here's the patient information:
  - Patient Name: {{{patientName}}}
  - Appointment Date and Time: {{{appointmentDateTime}}}
  - Dentist Name: {{{dentistName}}}
  - Practice Name: {{{practiceName}}}
  {{#if patientPreferences}}
  - Patient Preferences: {{{patientPreferences}}}
  {{/if}}

  Please generate a personalized reminder message suitable for sending via WhatsApp:
  Make it short, and friendly.
  The appointment time should be very clear.
  Do not include any disclaimers or legal jargon.
  Do not include any closing salutations, such as "Sincerely" or "Thank you".
  The message should be in French.

  Reminder:
  `,
});

const personalizedReminderFlow = ai.defineFlow(
  {
    name: 'personalizedReminderFlow',
    inputSchema: PersonalizedReminderInputSchema,
    outputSchema: PersonalizedReminderOutputSchema,
  },
  async input => {
    const {output} = await reminderPrompt(input);
    return output!;
  }
);
