/**
 * Login Screen
 * Pantalla de inicio de sesión
 */

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useAuthViewModel } from "../../viewmodels/AuthViewModel";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "../../components/LanguageSwitcher";

export const LoginScreen: React.FC = () => {
  const navigation = useNavigation();
  const { login, loading, error } = useAuthViewModel();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { t } = useTranslation();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert(
        t("auth.login.alerts.missingFields.title"),
        t("auth.login.alerts.missingFields.message")
      );
      return;
    }

    try {
      await login(email, password);
      // La navegación se manejará automáticamente por el estado de auth
    } catch (error: any) {
      Alert.alert(
        t("auth.login.alerts.generic.title"),
        error?.message ?? t("auth.login.alerts.generic.message")
      );
    }
  };

  return (
    <View style={styles.container}>
      <LanguageSwitcher />
      <Text style={styles.title}>{t("auth.login.title")}</Text>
      <Text style={styles.subtitle}>{t("auth.login.subtitle")}</Text>

      {error && <Text style={styles.error}>{error}</Text>}

      <TextInput
        style={styles.input}
        placeholder={t("auth.login.emailPlaceholder")}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!loading}
      />

      <TextInput
        style={styles.input}
        placeholder={t("auth.login.passwordPlaceholder")}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={!loading}
      />

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>{t("auth.login.button")}</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Register" as never)}
        style={styles.linkButton}
      >
        <Text style={styles.linkText}>{t("auth.login.linkText")}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    color: "#666",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    marginTop: 10,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  linkButton: {
    marginTop: 20,
    alignItems: "center",
  },
  linkText: {
    color: "#007AFF",
    fontSize: 14,
  },
  error: {
    color: "#FF3B30",
    textAlign: "center",
    marginBottom: 15,
  },
});
