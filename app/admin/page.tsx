import Link from "next/link";
import { HiCalendar, HiMail, HiSparkles } from "react-icons/hi";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

          {/* Highlights Card */}
          <Link
            href="/admin/highlights"
            className="group p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="p-4 bg-purple-100 text-purple-600 rounded-xl group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <HiSparkles className="text-3xl" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Highlights</h2>
                <p className="text-gray-500 text-sm">
                  Manage announcements and highlights.
                </p>
              </div>
            </div>
          </Link>

          {/* Newsletter Card */}
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
