import { Card } from "@/components/ui/card";
import { Search, Filter } from "lucide-react";

export default function LeadsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
        <p className="mt-1 text-sm text-gray-500">
          Track and manage incoming leads.
        </p>
      </div>

      {/* Filters / search placeholder */}
      <Card className="flex flex-wrap items-center gap-4">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
          <Search className="h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search leads..."
            disabled
            className="flex-1 bg-transparent text-sm text-gray-500 outline-none placeholder:text-gray-400"
          />
        </div>
        <button
          disabled
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-500"
        >
          <Filter className="h-4 w-4" />
          Filters
        </button>
      </Card>

      {/* Table */}
      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-100 bg-gray-50">
              <tr>
                <th className="px-6 py-3 font-medium text-gray-500">Name</th>
                <th className="px-6 py-3 font-medium text-gray-500">Email</th>
                <th className="px-6 py-3 font-medium text-gray-500">
                  Category
                </th>
                <th className="px-6 py-3 font-medium text-gray-500">Status</th>
                <th className="px-6 py-3 font-medium text-gray-500">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={5} className="px-6 py-16 text-center">
                  <p className="text-gray-400">No leads yet</p>
                  <p className="mt-1 text-xs text-gray-300">
                    Leads will appear here once the system is live.
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
