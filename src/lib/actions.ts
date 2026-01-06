"use server";

import { generatePersonalizedReminder, type PersonalizedReminderInput } from "@/ai/flows/personalized-automated-reminders";
import { z } from "zod";

const ReminderSchema = z.object({
    patientName: z.string().min(1, "Le nom du patient est requis."),
    appointmentDateTime: z.string().min(1, "La date du rendez-vous est requise."),
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
        patientName: formData.get("patientName"),
        appointmentDateTime: formData.get("appointmentDateTime"),
    });

    if (!validatedFields.success) {
        return {
            errorMessage: validatedFields.error.flatten().fieldErrors.patientName?.[0] || validatedFields.error.flatten().fieldErrors.appointmentDateTime?.[0]
        };
    }
    
    try {
        const input: PersonalizedReminderInput = {
            ...validatedFields.data,
            dentistName: "Dr. Alaoui",
            practiceName: "DentiCare Maroc",
        };

        const result = await generatePersonalizedReminder(input);

        return { message: result.reminderMessage };
    } catch (error) {
        console.error("Error generating reminder:", error);
        return { errorMessage: "Une erreur est survenue lors de la génération du rappel." };
    }
}
