import "server-only";

const dictionaries = {
  en: () => import("@public/locales/en.json").then((module) => module.default),
  fr: () => import("@public/locales/fr.json").then((module) => module.default),
};

export type Locale = keyof typeof dictionaries;
export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;

export const getDictionary = async <T extends Locale>(locale: T) => {
  if (typeof dictionaries[locale] === "function") return dictionaries[locale]();
  return dictionaries.en();
};
