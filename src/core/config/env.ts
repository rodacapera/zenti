/**
 * Environment Configuration
 * Variables de entorno para Firebase y configuración de la app
 */

export const ENV = {
  // Firebase Configuration
  // Nota: FIREBASE_MEASUREMENT_ID es opcional - solo necesario si usas Google Analytics
  // En apps móviles React Native, Firebase Analytics funciona sin este ID
  FIREBASE_API_KEY: process.env.FIREBASE_API_KEY || "",
  FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN || "",
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID || "",
  FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET || "",
  FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID || "",
  FIREBASE_APP_ID: process.env.FIREBASE_APP_ID || "",
  FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID || "", // Opcional - solo para Google Analytics

  // AI Service (OpenAI o similar)
  AI_API_KEY: process.env.AI_API_KEY || "",
  AI_API_URL: process.env.AI_API_URL || "https://api.openai.com/v1",

  // RevenueCat para suscripciones
  REVENUECAT_API_KEY: process.env.REVENUECAT_API_KEY || "",

  // YouTube API (opcional para canales)
  YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY || "",

  // Librivox API para audiolibros gratuitos
  LIBRIVOX_API_URL: "https://librivox.org/api/feed/audiobooks",
} as const;

/**
 * Valida variables de entorno opcionales
 * Nota: Firebase NO necesita variables de entorno en React Native Firebase
 * porque se inicializa automáticamente con google-services.json y GoogleService-Info.plist
 *
 * Esta función solo valida variables que realmente se usan en el código
 * (como AI_API_KEY cuando se usa el servicio de IA)
 */
export const validateEnv = (requiredKeys?: string[]): void => {
  // Si no se especifican keys, no validar nada
  // (Firebase no necesita variables de entorno)
  if (!requiredKeys || requiredKeys.length === 0) {
    return;
  }

  const missing = requiredKeys.filter((key) => {
    const value = ENV[key as keyof typeof ENV];
    return !value || value === "";
  });

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`
    );
  }
};
