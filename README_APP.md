# 📱 Zenti - Aplicación de Control Parental

Aplicación móvil de control parental con IA integrada para ayudar a los niños a comunicarse de manera segura y respetuosa.

## 🏗️ Arquitectura

La aplicación sigue los principios de **Clean Code** y el patrón **MVVM**:

```
src/
├── core/              # Configuración y utilidades centrales
│   ├── config/       # Configuración de Firebase, env vars
│   ├── types/        # Tipos TypeScript compartidos
│   └── utils/        # Utilidades
├── domain/           # Lógica de negocio (Clean Architecture)
│   ├── entities/     # Entidades del dominio
│   └── repositories/ # Interfaces de repositorios
├── data/             # Capa de datos
│   ├── models/       # Modelos de datos
│   └── datasources/  # Fuentes de datos (Firebase, APIs)
├── services/         # Servicios de negocio
│   ├── firebase/     # Servicios de Firebase
│   ├── device/       # Servicios de dispositivo
│   ├── ai/           # Servicios de IA
│   └── subscription/ # Servicios de suscripciones
└── presentation/     # Capa de presentación (MVVM)
    ├── screens/      # Pantallas de la app
    ├── components/   # Componentes reutilizables
    ├── viewmodels/   # ViewModels (lógica de presentación)
    └── navigation/   # Navegación
```

## 🚀 Inicio Rápido

### 1. Instalar Dependencias

```bash
yarn install

# Para iOS
cd ios && pod install && cd ..
```

### 2. Configurar Firebase

Sigue las instrucciones en [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)

### 3. Configurar Variables de Entorno

Copia `.env.example` a `.env` y completa los valores:

```bash
cp .env.example .env
```

### 4. Ejecutar la Aplicación

```bash
# Android
yarn android

# iOS
yarn ios
```

## 📋 Funcionalidades

### Para Padres 👨‍👩‍👧

- ✅ **Dashboard**: Estadísticas de uso del dispositivo del hijo
- ✅ **Control Parental**: 
  - Horarios de uso del celular
  - Apps permitidas/bloqueadas
  - Lista de apps instaladas
- ✅ **Canales de YouTube**: Configurar canales permitidos
- ✅ **Audiolibros**: Seleccionar audiolibros desde Librivox
- ✅ **Chat Directo**: Comunicación con el hijo
- ✅ **Botón de Pánico**: Recibir alertas del hijo
- ✅ **Estadísticas**: Uso de apps y conversaciones

### Para Hijos 👶

- ✅ **Chat con IA**: 
  - Filtro de palabras ofensivas
  - Sugerencias de IA para mejor comunicación
  - Soporte para texto, audio y video
- ✅ **YouTube**: Acceso a canales configurados por padres
- ✅ **Audiolibros**: Escuchar audiolibros aprobados
- ✅ **Botón de Pánico**: Enviar alertas a los padres
- ✅ **Registro Automático**: Uso de apps y estadísticas

## 🔐 Autenticación

La app usa Firebase Authentication con email/password. Los usuarios pueden registrarse como:
- **Padre/Madre**: Acceso completo a controles parentales
- **Hijo/Hija**: Acceso limitado según configuración del padre

## 💾 Base de Datos

Firestore se estructura así:

```
users/
  {userId}/
    - Datos del usuario
    - role: 'parent' | 'child'
    - settings: {...}

devices/
  {deviceId}/
    - Información del dispositivo
    installedApps/
      {appId}/
        - Apps instaladas
    appUsage/
      {usageId}/
        - Estadísticas de uso

chats/
  {chatId}/
    - Información del chat
    messages/
      {messageId}/
        - Mensajes

parentalControls/
  {controlId}/
    - Configuración de control parental

youtubeChannels/
  {channelId}/
    - Canales de YouTube permitidos

audiobooks/
  {bookId}/
    - Audiolibros configurados
```

## 🤖 IA y Filtro de Profanidad

La app incluye un servicio de IA que:
- Detecta palabras ofensivas en mensajes
- Sugiere alternativas respetuosas
- Proporciona feedback educativo

Puede usar:
- OpenAI API (si está configurada)
- Filtro básico local (fallback)

## 💳 Suscripciones

Las funcionalidades premium se gestionan con RevenueCat:
- Funcionalidades marcadas como `isPremium: true`
- Configurables desde panel administrativo
- Integración con App Store y Google Play

## 📚 Audiolibros

La app se integra con **Librivox** (gratuito) para audiolibros:
- API pública de Librivox
- Búsqueda y selección por padres
- Reproducción para hijos

## 🔔 Notificaciones Push

Firebase Cloud Messaging para:
- Alertas de pánico
- Notificaciones de chat
- Reportes diarios/semanales

## 🛠️ Desarrollo

### Estructura de Commits

```
feat: nueva funcionalidad
fix: corrección de bug
refactor: refactorización
docs: documentación
test: tests
```

### Testing

```bash
yarn test
```

### Linting

```bash
yarn lint
```

## 📝 Próximos Pasos

- [ ] Implementar pantallas completas de padres
- [ ] Implementar pantallas completas de hijos
- [ ] Integrar YouTube API
- [ ] Integrar Librivox API
- [ ] Configurar RevenueCat
- [ ] Implementar panel administrativo
- [ ] Tests unitarios y de integración
- [ ] Optimización de rendimiento

## 📄 Licencia

Propietario - Todos los derechos reservados

## 👥 Equipo

Desarrollado para Zenti



