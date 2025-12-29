import { FaUsers, FaCalendarAlt, FaHashtag } from "react-icons/fa";

export const STATS_CONFIG = [
  {
    icon: FaUsers,
    target: 10,
    suffix: "+",
    key: "years",
    color: "text-[#2D9B4A]",
  },
  {
    icon: FaCalendarAlt,
    target: 100,
    suffix: "+",
    key: "events",
    color: "text-[#F9BC15]",
  },
  {
    icon: FaHashtag,
    target: 1500,
    suffix: "+",
    key: "social",
    color: "text-[#00ADEF]",
  },
] as const;

export type StatKey = (typeof STATS_CONFIG)[number]["key"];
