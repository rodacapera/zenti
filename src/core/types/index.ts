/**
 * Type Definitions
 * Tipos compartidos en toda la aplicación
 */

export enum UserRole {
  PARENT = "parent",
  CHILD = "child",
}

export enum SubscriptionTier {
  FREE = "free",
  PRO = "pro",
  PREMIUM = "premium",
}

export enum FeatureFlag {
  // Features para padres
  PARENTAL_CONTROL = "parental_control",
  APP_USAGE_STATS = "app_usage_stats",
  CHAT_WITH_CHILD = "chat_with_child",
  YOUTUBE_CONTROL = "youtube_control",
  AUDIOBOOKS_CONTROL = "audiobooks_control",
  PANIC_BUTTON = "panic_button",
  ADVANCED_STATS = "advanced_stats",

  // Features para hijos
  AI_CHAT = "ai_chat",
  AI_PROFANITY_FILTER = "ai_profanity_filter",
  VIDEO_MESSAGES = "video_messages",
  AUDIO_MESSAGES = "audio_messages",
  YOUTUBE_ACCESS = "youtube_access",
  AUDIOBOOKS_ACCESS = "audiobooks_access",
}

export interface FeatureConfig {
  feature: FeatureFlag;
  isPremium: boolean;
  subscriptionTier: SubscriptionTier[];
}

export interface AppConfig {
  features: FeatureConfig[];
  version: string;
  maintenanceMode: boolean;
}


