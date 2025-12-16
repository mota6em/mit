"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { HiLockClosed } from "react-icons/hi";

interface AdminPasswordInputProps {
  adminPassword: string;
  setAdminPassword: (password: string) => void;
}

export default function AdminPasswordInput({
  adminPassword,
  setAdminPassword,
}: AdminPasswordInputProps) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const key = searchParams.get("key");
    if (key && key !== adminPassword) {
      setAdminPassword(key);
    }
  }, [searchParams, setAdminPassword, adminPassword]);

  return (
    <div className="flex items-center gap-3 bg-blue-50 px-4 py-3 rounded-xl border border-blue-100 w-full md:w-auto">
      <HiLockClosed
        className={`text-xl ${
          adminPassword ? "text-green-500" : "text-gray-400"
        }`}
      />
      <div className="flex-grow">
        <label className="block text-xs font-bold text-blue-800 uppercase tracking-wider mb-0.5">
          Admin Key
        </label>
        <input
          type="text"
          placeholder="Enter Secret..."
          value={adminPassword}
          onChange={(e) => setAdminPassword(e.target.value)}
          className="bg-transparent border-none p-0 text-gray-800 placeholder-gray-400 focus:ring-0 w-full text-sm font-medium outline-none"
        />
      </div>
      {adminPassword && (
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
      )}
    </div>
  );
}
