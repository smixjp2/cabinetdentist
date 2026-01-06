"use client";

import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { appointments, patients } from '@/lib/data';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Badge } from '../ui/badge';
import { PlusCircle, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Appointment } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

export default function AppointmentsCalendar() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [allAppointments, setAllAppointments] = React.useState<Appointment[]>(appointments);
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  const [selectedAppointment, setSelectedAppointment] = React.useState<Appointment | null>(null);
  const { toast } = useToast();

  const selectedDayAppointments = allAppointments.filter(
    (appointment) =>
      date &&
      new Date(appointment.dateTime).toDateString() === date.toDateString()
  );

  const handleAddAppointment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const patientId = formData.get('patient') as string;
    const treatment = formData.get('treatment') as string;
    const appointmentDate = formData.get('date') as string;
    const appointmentTime = formData.get('time') as string;

    const patient = patients.find(p => p.id === patientId);
    if (!patient || !treatment || !appointmentDate || !appointmentTime) {
      toast({ variant: 'destructive', title: 'Erreur', description: 'Veuillez remplir tous les champs.' });
      return;
    }

    const [hours, minutes] = appointmentTime.split(':');
    const newDateTime = new Date(appointmentDate);
    newDateTime.setHours(parseInt(hours, 10), parseInt(minutes, 10));

    const newAppointment: Appointment = {
      id: (allAppointments.length + 1).toString(),
      patientName: patient.name,
      patientAvatar: patient.avatar,
      dateTime: newDateTime,
      treatment: treatment,
      status: 'Confirmed',
    };

    setAllAppointments([...allAppointments, newAppointment]);
    setIsAddDialogOpen(false);
    toast({ title: 'Succès', description: 'Rendez-vous ajouté.' });
  };
  
  const handleSelectAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsEditDialogOpen(true);
  }

  const handleUpdateAppointment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedAppointment) return;

    const formData = new FormData(e.currentTarget);
    const patientId = formData.get('patient') as string;
    const treatment = formData.get('treatment') as string;
    const appointmentDate = formData.get('date') as string;
    const appointmentTime = formData.get('time') as string;
    
    const patient = patients.find(p => p.id === patientId);
    if (!patient || !treatment || !appointmentDate || !appointmentTime) {
      toast({ variant: 'destructive', title: 'Erreur', description: 'Veuillez remplir tous les champs.' });
      return;
    }

    const [hours, minutes] = appointmentTime.split(':');
    const newDateTime = new Date(appointmentDate);
    newDateTime.setHours(parseInt(hours, 10), parseInt(minutes, 10));

    const updatedAppointment: Appointment = {
      ...selectedAppointment,
      patientName: patient.name,
      patientAvatar: patient.avatar,
      dateTime: newDateTime,
      treatment: treatment,
    };

    setAllAppointments(allAppointments.map(appt => appt.id === updatedAppointment.id ? updatedAppointment : appt));
    setIsEditDialogOpen(false);
    setSelectedAppointment(null);
    toast({ title: 'Succès', description: 'Rendez-vous mis à jour.' });
  }

  const handleDeleteAppointment = () => {
    if (!selectedAppointment) return;

    setAllAppointments(allAppointments.filter(appt => appt.id !== selectedAppointment.id));
    setIsEditDialogOpen(false);
    setSelectedAppointment(null);
    toast({ title: 'Succès', description: 'Rendez-vous supprimé.' });
  }

  return (
    <>
    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Card>
          <CardContent className="p-0">
             <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="w-full"
                locale={fr}
                components={{
                    DayContent: ({ date }) => {
                        const dailyAppointments = allAppointments.filter(
                            (appointment) => new Date(appointment.dateTime).toDateString() === date.toDateString()
                        );
                        return (
                            <div className='relative w-full h-full flex items-center justify-center'>
                                {date.getDate()}
                                {dailyAppointments.length > 0 && (
                                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full"></span>
                                )}
                            </div>
                        );
                    }
                }}
             />
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-1">
        <Card>
            <CardHeader className='flex-row items-center justify-between'>
                <div>
                    <CardTitle>
                        {date ? format(date, 'd MMMM yyyy', { locale: fr }) : "Sélectionnez une date"}
                    </CardTitle>
                    <CardDescription>
                        {selectedDayAppointments.length} rendez-vous
                    </CardDescription>
                </div>
                 <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        RDV
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Nouveau rendez-vous</DialogTitle>
                      <DialogDescription>
                        Planifiez un nouveau rendez-vous pour un patient.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleAddAppointment}>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="patient" className="text-right">
                            Patient
                          </Label>
                           <Select name="patient">
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Sélectionner un patient" />
                            </SelectTrigger>
                            <SelectContent>
                              {patients.map(p => (
                                <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="treatment" className="text-right">
                            Soin
                          </Label>
                          <Input id="treatment" name="treatment" placeholder="Ex: Contrôle" className="col-span-3" />
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="date" className="text-right">
                            Date
                          </Label>
                          <Input id="date" name="date" type="date" defaultValue={date ? format(date, 'yyyy-MM-dd') : ''} className="col-span-3" />
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="time" className="text-right">
                            Heure
                          </Label>
                          <Input id="time" name="time" type="time" defaultValue="09:00" className="col-span-3" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Enregistrer</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
            </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {selectedDayAppointments.length > 0 ? (
                selectedDayAppointments
                  .sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime())
                  .map((appointment) => (
                    <div key={appointment.id} onClick={() => handleSelectAppointment(appointment)} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted cursor-pointer transition-colors">
                      <div className="grid gap-1 flex-1">
                        <p className="text-sm font-medium leading-none">
                          {appointment.patientName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {appointment.treatment}
                        </p>
                      </div>
                      <Badge variant="outline" className="ml-auto font-medium text-sm">
                        {format(new Date(appointment.dateTime), 'HH:mm', { locale: fr })}
                      </Badge>
                    </div>
                  ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-8">
                  Aucun rendez-vous pour cette date.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>

    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Modifier le rendez-vous</DialogTitle>
            <DialogDescription>
              Mettez à jour les informations ou supprimez le rendez-vous.
            </DialogDescription>
          </DialogHeader>
          {selectedAppointment && (
            <form onSubmit={handleUpdateAppointment}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="patient-edit" className="text-right">
                    Patient
                  </Label>
                  <Select name="patient" defaultValue={patients.find(p => p.name === selectedAppointment.patientName)?.id}>
                    <SelectTrigger id="patient-edit" className="col-span-3">
                      <SelectValue placeholder="Sélectionner un patient" />
                    </SelectTrigger>
                    <SelectContent>
                      {patients.map(p => (
                        <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="treatment-edit" className="text-right">
                    Soin
                  </Label>
                  <Input id="treatment-edit" name="treatment" defaultValue={selectedAppointment.treatment} className="col-span-3" />
                </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date-edit" className="text-right">
                    Date
                  </Label>
                  <Input id="date-edit" name="date" type="date" defaultValue={format(new Date(selectedAppointment.dateTime), 'yyyy-MM-dd')} className="col-span-3" />
                </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="time-edit" className="text-right">
                    Heure
                  </Label>
                  <Input id="time-edit" name="time" type="time" defaultValue={format(new Date(selectedAppointment.dateTime), 'HH:mm')} className="col-span-3" />
                </div>
              </div>
              <DialogFooter className='justify-between'>
                <Button type="button" variant="destructive" onClick={handleDeleteAppointment}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Supprimer
                </Button>
                <div className='flex gap-2'>
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">Annuler</Button>
                  </DialogClose>
                  <Button type="submit">Mettre à jour</Button>
                </div>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
