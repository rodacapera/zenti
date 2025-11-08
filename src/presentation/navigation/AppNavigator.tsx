/**
 * App Navigator
 * Navegación principal de la aplicación
 */

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useAuthViewModel } from "../viewmodels/AuthViewModel";
import { UserRole } from "../../core/types";
import { useTranslation } from "react-i18next";

// Auth Screens
import { LoginScreen } from "../screens/auth/LoginScreen";
import { RegisterScreen } from "../screens/auth/RegisterScreen";

// Parent Screens (Placeholders - se crearán después)
const ParentHomeScreen = () => null;
const ParentControlScreen = () => null;
const ParentChatScreen = () => null;
const ParentStatsScreen = () => null;

// Child Screens (Placeholders - se crearán después)
const ChildChatScreen = () => null;
const ChildYouTubeScreen = () => null;
const ChildAudiobooksScreen = () => null;
const ChildProfileScreen = () => null;

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ParentTabs = () => {
  const { t } = useTranslation();

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="ParentHome"
        component={ParentHomeScreen}
        options={{
          title: t("navigation.parent.home"),
          tabBarLabel: t("navigation.parent.home"),
        }}
      />
      <Tab.Screen
        name="ParentControl"
        component={ParentControlScreen}
        options={{
          title: t("navigation.parent.control"),
          tabBarLabel: t("navigation.parent.control"),
        }}
      />
      <Tab.Screen
        name="ParentChat"
        component={ParentChatScreen}
        options={{
          title: t("navigation.parent.chat"),
          tabBarLabel: t("navigation.parent.chat"),
        }}
      />
      <Tab.Screen
        name="ParentStats"
        component={ParentStatsScreen}
        options={{
          title: t("navigation.parent.stats"),
          tabBarLabel: t("navigation.parent.stats"),
        }}
      />
    </Tab.Navigator>
  );
};

const ChildTabs = () => {
  const { t } = useTranslation();

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="ChildChat"
        component={ChildChatScreen}
        options={{
          title: t("navigation.child.chat"),
          tabBarLabel: t("navigation.child.chat"),
        }}
      />
      <Tab.Screen
        name="ChildYouTube"
        component={ChildYouTubeScreen}
        options={{
          title: t("navigation.child.youtube"),
          tabBarLabel: t("navigation.child.youtube"),
        }}
      />
      <Tab.Screen
        name="ChildAudiobooks"
        component={ChildAudiobooksScreen}
        options={{
          title: t("navigation.child.audiobooks"),
          tabBarLabel: t("navigation.child.audiobooks"),
        }}
      />
      <Tab.Screen
        name="ChildProfile"
        component={ChildProfileScreen}
        options={{
          title: t("navigation.child.profile"),
          tabBarLabel: t("navigation.child.profile"),
        }}
      />
    </Tab.Navigator>
  );
};

export const AppNavigator: React.FC = () => {
  const { user, loading } = useAuthViewModel();
  const { t } = useTranslation();

  if (loading) {
    return null; // O un componente de loading
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          // Auth Stack
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ title: t("navigation.auth.login") }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ title: t("navigation.auth.register") }}
            />
          </>
        ) : user.role === UserRole.PARENT ? (
          // Parent Stack
          <Stack.Screen name="ParentTabs" component={ParentTabs} />
        ) : (
          // Child Stack
          <Stack.Screen name="ChildTabs" component={ChildTabs} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

