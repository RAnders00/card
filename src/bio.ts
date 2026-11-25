/**
 * Calculates age in completed years from an ISO 8601 date (YYYY-MM-DD) using
 * local calendar fields to avoid UTC timezone off-by-one shifts.
 */
export function calculateAge(
  birthday: string | undefined,
  now: Date = new Date(),
): number | null {
  if (!birthday) return null;

  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(birthday.trim());
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;

  let age = now.getFullYear() - year;
  const currentMonth = now.getMonth() + 1;
  const currentDay = now.getDate();

  if (currentMonth < month || (currentMonth === month && currentDay < day)) {
    age -= 1;
  }

  return age >= 0 ? age : null;
}

/**
 * Replaces `{age}` placeholders in the profile bio when a valid birthday is set.
 */
export function formatBio(
  bio: string,
  birthday?: string,
  now: Date = new Date(),
): string {
  if (!bio.includes('{age}')) return bio;
  const age = calculateAge(birthday, now);
  return age === null ? bio : bio.replaceAll('{age}', String(age));
}
