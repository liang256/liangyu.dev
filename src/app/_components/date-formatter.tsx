import { parseISO, format } from "date-fns";
import { enUS, ja, zhTW } from "date-fns/locale";
import type { Locale } from "@/lib/i18n";

type Props = {
  dateString: string;
  locale: Locale;
};

const FORMATS: Record<Locale, { pattern: string; locale: typeof enUS }> = {
  en: { pattern: "LLLL	d, yyyy", locale: enUS },
  "zh-tw": { pattern: "yyyy年M月d日", locale: zhTW },
  ja: { pattern: "yyyy年M月d日", locale: ja },
};

const DateFormatter = ({ dateString, locale }: Props) => {
  const date = parseISO(dateString);
  const f = FORMATS[locale];
  return <time dateTime={dateString}>{format(date, f.pattern, { locale: f.locale })}</time>;
};

export default DateFormatter;
