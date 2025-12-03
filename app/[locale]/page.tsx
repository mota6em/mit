"use client";
import { useState, useEffect } from "react";
import QuranQuote from "@/components/Home/QuranQuote";
import Home from "@/components/Home/Home";
import { AnimatePresence, motion } from "framer-motion";

export default function Page() {
  const [showQuote, setShowQuote] = useState(() => {
    if (typeof window !== "undefined") {
      const hasShownQuote = sessionStorage.getItem("hasShownQuote");
      return !hasShownQuote;
    }
    return true;
  });

  const [hasEverShownQuote, setHasEverShownQuote] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("hasShownQuote") === "true";
    }
    return false;
  });

  useEffect(() => {
    if (showQuote) {
      sessionStorage.setItem("hasShownQuote", "true");
      setHasEverShownQuote(true);
      const timer = setTimeout(() => setShowQuote(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [showQuote]);

  return (
    <AnimatePresence>
      {showQuote ? (
        <motion.div
          key="quote"
          initial={{ opacity: 0.85, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center overflow-hidden justify-center bg-white"
        >
          <QuranQuote />
        </motion.div>
      ) : hasEverShownQuote ? (
        <Home />
      ) : (
        <motion.div
          key="home"
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <Home />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
