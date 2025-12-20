"use client";
import { useNewsletter } from "@/app/hooks/useNewsletter";
import { HiTrash, HiPencil, HiClipboardCopy, HiX } from "react-icons/hi";

export default function AdminNewsletter() {
  const {
    subscribers,
    form,
    setForm,
    loading,
    isEditing,
    setIsEditing,
    handleSave,
    handleDelete,
    copyEmails,
    resetForm,
  } = useNewsletter();

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Newsletter</h1>
          <p className="text-sm text-gray-500">
            Manage your {subscribers.length} subscribers
          </p>
        </div>
        <button
          onClick={copyEmails}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-bold shadow-md"
        >
          <HiClipboardCopy /> Copy All Emails
        </button>
      </header>

      {/* Form */}
      <form
        onSubmit={handleSave}
        className="bg-white p-6 rounded-2xl border shadow-sm flex flex-wrap gap-4 items-end"
      >
        <div className="flex-1 min-w-[200px]">
          <label className="text-xs font-bold text-gray-400 uppercase">
            Name
          </label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full mt-1 p-2 border rounded-lg outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="text-xs font-bold text-gray-400 uppercase">
            Email
          </label>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full mt-1 p-2 border rounded-lg outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="px-6 py-2 bg-gray-900 text-white rounded-lg font-bold"
          >
            {isEditing ? "Update" : "Add Subscriber"}
          </button>
          {isEditing && (
            <button
              onClick={resetForm}
              type="button"
              className="p-2 text-gray-400"
            >
              <HiX className="text-2xl" />
            </button>
          )}
        </div>
      </form>

      {/* Table */}
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-xs font-bold text-gray-500 uppercase">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={3} className="p-10 text-center text-gray-400">
                  Loading...
                </td>
              </tr>
            ) : (
              subscribers.map((s) => (
                <tr key={s._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium">{s.name}</td>
                  <td className="px-6 py-4 text-gray-500">{s.email}</td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                    <button
                      onClick={() => {
                        setForm(s);
                        setIsEditing(true);
                      }}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                    >
                      <HiPencil />
                    </button>
                    <button
                      onClick={() => handleDelete(s._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <HiTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
