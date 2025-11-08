export const LANGUAGE_STORAGE_KEY = "settings.language";

export const SUPPORTED_LANGUAGES = [
  { code: "es", label: "Español" },
  { code: "en", label: "English" },
] as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]["code"];

export const DEFAULT_LANGUAGE: SupportedLanguage = "es";

export const isSupportedLanguage = (
  language: string | null | undefined
): language is SupportedLanguage =>
  SUPPORTED_LANGUAGES.some(({ code }) => code === language);

