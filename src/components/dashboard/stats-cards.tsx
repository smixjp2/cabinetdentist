import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Users, CalendarCheck2, Activity } from "lucide-react";

export default function StatsCards() {
  const stats = [
    {
      title: "Chiffre d'affaires (Aujourd'hui)",
      value: "12,500 MAD",
      icon: DollarSign,
      change: "+15.2% vs hier",
    },
    {
      title: "Rendez-vous prévus",
      value: "8",
      icon: CalendarCheck2,
      change: "2 annulations",
    },
    {
      title: "Nouveaux patients (Mois)",
      value: "14",
      icon: Users,
      change: "+5 depuis le mois dernier",
    },
    {
      title: "Taux de présence",
      value: "92%",
      icon: Activity,
      change: "En hausse cette semaine",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
