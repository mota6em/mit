// app/admin/page.tsx
import Link from "next/link";
import { HiCalendar, HiMail } from "react-icons/hi"; // Added HiMail

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Events Card */}
          <Link
            href="/admin/events"
            className="group p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="p-4 bg-blue-100 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <HiCalendar className="text-3xl" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Manage Events</h2>
                <p className="text-gray-500 text-sm">
                  Create, edit, or delete community programs.
                </p>
              </div>
            </div>
          </Link>

          {/* Newsletter Card - NEW */}
          <Link
            href="/admin/newsletter"
            className="group p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="p-4 bg-amber-100 text-amber-600 rounded-xl group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <HiMail className="text-3xl" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Newsletter</h2>
                <p className="text-gray-500 text-sm">
                  Manage subscribers and copy email lists.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
