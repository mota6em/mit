import { FaUsers, FaCalendarAlt, FaSeedling } from "react-icons/fa";

export const STATS_CONFIG = [
  {
    icon: FaSeedling,
    target: 10,
    suffix: "+",
    key: "years",
    color: "text-brand-green",
  },
  {
    icon: FaCalendarAlt,
    target: 100,
    suffix: "+",
    key: "events",
    color: "text-brand-gold",
  },
  {
    icon: FaUsers,
    target: 1500,
    suffix: "+",
    key: "social",
    color: "text-brand-sky",
  },
] as const;

export type StatKey = (typeof STATS_CONFIG)[number]["key"];
