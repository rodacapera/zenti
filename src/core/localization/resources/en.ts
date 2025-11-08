export const enTranslations = {
  common: {
    appName: "Zenti",
  },
  auth: {
    roles: {
      parent: "Parent",
      child: "Child",
    },
    login: {
      title: "Zenti",
      subtitle: "Sign in to your account",
      emailPlaceholder: "Email",
      passwordPlaceholder: "Password",
      button: "Sign In",
      linkText: "Don't have an account? Sign up",
      alerts: {
        missingFields: {
          title: "Error",
          message: "Please fill in all the fields.",
        },
        generic: {
          title: "Error",
          message: "Couldn't sign in.",
        },
      },
    },
    register: {
      title: "Create Account",
      subtitle: "Sign up to Zenti",
      displayNamePlaceholder: "Full name",
      emailPlaceholder: "Email",
      passwordPlaceholder: "Password",
      confirmPasswordPlaceholder: "Confirm password",
      roleLabel: "Account type",
      button: "Sign Up",
      linkText: "Already have an account? Sign in",
      alerts: {
        missingFields: {
          title: "Error",
          message: "Please fill in all the fields.",
        },
        passwordMismatch: {
          title: "Error",
          message: "Passwords do not match.",
        },
        passwordTooShort: {
          title: "Error",
          message: "Password must be at least 6 characters long.",
        },
        generic: {
          title: "Error",
          message: "Couldn't create the account.",
        },
        success: {
          title: "Success",
          message: "Account created successfully.",
        },
      },
    },
  },
  navigation: {
    auth: {
      login: "Login",
      register: "Register",
    },
    parent: {
      home: "Home",
      control: "Control",
      chat: "Chat",
      stats: "Stats",
    },
    child: {
      chat: "Chat",
      youtube: "YouTube",
      audiobooks: "Audiobooks",
      profile: "Profile",
    },
  },
  language: {
    label: "Language",
    names: {
      en: "English",
      es: "Español",
    },
  },
} as const;

export type EnTranslations = typeof enTranslations;

