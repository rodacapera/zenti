import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n, { LanguageDetectorModule } from "i18next";
import { initReactI18next } from "react-i18next";
import * as RNLocalize from "react-native-localize";

import {
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
  SUPPORTED_LANGUAGES,
  SupportedLanguage,
  isSupportedLanguage,
} from "./supported-languages";
import { enTranslations } from "./resources/en";
import { esTranslations } from "./resources/es";

type TranslationResources = {
  common: typeof enTranslations.common;
  auth: typeof enTranslations.auth;
  navigation: typeof enTranslations.navigation;
  language: typeof enTranslations.language;
};

const resources: Record<SupportedLanguage, { translation: TranslationResources }> = {
  en: { translation: enTranslations },
  es: { translation: esTranslations },
};

const findBestAvailableLanguage = (): SupportedLanguage => {
  const availableLanguageTags = SUPPORTED_LANGUAGES.map(({ code }) => code);
  const bestMatch = RNLocalize.findBestAvailableLanguage(availableLanguageTags);

  if (bestMatch?.languageTag) {
    const normalized = bestMatch.languageTag.split("-")[0];
    if (isSupportedLanguage(normalized)) {
      return normalized;
    }
  }

  return DEFAULT_LANGUAGE;
};

const languageDetector: LanguageDetectorModule = {
  type: "languageDetector",
  async: true,
  init: () => undefined,
  detect: async (callback) => {
    try {
      const storedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (isSupportedLanguage(storedLanguage)) {
        callback(storedLanguage);
        return;
      }
    } catch (error) {
      console.warn("Failed to read language from storage", error);
    }

    callback(findBestAvailableLanguage());
  },
  cacheUserLanguage: async (language) => {
    if (isSupportedLanguage(language)) {
      try {
        await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, language);
      } catch (error) {
        console.warn("Failed to persist language selection", error);
      }
    }
  },
};

if (!i18n.isInitialized) {
  i18n
    .use(languageDetector)
    .use(initReactI18next)
    .init({
      compatibilityJSON: "v4",
      resources,
      fallbackLng: DEFAULT_LANGUAGE,
      defaultNS: "translation",
      ns: ["translation"],
      interpolation: {
        escapeValue: false,
      },
      returnNull: false,
      react: {
        useSuspense: false,
      },
    })
    .catch((error) => {
      console.error("Failed to initialize i18next", error);
    });
}

export type AppTranslationResources = TranslationResources;

export default i18n;

