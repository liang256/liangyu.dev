import type { Locale } from "@/lib/i18n";
import en, { type Dictionary } from "./en";
import ja from "./ja";
import zhTw from "./zh-tw";

const dictionaries: Record<Locale, Dictionary> = { en, "zh-tw": zhTw, ja };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
