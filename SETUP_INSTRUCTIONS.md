# 🚀 Instrucciones de Configuración - Zenti

## 📋 Resumen de lo Creado

He creado la estructura base de tu aplicación con:

✅ **Estructura Clean Code + MVVM** completa
✅ **Configuración de Firebase** (Auth, Firestore, Push Notifications)
✅ **Sistema de autenticación** (Login/Registro)
✅ **Modelos de datos** (User, Parent, Child, Chat, Device, etc.)
✅ **Servicios base** (Auth, AI Profanity, App Usage)
✅ **Navegación** con React Navigation
✅ **Pantallas de Auth** (Login/Registro)
✅ **Documentación completa** de Firebase

## 🔧 Pasos para Comenzar

### 1. Instalar Dependencias

```bash
# Instalar dependencias de npm
yarn install

# Para iOS, instalar pods
cd ios && pod install && cd ..
```

### 2. Configurar Firebase

**Sigue TODAS las instrucciones en `FIREBASE_SETUP.md`**

Pasos críticos:

1. Crear proyecto en Firebase Console
2. Habilitar Authentication (Email/Password)
3. Crear Firestore Database
4. Configurar Cloud Messaging
5. Descargar `google-services.json` y `GoogleService-Info.plist`
6. Configurar reglas de Firestore

### 3. Crear Archivo .env

Crea un archivo `.env` en la raíz del proyecto:

```env
# Firebase Configuration
FIREBASE_API_KEY=tu_api_key_aqui
FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
FIREBASE_PROJECT_ID=tu-proyecto-id
FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
FIREBASE_MESSAGING_SENDER_ID=123456789
FIREBASE_APP_ID=1:123456789:android:abcdef
FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

# AI Service (Opcional - para filtro avanzado de profanidad)
AI_API_KEY=sk-tu-openai-key
AI_API_URL=https://api.openai.com/v1

# RevenueCat (Para suscripciones)
REVENUECAT_API_KEY=tu-revenuecat-key

# YouTube API (Opcional)
YOUTUBE_API_KEY=tu-youtube-key
```

**⚠️ IMPORTANTE**: Agrega `.env` a `.gitignore`

### 4. Configurar Android

Asegúrate de que `google-services.json` esté en:

```
android/app/google-services.json
```

Y que el plugin esté en `android/build.gradle`:

```gradle
dependencies {
    classpath 'com.google.gms:google-services:4.4.0'
}
```

Y en `android/app/build.gradle`:

```gradle
apply plugin: 'com.google.gms.google-services'
```

### 5. Configurar iOS

Asegúrate de que `GoogleService-Info.plist` esté en:

```
ios/GoogleService-Info.plist
```

Y que esté agregado al proyecto en Xcode.

### 6. Instalar Dependencias Nativas

Algunas dependencias requieren configuración adicional:

#### react-native-vector-icons

**Android**: Ya está configurado si usas el template estándar
**iOS**: Agregar a `ios/Podfile`:

```ruby
pod 'RNVectorIcons', :path => '../node_modules/react-native-vector-icons'
```

#### react-native-usage-stats (Android)

Requiere permisos especiales. Ver documentación del paquete.

#### @react-native-documents/picker

**Nota importante**: Este proyecto usa `@react-native-documents/picker` (versión 11.0.0), que es el reemplazo oficial del deprecado `react-native-document-picker`. Este nuevo paquete está completamente reescrito y es compatible con React Native 0.80+.

**Ejemplo de uso**:

```typescript
import { pick, keepLocalCopy } from "@react-native-documents/picker";

// Seleccionar un archivo
const [file] = await pick({
  type: ["application/pdf", "image/*"],
  allowMultiSelection: false,
});

// Si necesitas una copia local
const [localCopy] = await keepLocalCopy({
  files: [{ uri: file.uri, fileName: file.name ?? "documento" }],
  destination: "documentDirectory",
});
```

**Documentación completa**: https://react-native-documents.github.io/docs/sponsor-only/intro

### 7. Ejecutar la App

```bash
# Android
yarn android

# iOS
yarn ios
```

## 📁 Estructura de Carpetas Creada

```
src/
├── core/
│   ├── config/
│   │   ├── env.ts              # Variables de entorno
│   │   └── firebase.config.ts # Configuración Firebase
│   └── types/
│       └── index.ts           # Tipos compartidos
├── domain/
│   └── entities/              # Entidades del dominio
│       ├── User.ts
│       ├── Device.ts
│       ├── Chat.ts
│       ├── ParentalControl.ts
│       └── Content.ts
├── services/
│   ├── firebase/
│   │   └── auth.service.ts    # Servicio de autenticación
│   ├── ai/
│   │   └── profanity.service.ts # Servicio de filtro IA
│   └── device/
│       └── app-usage.service.ts  # Servicio de uso de apps
└── presentation/
    ├── screens/
    │   └── auth/
    │       ├── LoginScreen.tsx
    │       └── RegisterScreen.tsx
    ├── viewmodels/
    │   └── AuthViewModel.ts
    └── navigation/
        └── AppNavigator.tsx
```

## 🎯 Próximos Pasos de Desarrollo

### Fase 1: Completar Autenticación ✅

- [x] Login/Registro básico
- [ ] Validación de email
- [ ] Recuperación de contraseña
- [ ] Verificación de email

### Fase 2: Pantallas de Padres

- [ ] Home/Dashboard con estadísticas
- [ ] Control Parental (horarios, apps)
- [ ] Chat con hijo
- [ ] Configuración de YouTube
- [ ] Configuración de Audiolibros
- [ ] Panel de alertas de pánico

### Fase 3: Pantallas de Hijos

- [ ] Chat con IA integrado
- [ ] Lista de YouTube
- [ ] Reproductor de Audiolibros
- [ ] Botón de pánico
- [ ] Perfil

### Fase 4: Funcionalidades Avanzadas

- [ ] Integración completa con YouTube API
- [ ] Integración con Librivox API
- [ ] Sistema de suscripciones (RevenueCat)
- [ ] Panel administrativo
- [ ] Notificaciones push completas
- [ ] Tracking de apps en tiempo real

### Fase 5: Optimización

- [ ] Tests unitarios
- [ ] Tests de integración
- [ ] Optimización de rendimiento
- [ ] Mejoras de UI/UX

## 🔍 Verificación

Para verificar que todo está configurado:

1. **Firebase**: Deberías poder iniciar sesión/registrarte
2. **Firestore**: Los usuarios deberían crearse en la colección `users`
3. **Navegación**: Deberías ver Login → Register → Home (según rol)

## 🐛 Solución de Problemas

### Error: "Firebase no está inicializado"

- Verifica que los archivos de configuración estén en las rutas correctas
- Revisa `FIREBASE_SETUP.md`

### Error: "Module not found"

- Ejecuta `yarn install` nuevamente
- Para iOS: `cd ios && pod install && cd ..`

### Error: "Permission denied" en Firestore

- Revisa las reglas de Firestore en Firebase Console
- Verifica que el usuario esté autenticado

## 📚 Documentación Adicional

- [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) - Configuración detallada de Firebase
- [README_APP.md](./README_APP.md) - Documentación general de la app

## 💡 Recomendaciones

1. **Plataforma de Audiolibros**: Librivox es gratuita y tiene API pública
2. **IA para Profanidad**: Puedes usar OpenAI o un servicio más económico como Cohere
3. **Panel Administrativo**: Considera usar Firebase Admin SDK o crear un dashboard web
4. **Tracking de Apps**: En Android usa `UsageStatsManager`, en iOS es más limitado

## ✅ Checklist Final

- [ ] Firebase configurado y funcionando
- [ ] Archivo `.env` creado con todas las variables
- [ ] `google-services.json` y `GoogleService-Info.plist` en su lugar
- [ ] Dependencias instaladas (`yarn install` y `pod install`)
- [ ] App compila sin errores
- [ ] Puedes registrarte e iniciar sesión
- [ ] Los usuarios se crean en Firestore

¡Listo para comenzar a desarrollar! 🚀
