export const esTranslations = {
  common: {
    appName: "Zenti",
  },
  auth: {
    roles: {
      parent: "Padre/Madre",
      child: "Hijo/Hija",
    },
    login: {
      title: "Zenti",
      subtitle: "Inicia sesión en tu cuenta",
      emailPlaceholder: "Correo electrónico",
      passwordPlaceholder: "Contraseña",
      button: "Iniciar sesión",
      linkText: "¿No tienes cuenta? Regístrate",
      alerts: {
        missingFields: {
          title: "Error",
          message: "Por favor completa todos los campos.",
        },
        generic: {
          title: "Error",
          message: "No se pudo iniciar sesión.",
        },
      },
    },
    register: {
      title: "Crear cuenta",
      subtitle: "Regístrate en Zenti",
      displayNamePlaceholder: "Nombre completo",
      emailPlaceholder: "Correo electrónico",
      passwordPlaceholder: "Contraseña",
      confirmPasswordPlaceholder: "Confirmar contraseña",
      roleLabel: "Tipo de cuenta",
      button: "Registrarse",
      linkText: "¿Ya tienes cuenta? Inicia sesión",
      alerts: {
        missingFields: {
          title: "Error",
          message: "Por favor completa todos los campos.",
        },
        passwordMismatch: {
          title: "Error",
          message: "Las contraseñas no coinciden.",
        },
        passwordTooShort: {
          title: "Error",
          message: "La contraseña debe tener al menos 6 caracteres.",
        },
        generic: {
          title: "Error",
          message: "No se pudo crear la cuenta.",
        },
        success: {
          title: "Éxito",
          message: "Cuenta creada correctamente.",
        },
      },
    },
  },
  navigation: {
    auth: {
      login: "Iniciar sesión",
      register: "Registrarse",
    },
    parent: {
      home: "Inicio",
      control: "Control",
      chat: "Chat",
      stats: "Estadísticas",
    },
    child: {
      chat: "Chat",
      youtube: "YouTube",
      audiobooks: "Audiolibros",
      profile: "Perfil",
    },
  },
  language: {
    label: "Idioma",
    names: {
      en: "English",
      es: "Español",
    },
  },
} as const;

export type EsTranslations = typeof esTranslations;

