"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import QuranQuote from "@/components/Home/QuranQuote";
import { motion } from "framer-motion";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/en");
    }, 2500);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <motion.div
      initial={{ opacity: 0.5, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex items-center overflow-hidden justify-center bg-white"
      style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <QuranQuote />
    </motion.div>
  );
}
