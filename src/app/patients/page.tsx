import Header from "@/components/layout/header";
import { PatientTable } from "@/components/patients/patient-table";

export default function PatientsPage() {
  return (
    <div className="flex flex-col h-full">
      <Header title="Gestion des patients" />
      <main className="flex-1 overflow-auto p-4 md:p-6">
        <PatientTable />
      </main>
    </div>
  );
}
