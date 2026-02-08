import { format, isToday, isYesterday, startOfDay, endOfDay } from "date-fns";

export const formatDate = (date: Date) => {
  if (isToday(date)) return `Today, ${format(date, "h:mm a")}`;
  if (isYesterday(date)) return `Yesterday, ${format(date, "h:mm a")}`;
  return format(date, "MMM d, yyyy");
};

export const getDayRange = (date: Date) => {
  return {
    start: startOfDay(date),
    end: endOfDay(date),
  };
};
