/**
 * User Entity
 * Entidad de usuario base
 */

import { UserRole, SubscriptionTier } from '../../core/types';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  displayName: string;
  photoURL?: string;
  subscriptionTier: SubscriptionTier;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

export interface Parent extends User {
  role: UserRole.PARENT;
  childrenIds: string[];
  settings: ParentSettings;
}

export interface Child extends User {
  role: UserRole.CHILD;
  parentId: string;
  deviceId: string;
  settings: ChildSettings;
}

export interface ParentSettings {
  notificationsEnabled: boolean;
  panicAlertsEnabled: boolean;
  dailyReportsEnabled: boolean;
  weeklyReportsEnabled: boolean;
}

export interface ChildSettings {
  panicButtonEnabled: boolean;
  chatEnabled: boolean;
  youtubeEnabled: boolean;
  audiobooksEnabled: boolean;
}


