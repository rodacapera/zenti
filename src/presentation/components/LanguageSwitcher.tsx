import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from "react-i18next";

import {
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
  SupportedLanguage,
  isSupportedLanguage,
} from "../../core/localization/supported-languages";

const getNormalizedLanguage = (language?: string | null): SupportedLanguage => {
  if (!language) {
    return DEFAULT_LANGUAGE;
  }

  const normalized = language.split("-")[0];
  return isSupportedLanguage(normalized) ? normalized : DEFAULT_LANGUAGE;
};

export const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();
  const currentLanguage = getNormalizedLanguage(i18n.resolvedLanguage);

  const handleChangeLanguage = (language: SupportedLanguage) => {
    if (language !== currentLanguage) {
      i18n.changeLanguage(language).catch((error) => {
        console.error("Failed to change language", error);
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{t("language.label")}</Text>
      <View style={styles.buttonsContainer}>
        {SUPPORTED_LANGUAGES.map(({ code }, index) => {
          const isActive = code === currentLanguage;

          return (
            <TouchableOpacity
              key={code}
              style={[
                styles.button,
                index > 0 && styles.buttonSpacing,
                isActive && styles.buttonActive,
              ]}
              onPress={() => handleChangeLanguage(code)}
              accessibilityRole="button"
              accessibilityState={{ selected: isActive }}
            >
              <Text style={[styles.buttonText, isActive && styles.buttonTextActive]}>
                {t(`language.names.${code}` as const)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 16,
    backgroundColor: "#fff",
  },
  buttonSpacing: {
    marginLeft: 8,
  },
  buttonActive: {
    borderColor: "#007AFF",
    backgroundColor: "#E3F2FD",
  },
  buttonText: {
    fontSize: 14,
    color: "#333",
  },
  buttonTextActive: {
    color: "#007AFF",
    fontWeight: "600",
  },
});


