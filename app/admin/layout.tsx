import { auth } from "@/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // If not authenticated, render only children (login page)
  if (!session) {
    return <div className="min-h-screen bg-gray-50">{children}</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-50 overflow-x-hidden">
      <AdminSidebar />

      <main className="flex-1 w-full min-h-screen pt-20 md:pt-6 md:ml-60 transition-all duration-300">
        <div className="w-full">{children}</div>
      </main>
    </div>
  );
}
