"use client";
import { HiSparkles } from "react-icons/hi";

export const HeroBadges = () => {
  return (
    <div className="mt-4 flex items-center justify-center gap-0 text-sm text-gray-500 font-medium">
      <div className="w-6 h-6 flex items-center justify-center text-yellow-600 text-3xl animate-pulse">
        <HiSparkles />
      </div>
      <p>Discover our community's milestones and achievements</p>
    </div>
  );
};
