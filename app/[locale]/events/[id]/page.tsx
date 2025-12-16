"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion"; // Added for smooth entry animation

// Interface for the data we expect from API
interface ApiEvent {
  _id: string;
  img: string;
  title_en: string;
  title_hu: string;
  desc_en: string;
  desc_hu: string;
  date: string;
}

// Translations
const dictionary = {
  en: {
    back: "Back to Home",
    dateLabel: "Date",
    notFoundTitle: "Event Not Found",
    notFoundDesc: "The event you are looking for does not exist or has been removed.",
    loading: "Loading event details...",
    share: "Share Event"
  },
  hu: {
    back: "Vissza a főoldalra",
    dateLabel: "Dátum",
    notFoundTitle: "Esemény nem található",
    notFoundDesc: "A keresett esemény nem létezik, vagy törölve lett.",
    loading: "Esemény betöltése...",
    share: "Megosztás"
  }
};

export default function EventPage() {
  const params = useParams();
  const id = params.id as string;
  const rawLocale = params.locale as string;
  const locale = rawLocale === "hu" ? "hu" : "en";
  const dict = dictionary[locale];

  const [event, setEvent] = useState<ApiEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/events?id=${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Event not found");
        return res.json();
      })
      .then((data) => {
        setEvent(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
        setLoading(false);
      });
  }, [id]);

  // --- 1. Loading State ---
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9f9f9]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-600 border-t-transparent"></div>
          <p className="text-green-800 font-semibold Carena-font text-lg tracking-wide">{dict.loading}</p>
        </div>
      </div>
    );
  }

  // --- 2. Error State ---
  if (error || !event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f9f9f9] text-center px-4">
        <h1 className="text-4xl font-bold text-green-800 mb-4 Carena-font">{dict.notFoundTitle}</h1>
        <p className="text-gray-500 mb-8 max-w-md">{dict.notFoundDesc}</p>
        <Link
          href={`/${locale}`}
          className="px-8 py-3 bg-green-700 text-white rounded-full font-bold hover:bg-green-800 transition shadow-lg"
        >
          {dict.back}
        </Link>
      </div>
    );
  }

  // --- 3. Success State ---
  const title = locale === "hu" ? event.title_hu : event.title_en;
  const description = locale === "hu" ? event.desc_hu : event.desc_en;
  
  const dateFormatted = new Date(event.date).toLocaleDateString(
    locale === 'hu' ? 'hu-HU' : 'en-US', 
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  return (
    <div className="min-h-screen bg-[#f9f9f9] py-12 px-4 md:px-8 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-green-100 rounded-full blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-100 rounded-full blur-3xl opacity-50 translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl w-full mx-auto bg-white rounded-[2rem] shadow-xl overflow-hidden relative z-10 border border-gray-100"
      >
        
        {/* Image Section */}
        <div className="relative w-full h-[300px] md:h-[450px] group">
          {event.img ? (
            <Image
              src={event.img}
              alt={title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-100 text-gray-400">
              No Image Available
            </div>
          )}
          
          {/* Overlay Gradient for better text visibility if needed, or just style */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>

          {/* Floating Back Button */}
          <Link 
            href={`/${locale}`}
            className="absolute top-6 left-6 bg-white/90 backdrop-blur-md p-3 rounded-full shadow-lg hover:bg-white text-green-800 transition-all hover:scale-110 z-20 group-hover:shadow-xl"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </Link>

          {/* Date Badge on Image */}
          <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm px-5 py-2 rounded-full shadow-lg flex items-center gap-2">
             <span className="text-green-700 font-bold text-sm uppercase tracking-wider">{dateFormatted}</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 md:p-12">
          
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 Carena-font leading-tight">
            {title}
          </h1>

          {/* Description */}
          <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed whitespace-pre-wrap">
             {/* We use a slight background for the text to make it pop like a letter/card */}
             <div className="bg-gray-50 p-6 md:p-8 rounded-2xl border border-gray-100/50">
               {description}
             </div>
          </div>

          {/* Action Footer */}
          <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Author / Organization Info (Static for now to match MIT style) */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold">
                M
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-900">MIT Organization</span>
                <span className="text-xs text-gray-500">Official Event</span>
              </div>
            </div>

            {/* Main Action Button */}
            <Link
              href={`/${locale}`}
              className="inline-block px-8 py-3 bg-yellow-600 text-white rounded-full font-bold text-sm tracking-wide hover:bg-yellow-700 hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              {dict.back}
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}