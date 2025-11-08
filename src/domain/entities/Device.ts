/**
 * Device Entity
 * Entidad para información del dispositivo
 */

export interface Device {
  id: string;
  userId: string;
  deviceName: string;
  platform: 'ios' | 'android';
  osVersion: string;
  appVersion: string;
  lastSyncAt: Date;
}

export interface InstalledApp {
  id: string;
  deviceId: string;
  packageName: string;
  appName: string;
  icon?: string;
  isBlocked: boolean;
  isAllowed: boolean;
  category?: string;
  installedAt: Date;
}

export interface AppUsage {
  id: string;
  deviceId: string;
  appId: string;
  date: Date;
  duration: number; // en segundos
  sessions: number;
  lastUsedAt: Date;
}


