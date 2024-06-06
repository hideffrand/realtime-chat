export function toDate(s: string) {
  return new Date(s) as any;
}

export function getDateDifference(start: any, finish: any) {
  return start - finish;
}

export function getDateDifferenceFromDateNow(dateString: string): string {
  const millisecondsDifference = Date.now() - toDate(dateString).getTime();
  const millisecondsInADay = 24 * 60 * 60 * 1000;
  const daysDifference = Math.floor(
    millisecondsDifference / millisecondsInADay
  );

  if (daysDifference === 1) return "yesterday";

  const day = toDate(dateString).getDate().toString().padStart(2, "0");
  const month = (toDate(dateString).getMonth() + 1).toString().padStart(2, "0");
  const year = toDate(dateString).getFullYear();

  return `${day}/${month}/${year}`;
}

export function formatDatetimeToHoursMinutes(date: string) {
  return toDate(date).toLocaleTimeString(navigator.language, {
    hour: "2-digit",
    minute: "2-digit",
  });
}
