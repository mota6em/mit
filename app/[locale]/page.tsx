"use client";
import { useState, useEffect } from "react";
import QuranQuote from "@/components/Home/QuranQuote";
import Home from "@/components/Home/Home";

export default function Page() {
  const [showQuote, setShowQuote] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowQuote(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-full">
      {/* Main page always rendered in background */}
      <Home />

      {/* QuranQuote overlay */}
      {showQuote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 transition-opacity duration-700 ease-in-out">
          <QuranQuote />
        </div>
      )}
    </div>
  );
}
