/**
 * Register Screen
 * Pantalla de registro
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
  ScrollView,
} from "react-native";
import { useAuthViewModel } from "../../viewmodels/AuthViewModel";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { UserRole } from "../../../core/types";
import { LanguageSwitcher } from "../../components/LanguageSwitcher";

export const RegisterScreen: React.FC = () => {
  const navigation = useNavigation();
  const { register, loading, error } = useAuthViewModel();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [role, setRole] = useState<UserRole>(UserRole.PARENT);
  const [confirmPassword, setConfirmPassword] = useState("");
  const { t } = useTranslation();

  const handleRegister = async () => {
    if (!email || !password || !displayName) {
      Alert.alert(
        t("auth.register.alerts.missingFields.title"),
        t("auth.register.alerts.missingFields.message")
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(
        t("auth.register.alerts.passwordMismatch.title"),
        t("auth.register.alerts.passwordMismatch.message")
      );
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        t("auth.register.alerts.passwordTooShort.title"),
        t("auth.register.alerts.passwordTooShort.message")
      );
      return;
    }

    try {
      await register(email, password, displayName, role);
      Alert.alert(
        t("auth.register.alerts.success.title"),
        t("auth.register.alerts.success.message")
      );
    } catch (error: any) {
      Alert.alert(
        t("auth.register.alerts.generic.title"),
        error?.message ?? t("auth.register.alerts.generic.message")
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <LanguageSwitcher />
      <Text style={styles.title}>{t("auth.register.title")}</Text>
      <Text style={styles.subtitle}>{t("auth.register.subtitle")}</Text>

      {error && <Text style={styles.error}>{error}</Text>}

      <TextInput
        style={styles.input}
        placeholder={t("auth.register.displayNamePlaceholder")}
        value={displayName}
        onChangeText={setDisplayName}
        editable={!loading}
      />

      <TextInput
        style={styles.input}
        placeholder={t("auth.register.emailPlaceholder")}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!loading}
      />

      <TextInput
        style={styles.input}
        placeholder={t("auth.register.passwordPlaceholder")}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={!loading}
      />

      <TextInput
        style={styles.input}
        placeholder={t("auth.register.confirmPasswordPlaceholder")}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        editable={!loading}
      />

      <View style={styles.roleContainer}>
        <Text style={styles.roleLabel}>{t("auth.register.roleLabel")}</Text>
        <View style={styles.roleButtons}>
          <TouchableOpacity
            style={[
              styles.roleButton,
              role === UserRole.PARENT && styles.roleButtonActive,
            ]}
            onPress={() => setRole(UserRole.PARENT)}
            disabled={loading}
          >
            <Text
              style={[
                styles.roleButtonText,
                role === UserRole.PARENT && styles.roleButtonTextActive,
              ]}
            >
              {t("auth.roles.parent")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.roleButton,
              styles.roleButtonSpacing,
              role === UserRole.CHILD && styles.roleButtonActive,
            ]}
            onPress={() => setRole(UserRole.CHILD)}
            disabled={loading}
          >
            <Text
              style={[
                styles.roleButtonText,
                role === UserRole.CHILD && styles.roleButtonTextActive,
              ]}
            >
              {t("auth.roles.child")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>{t("auth.register.button")}</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.linkButton}
      >
        <Text style={styles.linkText}>{t("auth.register.linkText")}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 40,
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
  roleContainer: {
    marginBottom: 20,
  },
  roleLabel: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "600",
  },
  roleButtons: {
    flexDirection: "row",
  },
  roleButton: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
  },
  roleButtonSpacing: {
    marginLeft: 10,
  },
  roleButtonActive: {
    borderColor: "#007AFF",
    backgroundColor: "#E3F2FD",
  },
  roleButtonText: {
    fontSize: 16,
    color: "#666",
  },
  roleButtonTextActive: {
    color: "#007AFF",
    fontWeight: "600",
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
    marginBottom: 40,
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


