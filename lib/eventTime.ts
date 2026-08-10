import type { ApiEvent } from "@/lib/types";

const DAY_INDEX: Record<string, number> = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

const GRACE_MS = 2 * 60 * 60 * 1000;

function parseTime(time?: string): [number, number] {
  const match = /^(\d{1,2}):(\d{2})/.exec(time ?? "");
  return match ? [Number(match[1]), Number(match[2])] : [12, 0];
}

function nextRecurrence(days: string[], time: string | undefined, from: number) {
  const [hours, minutes] = parseTime(time);
  let best: number | null = null;

  for (const day of days) {
    const target = DAY_INDEX[day];
    if (target === undefined) continue;

    const candidate = new Date(from);
    candidate.setHours(hours, minutes, 0, 0);
    candidate.setDate(candidate.getDate() + ((target - candidate.getDay() + 7) % 7));
    if (candidate.getTime() + GRACE_MS < from) {
      candidate.setDate(candidate.getDate() + 7);
    }

    const value = candidate.getTime();
    if (best === null || value < best) best = value;
  }

  return best;
}

export function nextOccurrence(event: ApiEvent, from: number): number | null {
  if (event.isRecurring) {
    if (!event.recurringDays?.length) return null;
    return nextRecurrence(event.recurringDays, event.time, from);
  }

  if (!event.date) return null;

  const when = new Date(event.date);
  if (Number.isNaN(when.getTime())) return null;

  const [hours, minutes] = parseTime(event.time);
  when.setHours(hours, minutes, 0, 0);

  const value = when.getTime();
  return value + GRACE_MS < from ? null : value;
}

export function placeLabel(location?: string): string | undefined {
  const value = location?.trim();
  if (!value) return undefined;
  if (value.startsWith("<") || /https?:\/\//i.test(value)) return undefined;
  return value;
}

export function mapSource(location?: string): string | undefined {
  const value = location?.trim();
  if (!value) return undefined;

  const embedded = /src=["']([^"']+)["']/.exec(value);
  const url = embedded?.[1] ?? value;

  return /^https?:\/\//i.test(url) ? url : undefined;
}
