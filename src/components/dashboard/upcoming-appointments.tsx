import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { appointments } from "@/lib/data";
import { format } from "date-fns";
import { fr } from 'date-fns/locale';

export default function UpcomingAppointments() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Rendez-vous du jour</CardTitle>
        <CardDescription>
          Vous avez {appointments.length} rendez-vous aujourd'hui.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="flex items-center gap-4">
              <Avatar className="hidden h-10 w-10 sm:flex">
                <AvatarImage src={appointment.patientAvatar} alt={appointment.patientName} />
                <AvatarFallback>{appointment.patientName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="grid gap-1 flex-1">
                <p className="text-sm font-medium leading-none">
                  {appointment.patientName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {appointment.treatment}
                </p>
              </div>
              <div className="ml-auto font-medium text-sm">
                {format(appointment.dateTime, 'HH:mm', { locale: fr })}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
