# 🔥 Configuración de Firebase para Zenti

Esta guía te ayudará a configurar Firebase correctamente para la aplicación Zenti.

## 📋 Requisitos Previos

1. Cuenta de Google
2. Proyecto creado en [Firebase Console](https://console.firebase.google.com/)
3. Node.js y npm/yarn instalados

## 🚀 Pasos de Configuración

### 1. Crear Proyecto en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Haz clic en "Agregar proyecto"
3. Ingresa el nombre del proyecto: `zenti` (o el que prefieras)
4. Sigue los pasos del asistente
5. **NO** habilites Google Analytics por ahora (opcional)

### 2. Configurar Authentication

1. En el panel de Firebase, ve a **Authentication**
2. Haz clic en "Comenzar"
3. Habilita **Email/Password** como método de autenticación:
   - Ve a la pestaña "Sign-in method"
   - Haz clic en "Email/Password"
   - Activa "Enable" y guarda

### 3. Configurar Firestore Database

1. Ve a **Firestore Database**
2. Haz clic en "Crear base de datos"
3. Selecciona **Modo de producción** (o modo de prueba para desarrollo)
4. Elige una ubicación (ej: `us-central`)
5. Haz clic en "Habilitar"

### 4. Configurar Cloud Messaging (Push Notifications)

1. Ve a **Cloud Messaging**
2. Si es la primera vez, sigue el asistente
3. Anota el **Server Key** (lo necesitarás más adelante)

### 5. Agregar Apps al Proyecto

#### Para Android:

1. En Firebase Console, haz clic en el ícono de Android
2. Ingresa el **Package name**: `com.teranov.zentiapp`
3. Descarga el archivo `google-services.json`
4. Colócalo en: `android/app/google-services.json` (ya debería estar)

#### Para iOS:

1. En Firebase Console, haz clic en el ícono de iOS
2. Ingresa el **Bundle ID**: `com.teranov.zentiapp`
3. Descarga el archivo `GoogleService-Info.plist`
4. Colócalo en: `ios/GoogleService-Info.plist` (ya debería estar)

### 6. Configurar Variables de Entorno

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

# AI Service (OpenAI o similar)
AI_API_KEY=sk-tu-api-key-aqui
AI_API_URL=https://api.openai.com/v1

# RevenueCat para suscripciones
REVENUECAT_API_KEY=tu-revenuecat-key

# YouTube API (opcional)
YOUTUBE_API_KEY=tu-youtube-api-key
```

**⚠️ IMPORTANTE**: 
- El archivo `.env` debe estar en `.gitignore`
- Nunca subas tus claves API a Git
- Para producción, usa variables de entorno del sistema o servicios como AWS Secrets Manager

### 7. Obtener las Credenciales de Firebase

Las credenciales están en los archivos de configuración:

#### Desde `google-services.json` (Android):
```json
{
  "project_info": {
    "project_id": "tu-proyecto-id",
    "project_number": "123456789",
    "firebase_url": "https://tu-proyecto.firebaseio.com",
    "storage_bucket": "tu-proyecto.appspot.com"
  },
  "client": [{
    "client_info": {
      "mobilesdk_app_id": "1:123456789:android:abcdef",
      "android_client_info": {
        "package_name": "com.teranov.zentiapp"
      }
    },
    "oauth_client": [...],
    "api_key": [{
      "current_key": "TU_API_KEY_AQUI"
    }],
    "services": {
      "appinvite_service": {
        "other_platform_oauth_client": [...]
      }
    }
  }]
}
```

#### Desde `GoogleService-Info.plist` (iOS):
```xml
<key>API_KEY</key>
<string>TU_API_KEY_AQUI</string>
<key>GCM_SENDER_ID</key>
<string>123456789</string>
<key>PROJECT_ID</key>
<string>tu-proyecto-id</string>
```

### 8. Instalar Dependencias

```bash
# Instalar dependencias de npm
yarn install

# Para iOS, instalar pods
cd ios && pod install && cd ..
```

### 9. Configurar Reglas de Firestore

Ve a **Firestore Database > Rules** y configura:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Usuarios: solo pueden leer/escribir sus propios datos
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Padres pueden leer datos de sus hijos
    match /users/{userId} {
      allow read: if request.auth != null && 
        (request.auth.uid == userId || 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'parent' &&
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.childrenIds.hasAny([userId]));
    }
    
    // Chats: solo participantes pueden leer/escribir
    match /chats/{chatId} {
      allow read, write: if request.auth != null && 
        (resource.data.parentId == request.auth.uid || 
         resource.data.childId == request.auth.uid);
    }
    
    // Mensajes: solo participantes del chat pueden leer/escribir
    match /chats/{chatId}/messages/{messageId} {
      allow read, write: if request.auth != null;
    }
    
    // Dispositivos: solo el dueño puede leer/escribir
    match /devices/{deviceId} {
      allow read, write: if request.auth != null;
    }
    
    // Control parental: solo padres pueden escribir, hijos pueden leer
    match /parentalControls/{controlId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'parent';
    }
  }
}
```

### 10. Configurar Índices de Firestore

Para consultas eficientes, crea estos índices en Firestore:

1. Ve a **Firestore Database > Indexes**
2. Crea los siguientes índices compuestos:

**Para mensajes de chat:**
- Collection: `chats/{chatId}/messages`
- Fields: `createdAt` (Ascending), `chatId` (Ascending)

**Para uso de apps:**
- Collection: `devices/{deviceId}/appUsage`
- Fields: `date` (Ascending), `deviceId` (Ascending)

### 11. Configurar Notificaciones Push

#### Para Android:

1. Ve a **Project Settings > Cloud Messaging**
2. Copia el **Server Key**
3. Configura FCM en `android/app/src/main/AndroidManifest.xml`:

```xml
<application>
  <!-- ... -->
  <service
    android:name="com.google.firebase.messaging.FirebaseMessagingService"
    android:exported="false">
    <intent-filter>
      <action android:name="com.google.firebase.MESSAGING_EVENT" />
    </intent-filter>
  </service>
</application>
```

#### Para iOS:

1. En Xcode, habilita **Push Notifications** en **Capabilities**
2. Sube tu certificado APNs a Firebase Console:
   - Ve a **Project Settings > Cloud Messaging**
   - Sube tu certificado `.p8` o `.p12`

### 12. Verificar Instalación

Crea un archivo de prueba `src/test-firebase.ts`:

```typescript
import { initializeFirebase, getAuth } from './core/config/firebase.config';

try {
  initializeFirebase();
  const auth = getAuth();
  console.log('✅ Firebase configurado correctamente');
  console.log('Auth instance:', auth);
} catch (error) {
  console.error('❌ Error configurando Firebase:', error);
}
```

## 🔒 Seguridad

1. **Nunca** subas archivos `.env` a Git
2. Usa diferentes proyectos de Firebase para desarrollo y producción
3. Revisa las reglas de Firestore regularmente
4. Implementa rate limiting para APIs públicas
5. Usa Firebase App Check para proteger tus APIs

## 📚 Recursos Adicionales

- [Documentación de React Native Firebase](https://rnfirebase.io/)
- [Firebase Console](https://console.firebase.google.com/)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)

## ✅ Checklist de Configuración

- [ ] Proyecto creado en Firebase
- [ ] Authentication habilitado (Email/Password)
- [ ] Firestore Database creado
- [ ] Cloud Messaging configurado
- [ ] `google-services.json` en `android/app/`
- [ ] `GoogleService-Info.plist` en `ios/`
- [ ] Variables de entorno configuradas
- [ ] Reglas de Firestore configuradas
- [ ] Índices de Firestore creados
- [ ] Notificaciones push configuradas
- [ ] Dependencias instaladas

## 🆘 Solución de Problemas

### Error: "Firebase no está inicializado"
- Verifica que los archivos de configuración estén en las rutas correctas
- Asegúrate de haber ejecutado `pod install` en iOS
- Revisa que las dependencias estén instaladas

### Error: "Permission denied" en Firestore
- Revisa las reglas de seguridad de Firestore
- Verifica que el usuario esté autenticado
- Asegúrate de que las reglas permitan la operación que intentas

### Notificaciones push no funcionan
- Verifica los permisos en el dispositivo
- Revisa la configuración de FCM/APNs
- Asegúrate de que el token FCM se esté guardando correctamente


