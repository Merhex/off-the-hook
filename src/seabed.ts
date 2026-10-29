/**
 * Seabed decorations: every milestone leaves a decoration on the home screen's seabed.
 * Once earned, a decoration stays for good, even if the quit date later moves. After a year
 * the coral keeps growing and shifts colour every month, so there's never a finished set.
 */
import type { Lang } from './cards';
import { daysSince, MILESTONES } from './milestones';

export interface EarnedDecoration {
  /** When it was earned (ISO time). */
  earnedAt: string;
  /** Has sparkled on the home screen yet. It sparkles once, the first time the player sees it. */
  seen: boolean;
}

export interface Seabed {
  /** Earned decorations, keyed by milestone ID (permanent). Never removed. */
  earned: Record<string, EarnedDecoration>;
  /** Months the coral has grown past the one-year mark. Only ever goes up. */
  coralMonths: number;
}

export const emptySeabed = (): Seabed => ({ earned: {}, coralMonths: 0 });

/** What each milestone leaves on the seabed, by milestone ID. Czech, Dutch and Lithuanian need a native speaker's read. */
export const DECORATION_NAMES: Record<string, Record<Lang, string>> = {
  'quit-day': { en: 'a small anchor', cs: 'malá kotva', nl: 'een klein anker', lt: 'mažas inkaras' },
  'day-1': { en: 'a shell', cs: 'mušle', nl: 'een schelp', lt: 'kriauklė' },
  'day-3': { en: 'a bright starfish', cs: 'zářivá hvězdice', nl: 'een felle zeester', lt: 'ryški jūrų žvaigždė' },
  'week-1': { en: 'a coral branch', cs: 'korálová větvička', nl: 'een koraaltakje', lt: 'koralo šakelė' },
  'week-2': { en: 'an anemone', cs: 'mořská sasanka', nl: 'een zeeanemoon', lt: 'jūrų anemonas' },
  'month-1': { en: 'a pearl in a clam', cs: 'perla v lastuře', nl: 'een parel in een schelp', lt: 'perlas kriauklėje' },
  'month-2': { en: 'a glowing jellyfish', cs: 'svítící medúza', nl: 'een gloeiende kwal', lt: 'švytinti medūza' },
  'month-3': { en: 'a lantern', cs: 'lucerna', nl: 'een lantaarn', lt: 'žibintas' },
  'month-6': { en: 'a small shipwreck', cs: 'malý vrak lodi', nl: 'een klein scheepswrak', lt: 'mažos laivo nuolaužos' },
  'year-1': { en: 'a sunken castle', cs: 'potopený hrad', nl: 'een gezonken kasteel', lt: 'nuskendusi pilis' },
};

/** Whole calendar months from the quit date (YYYY-MM-DD) to `now`, in local time. Never negative. */
export function monthsSince(quitDate: string, now = new Date()): number {
  const [y, m, d] = quitDate.split('-').map(Number);
  const months = (now.getFullYear() - y) * 12 + (now.getMonth() + 1 - m) - (now.getDate() < d ? 1 : 0);
  return Math.max(0, months);
}

/**
 * The seabed with everything reached by `now` added. Nothing is ever removed and the coral never
 * shrinks, so moving the quit date later keeps what was earned. Returns the same object when nothing
 * is new, so callers can skip saving.
 */
export function withEarned(seabed: Seabed, quitDate: string | null, now = new Date()): Seabed {
  if (!quitDate) return seabed;
  const days = daysSince(quitDate, now);
  const fresh = MILESTONES.filter((m) => m.day <= days && !seabed.earned[m.id]);
  const coralMonths = Math.max(seabed.coralMonths, monthsSince(quitDate, now) - 12);
  if (!fresh.length && coralMonths === seabed.coralMonths) return seabed;
  const earned = { ...seabed.earned };
  for (const m of fresh) earned[m.id] = { earnedAt: now.toISOString(), seen: false };
  return { earned, coralMonths };
}

/** The seabed with these decorations marked as seen (they've had their sparkle). */
export function markSeen(seabed: Seabed, ids: string[]): Seabed {
  const earned = { ...seabed.earned };
  for (const id of ids) if (earned[id]) earned[id] = { ...earned[id], seen: true };
  return { ...seabed, earned };
}

/**
 * How the coral looks after `months` past a year: a little bigger each month for a year, then it
 * stays that size, and a little further round the colour wheel every month, with no last colour.
 */
export function coralLook(months: number): { scale: number; hue: number } {
  return { scale: 1 + Math.min(months, 12) * 0.04, hue: (months * 25) % 360 };
}
