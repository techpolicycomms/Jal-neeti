import { Card } from "@/components/ui/card";

export default function ContactsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Contact Enquiries</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage incoming contact form submissions.
        </p>
      </div>

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
                <th className="px-6 py-3 font-medium text-gray-500">
                  Message
                </th>
                <th className="px-6 py-3 font-medium text-gray-500">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={5} className="px-6 py-16 text-center">
                  <p className="text-gray-400">No contact enquiries yet</p>
                  <p className="mt-1 text-xs text-gray-300">
                    Submissions from the contact form will appear here.
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
