type DateOnlyFormatOptions = {
  month?: "short" | "long";
};

const DATE_ONLY_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

const formatters = {
  short: new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }),
  long: new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }),
};

export function getDateOnlyTime(dateStr: string) {
  return parseDateOnlyAsUtc(dateStr).getTime();
}

export function formatDateOnly(
  dateStr: string,
  { month = "long" }: DateOnlyFormatOptions = {}
) {
  return formatters[month].format(parseDateOnlyAsUtc(dateStr));
}

function parseDateOnlyAsUtc(dateStr: string) {
  const match = DATE_ONLY_PATTERN.exec(dateStr);

  if (!match) {
    return new Date(dateStr);
  }

  const [, year, month, day] = match;
  return new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
}
