import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Users, TrendingUp, Box, MessageSquare } from "lucide-react";

const stats = [
  {
    label: "Total Leads",
    value: "0",
    icon: Users,
    href: "/admin/leads",
    badge: "Leads",
    badgeVariant: "primary" as const,
  },
  {
    label: "Active Investors",
    value: "0",
    icon: TrendingUp,
    href: "/admin/investors",
    badge: "Investors",
    badgeVariant: "success" as const,
  },
  {
    label: "Units Deployed",
    value: "\u2014",
    icon: Box,
    href: "/admin/units",
    badge: "Units",
    badgeVariant: "water" as const,
  },
  {
    label: "Pending Contacts",
    value: "0",
    icon: MessageSquare,
    href: "/admin/contacts",
    badge: "Contacts",
    badgeVariant: "accent" as const,
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Overview of Jal Neeti operations.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="relative">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div className="rounded-lg bg-gray-100 p-2">
                  <Icon className="h-5 w-5 text-gray-600" />
                </div>
              </div>
              <div className="mt-4">
                <Badge variant={stat.badgeVariant}>{stat.badge}</Badge>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Link
              key={stat.href}
              href={stat.href}
              className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              <stat.icon className="h-4 w-4 text-gray-500" />
              View {stat.badge}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
