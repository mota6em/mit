// app/admin/page.tsx
import Link from "next/link";
import { HiCalendar, HiLogout } from "react-icons/hi";
import { signOut } from "@/auth";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button className="flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-lg font-bold">
              <HiLogout /> Logout
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          {/* Add future admin modules here */}
        </div>
      </div>
    </div>
  );
}
