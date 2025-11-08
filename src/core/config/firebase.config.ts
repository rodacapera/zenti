/**
 * Firebase Configuration
 * Configuración e inicialización de Firebase
 */

import { initializeApp, getApps } from "@react-native-firebase/app";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import messaging from "@react-native-firebase/messaging";

type FirebaseApp = ReturnType<typeof getApps>[0];

let firebaseApp: FirebaseApp | null = null;

/**
 * Inicializa Firebase si no está ya inicializado
 */
export const initializeFirebase = (): FirebaseApp => {
  if (firebaseApp) {
    return firebaseApp;
  }

  // Nota: React Native Firebase se inicializa automáticamente con google-services.json (Android)
  // y GoogleService-Info.plist (iOS). No necesitamos variables de entorno para Firebase.
  // Las variables de entorno solo son necesarias para otros servicios (AI, RevenueCat, etc.)

  // Firebase se inicializa automáticamente con los archivos de configuración nativos
  const apps = getApps();

  if (apps.length === 0) {
    // En React Native Firebase, la app se inicializa automáticamente con los archivos nativos
    // Si getApps() retorna vacío, puede ser que:
    // 1. Los archivos de configuración no estén en el lugar correcto
    // 2. El plugin de Google Services no esté aplicado
    // 3. La app aún no se haya inicializado (puede tomar un momento)

    // Intentar obtener la app por defecto (puede que necesite un momento para inicializarse)
    // En React Native Firebase, la app se inicializa automáticamente, así que solo esperamos
    console.warn(
      "Firebase apps array está vacío. Verificando configuración..."
    );

    // Dar un mensaje de error más útil
    throw new Error(
      "Firebase no está inicializado. Verifica que:\n" +
        "1. google-services.json esté en android/app/\n" +
        "2. GoogleService-Info.plist esté en ios/ y agregado al proyecto en Xcode\n" +
        "3. El plugin 'com.google.gms.google-services' esté aplicado al final de android/app/build.gradle\n" +
        "4. El classpath 'com.google.gms:google-services:4.4.0' esté en android/build.gradle\n" +
        "5. Has ejecutado 'cd android && ./gradlew clean' y luego 'yarn android'"
    );
  }

  firebaseApp = apps[0];
  return firebaseApp;
};

/**
 * Obtiene la instancia de Firebase Auth
 */
export const getAuth = () => {
  try {
    if (!firebaseApp) {
      initializeFirebase();
    }
    return auth();
  } catch (error) {
    console.error("Error obteniendo instancia de Auth:", error);
    // Intentar inicializar Firebase nuevamente
    initializeFirebase();
    return auth();
  }
};

/**
 * Obtiene la instancia de Firestore
 */
export const getFirestore = () => {
  try {
    if (!firebaseApp) {
      initializeFirebase();
    }
    return firestore();
  } catch (error) {
    console.error("Error obteniendo instancia de Firestore:", error);
    // Intentar inicializar Firebase nuevamente
    initializeFirebase();
    return firestore();
  }
};

/**
 * Obtiene la instancia de Firebase Messaging
 */
export const getMessaging = () => {
  if (!firebaseApp) {
    initializeFirebase();
  }
  return messaging();
};

/**
 * Configura notificaciones push
 */
export const setupPushNotifications = async (): Promise<string | null> => {
  try {
    const messagingInstance = getMessaging();

    // Solicitar permiso para notificaciones
    const authStatus = await messagingInstance.requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (!enabled) {
      console.warn("Permisos de notificación no concedidos");
      return null;
    }

    // Obtener el token FCM
    const token = await messagingInstance.getToken();
    return token;
  } catch (error) {
    console.error("Error configurando notificaciones push:", error);
    return null;
  }
};

export default {
  initializeFirebase,
  getAuth,
  getFirestore,
  getMessaging,
  setupPushNotifications,
};
