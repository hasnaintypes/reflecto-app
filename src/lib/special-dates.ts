import Holidays from "date-holidays";

const holidayCache = new Map<string, ReturnType<Holidays["getHolidays"]>>();

/**
 * Utility to identify special dates (holidays, observances, etc.)
 * Using date-holidays for comprehensive coverage.
 */
export interface SpecialDate {
  name: string;
  type: string;
}

export function getSpecialDetails(
  date: Date,
  countryCode = "US",
): SpecialDate[] {
  const hd = new Holidays();

  // Initialize with the specified country.
  hd.init(countryCode);

  const targetYear = date.getFullYear();
  const targetMonth = date.getMonth();
  const targetDay = date.getDate();

  const cacheKey = `${countryCode}-${targetYear}`;
  let allHolidays = holidayCache.get(cacheKey);
  if (!allHolidays) {
    allHolidays = hd.getHolidays(targetYear);
    holidayCache.set(cacheKey, allHolidays);
  }
  const results: SpecialDate[] = [];

  // Find holidays that match the day and month
  allHolidays.forEach((h) => {
    // h.date can be a string like "2026-02-14 00:00:00"
    // We parse it and check month/day to avoid timezone issues
    const [datePart] = h.date.split(" ");
    if (datePart) {
      const [, m, d] = datePart.split("-").map(Number);
      if (m === targetMonth + 1 && d === targetDay) {
        if (!results.some((r) => r.name === h.name)) {
          results.push({
            name: h.name,
            type: h.type,
          });
        }
      }
    }
  });

  // Common truly global observances that might be missing or preferred with specific names
  const month1Idx = targetMonth + 1;

  const manualHolidays: {
    month: number;
    day: number;
    name: string;
    type: string;
  }[] = [
    { month: 2, day: 14, name: "Valentine's Day", type: "observance" },
    { month: 3, day: 8, name: "International Women's Day", type: "observance" },
    { month: 11, day: 19, name: "International Men's Day", type: "observance" },
    { month: 1, day: 1, name: "New Year's Day", type: "holiday" },
  ];

  manualHolidays.forEach((mh) => {
    if (mh.month === month1Idx && mh.day === targetDay) {
      if (
        !results.some((r) =>
          r.name.toLowerCase().includes(mh.name.toLowerCase()),
        )
      ) {
        results.push({ name: mh.name, type: mh.type });
      }
    }
  });

  return results;
}
