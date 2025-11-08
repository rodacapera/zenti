/**
 * Parental Control Entity
 * Entidades para control parental
 */

export interface ParentalControl {
  id: string;
  childId: string;
  parentId: string;
  schedule: UsageSchedule;
  appRestrictions: AppRestriction[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UsageSchedule {
  enabled: boolean;
  timeSlots: TimeSlot[];
  maxDailyHours: number;
}

export interface TimeSlot {
  dayOfWeek: number; // 0-6 (Domingo-Sábado)
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  enabled: boolean;
}

export interface AppRestriction {
  appId: string;
  isBlocked: boolean;
  isAllowed: boolean;
  category?: string;
  notes?: string;
}

export interface PanicAlert {
  id: string;
  childId: string;
  parentId: string;
  location?: {
    latitude: number;
    longitude: number;
  };
  message?: string;
  timestamp: Date;
  acknowledged: boolean;
  acknowledgedAt?: Date;
}


