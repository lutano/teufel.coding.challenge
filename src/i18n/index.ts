import { createI18n } from "vue-i18n";
import enGB from "./locales/en-gb.json";
import deDE from "./locales/de-de.json";
import itIT from "./locales/it-it.json";

export const SUPPORTED_LOCALES = ["en-GB", "de-DE", "it-IT"];
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const i18n = createI18n({
  legacy: false,
  locale: SUPPORTED_LOCALES[0],
  fallbackLocale: SUPPORTED_LOCALES[0],
  messages: {
    "en-GB": enGB,
    "de-DE": deDE,
    "it-IT": itIT,
  },
});

// Add locale management functionalities
export function useLocale() {
  const setLocale = async (locale: SupportedLocale) => {
    (i18n.global.locale.value as SupportedLocale) = locale;
    document.querySelector("html")?.setAttribute("lang", locale);
  };
  return {
    setLocale,
    currentLocale: i18n.global.locale,
    supportedLocales: SUPPORTED_LOCALES,
  };
}
