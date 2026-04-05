import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const columns = [
  { title: "Prospect", variant: "default" as const },
  { title: "In Discussion", variant: "primary" as const },
  { title: "Committed", variant: "accent" as const },
  { title: "Funded", variant: "success" as const },
];

export default function InvestorsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Investors</h1>
        <p className="mt-1 text-sm text-gray-500">
          Pipeline overview of investor engagement.
        </p>
      </div>

      {/* Kanban columns */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {columns.map((col) => (
          <div key={col.title} className="space-y-3">
            <div className="flex items-center justify-between">
              <Badge variant={col.variant}>{col.title}</Badge>
              <span className="text-xs text-gray-400">0</span>
            </div>
            <Card className="min-h-[200px] border-dashed">
              <div className="flex h-full items-center justify-center">
                <p className="text-sm text-gray-300">No investors</p>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
