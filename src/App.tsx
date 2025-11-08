/**
 * App Entry Point
 * Punto de entrada principal de la aplicación
 */

import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import { AppNavigator } from "./presentation/navigation/AppNavigator";
import {
  initializeFirebase,
  setupPushNotifications,
} from "./core/config/firebase.config";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "./core/localization/i18n";

const App: React.FC = () => {
  useEffect(() => {
    // Inicializar Firebase
    try {
      initializeFirebase();
      console.log("✅ Firebase inicializado");
    } catch (error) {
      console.error("❌ Error inicializando Firebase:", error);
    }

    // Configurar notificaciones push
    setupPushNotifications()
      .then((token) => {
        if (token) {
          console.log("✅ Token de notificaciones:", token);
          // Aquí deberías guardar el token en Firestore
        }
      })
      .catch((error) => {
        console.error("❌ Error configurando notificaciones:", error);
      });
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <AppNavigator />
    </GestureHandlerRootView>
  );
};

export default App;
