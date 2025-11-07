# 🔧 Guía de Configuración de Despliegues Automáticos

Esta guía te ayudará a configurar todos los secretos necesarios para que funcionen tus despliegues automáticos en GitHub Actions.

## 📋 Requisitos Previos

1. Repositorio en GitHub configurado
2. Acceso a Google Play Console (para Android)
3. Acceso a App Store Connect (para iOS)
4. Certificados y perfiles de aprovisionamiento (para iOS)

---

## 🤖 Configuración para Android

### Secretos Requeridos en GitHub

Ve a **Settings → Secrets and variables → Actions** en tu repositorio de GitHub y agrega los siguientes secretos:

#### 1. `RELEASE_KEYSTORE_BASE64`
- **Descripción**: Archivo keystore codificado en Base64 para firmar la aplicación
- **Cómo obtenerlo**:
  ```bash
  # Si ya tienes tu keystore:
  base64 -i android/app/release.keystore | pbcopy
  
  # O desde la terminal:
  base64 android/app/release.keystore
  ```
- **Nota**: Si no tienes un keystore, créalo con:
  ```bash
  cd android/app
  keytool -genkeypair -v -storetype PKCS12 -keystore release.keystore -alias zenti-key -keyalg RSA -keysize 2048 -validity 10000
  ```

#### 2. `RELEASE_KEYSTORE_PASSWORD`
- **Descripción**: Contraseña del keystore
- **Valor**: La contraseña que configuraste al crear el keystore

#### 3. `RELEASE_KEY_ALIAS`
- **Descripción**: Alias de la clave en el keystore
- **Valor**: Generalmente `zenti-key` o el alias que usaste al crear el keystore

#### 4. `RELEASE_KEY_PASSWORD`
- **Descripción**: Contraseña de la clave (puede ser la misma que la del keystore)
- **Valor**: La contraseña de la clave

#### 5. `SERVICE_ACCOUNT_JSON_BASE64`
- **Descripción**: Archivo JSON de la cuenta de servicio de Google Play Console codificado en Base64
- **Cómo obtenerlo**:
  1. Ve a [Google Play Console](https://play.google.com/console)
  2. Ve a **Configuración → Acceso API**
  3. Crea una cuenta de servicio o usa una existente
  4. Descarga el archivo JSON de la cuenta de servicio
  5. Codifícalo en Base64:
     ```bash
     base64 -i service-account.json | pbcopy
     # O:
     base64 service-account.json
     ```
  6. Asegúrate de que la cuenta de servicio tenga permisos de **Administrador de lanzamientos**

---

## 🍏 Configuración para iOS

### Secretos Requeridos en GitHub

#### 1. `IOS_CERTIFICATE_BASE64`
- **Descripción**: Certificado P12 (.p12) codificado en Base64
- **Cómo obtenerlo**:
  1. Exporta tu certificado de distribución desde Keychain Access en macOS
  2. Guarda el archivo como `.p12`
  3. Codifícalo en Base64:
     ```bash
     base64 -i certificado.p12 | pbcopy
     # O:
     base64 certificado.p12
     ```

#### 2. `IOS_PROFILE_BASE64`
- **Descripción**: Perfil de aprovisionamiento (.mobileprovision) codificado en Base64
- **Cómo obtenerlo**:
  1. Ve a [Apple Developer Portal](https://developer.apple.com/account)
  2. Ve a **Certificates, Identifiers & Profiles**
  3. Descarga el perfil de aprovisionamiento de distribución
  4. Codifícalo en Base64:
     ```bash
     base64 -i profile.mobileprovision | pbcopy
     # O:
     base64 profile.mobileprovision
     ```

#### 3. `IOS_CERT_PASSWORD`
- **Descripción**: Contraseña del certificado P12
- **Valor**: La contraseña que configuraste al exportar el certificado

#### 4. `APPLE_DEVELOPMENT_TEAM_ID`
- **Descripción**: ID del equipo de desarrollo de Apple
- **Cómo obtenerlo**:
  1. Ve a [Apple Developer Portal](https://developer.apple.com/account)
  2. El Team ID aparece en la parte superior derecha
  3. También puedes encontrarlo en Xcode en **Preferences → Accounts**

#### 5. `APP_STORE_CONNECT_USERNAME`
- **Descripción**: Tu Apple ID (email) con acceso a App Store Connect
- **Valor**: Tu email de Apple ID

#### 6. `FASTLANE_APPLE_APPLICATION_SPECIFIC_PASSWORD`
- **Descripción**: Contraseña específica de aplicación para App Store Connect
- **Cómo obtenerla**:
  1. Ve a [appleid.apple.com](https://appleid.apple.com)
  2. Inicia sesión con tu Apple ID
  3. Ve a **Seguridad → Contraseñas de aplicaciones**
  4. Crea una nueva contraseña para "App Store Connect API"
  5. Copia la contraseña generada (solo se muestra una vez)

---

## 🚀 Cómo Funcionan los Workflows

### Android - Internal Testing
- **Trigger**: Push a la rama `develop` cuando hay cambios en:
  - `android/**`
  - `src/**`
  - `package.json` o `yarn.lock`
- **Acción**: Compila y sube a Google Play Console en el track **Internal**

### Android - Production
- **Trigger**: Push a la rama `main` o ejecución manual
- **Acción**: Compila y sube a Google Play Console en el track **Production**

### iOS - TestFlight
- **Trigger**: Push a la rama `develop` cuando hay cambios en:
  - `ios/**`
  - `src/**`
  - `Podfile` o `Podfile.lock`
- **Acción**: Compila y sube a TestFlight

### iOS - Production
- **Trigger**: Push a la rama `main` o ejecución manual
- **Acción**: Compila y sube a TestFlight

---

## ✅ Verificación

### Verificar que los Secretos Están Configurados

1. Ve a tu repositorio en GitHub
2. Ve a **Settings → Secrets and variables → Actions**
3. Verifica que todos los secretos listados arriba estén presentes

### Probar los Workflows

1. **Ejecución Manual**:
   - Ve a **Actions** en tu repositorio
   - Selecciona el workflow que quieres probar
   - Haz clic en **Run workflow**
   - Selecciona la rama y haz clic en **Run workflow**

2. **Ejecución Automática**:
   - Haz un push a la rama correspondiente (`develop` o `main`)
   - El workflow se ejecutará automáticamente si hay cambios en los paths configurados

---

## 🐛 Solución de Problemas

### Error: "Secret not found"
- **Solución**: Verifica que todos los secretos estén configurados en GitHub Settings → Secrets

### Error: "Invalid JSON"
- **Solución**: Asegúrate de que el JSON esté correctamente codificado en Base64 sin saltos de línea

### Error: "Keystore not found" (Android)
- **Solución**: Verifica que `RELEASE_KEYSTORE_BASE64` esté correctamente codificado

### Error: "Certificate invalid" (iOS)
- **Solución**: 
  - Verifica que el certificado P12 no haya expirado
  - Asegúrate de que el perfil de aprovisionamiento coincida con el certificado
  - Verifica que el Team ID sea correcto

### Error: "Upload failed" (Google Play)
- **Solución**:
  - Verifica que la cuenta de servicio tenga permisos de administrador
  - Asegúrate de que el `packageName` en el workflow coincida con el de Google Play Console

### Error: "Upload failed" (TestFlight)
- **Solución**:
  - Verifica que la contraseña específica de aplicación sea válida
  - Asegúrate de que tu Apple ID tenga acceso a App Store Connect
  - Verifica que el certificado y perfil sean válidos y no hayan expirado

---

## 📝 Notas Importantes

1. **Seguridad**: Nunca commits los archivos de keystore, certificados o perfiles directamente al repositorio. Siempre úsalos como secretos.

2. **Versionado**: Los workflows incrementan automáticamente el `versionCode` (Android) y `build number` (iOS) usando `github.run_number`.

3. **Filtros de Paths**: Los workflows con filtros de paths solo se ejecutan cuando hay cambios en los archivos especificados. Si quieres forzar una ejecución, usa `workflow_dispatch`.

4. **Tiempo de Ejecución**: Los workflows tienen un timeout configurado. Si tu build tarda más, aumenta el `timeout-minutes` en el workflow.

---

## 🔗 Enlaces Útiles

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Google Play Console API](https://developers.google.com/android-publisher)
- [App Store Connect API](https://developer.apple.com/app-store-connect/api/)
- [Fastlane Documentation](https://docs.fastlane.tools/)

---

## 📞 Soporte

Si tienes problemas después de seguir esta guía:
1. Revisa los logs del workflow en la pestaña **Actions** de GitHub
2. Verifica que todos los secretos estén correctamente configurados
3. Asegúrate de que los certificados y perfiles no hayan expirado

