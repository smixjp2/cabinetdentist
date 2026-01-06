import Header from "@/components/layout/header";
import StatsCards from "@/components/dashboard/stats-cards";
import RevenueChart from "@/components/dashboard/revenue-chart";
import UpcomingAppointments from "@/components/dashboard/upcoming-appointments";
import ReminderGenerator from "@/components/ai/reminder-generator";

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-full">
      <Header title="Tableau de bord" />
      <main className="flex-1 overflow-auto p-4 md:p-6 space-y-6">
        <StatsCards />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <div className="lg:col-span-4">
            <RevenueChart />
          </div>
          <div className="lg:col-span-3">
             <UpcomingAppointments />
          </div>
        </div>
         <div className="grid gap-6 md:grid-cols-1">
          <ReminderGenerator />
        </div>
      </main>
    </div>
  );
}
