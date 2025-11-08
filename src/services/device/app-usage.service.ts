/**
 * App Usage Service
 * Servicio para obtener estadísticas de uso de aplicaciones
 */

import { InstalledApp, AppUsage } from '../../domain/entities/Device';
import { getFirestore } from '../../core/config/firebase.config';
import DeviceInfo from 'react-native-device-info';

export class AppUsageService {
  private firestore = getFirestore();

  /**
   * Obtiene las aplicaciones instaladas en el dispositivo
   */
  async getInstalledApps(deviceId: string): Promise<InstalledApp[]> {
    try {
      // En Android, necesitarías usar react-native-usage-stats o similar
      // Por ahora, retornamos un array vacío que se llenará con datos reales
      
      const appsSnapshot = await this.firestore
        .collection('devices')
        .doc(deviceId)
        .collection('installedApps')
        .get();

      return appsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as InstalledApp[];
    } catch (error) {
      console.error('Error obteniendo apps instaladas:', error);
      return [];
    }
  }

  /**
   * Sincroniza las apps instaladas con Firestore
   */
  async syncInstalledApps(
    deviceId: string,
    apps: Omit<InstalledApp, 'id' | 'deviceId'>[]
  ): Promise<void> {
    try {
      const batch = this.firestore.batch();
      const appsRef = this.firestore
        .collection('devices')
        .doc(deviceId)
        .collection('installedApps');

      apps.forEach(app => {
        const appRef = appsRef.doc();
        batch.set(appRef, {
          ...app,
          deviceId,
          installedAt: new Date(),
        });
      });

      await batch.commit();
    } catch (error) {
      console.error('Error sincronizando apps:', error);
      throw error;
    }
  }

  /**
   * Obtiene estadísticas de uso de aplicaciones
   */
  async getAppUsageStats(
    deviceId: string,
    startDate: Date,
    endDate: Date
  ): Promise<AppUsage[]> {
    try {
      const usageSnapshot = await this.firestore
        .collection('devices')
        .doc(deviceId)
        .collection('appUsage')
        .where('date', '>=', startDate)
        .where('date', '<=', endDate)
        .get();

      return usageSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as AppUsage[];
    } catch (error) {
      console.error('Error obteniendo estadísticas:', error);
      return [];
    }
  }

  /**
   * Registra uso de una aplicación
   */
  async recordAppUsage(
    deviceId: string,
    appId: string,
    duration: number
  ): Promise<void> {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const usageRef = this.firestore
        .collection('devices')
        .doc(deviceId)
        .collection('appUsage')
        .doc(`${appId}_${today.toISOString().split('T')[0]}`);

      const usageDoc = await usageRef.get();

      if (usageDoc.exists) {
        const currentData = usageDoc.data() as AppUsage;
        await usageRef.update({
          duration: (currentData.duration || 0) + duration,
          sessions: (currentData.sessions || 0) + 1,
          lastUsedAt: new Date(),
        });
      } else {
        await usageRef.set({
          deviceId,
          appId,
          date: today,
          duration,
          sessions: 1,
          lastUsedAt: new Date(),
        });
      }
    } catch (error) {
      console.error('Error registrando uso:', error);
    }
  }

  /**
   * Obtiene información del dispositivo
   */
  async getDeviceInfo(): Promise<{
    deviceId: string;
    deviceName: string;
    platform: 'ios' | 'android';
    osVersion: string;
  }> {
    const deviceId = await DeviceInfo.getUniqueId();
    const deviceName = await DeviceInfo.getDeviceName();
    const systemName = await DeviceInfo.getSystemName();
    const systemVersion = await DeviceInfo.getSystemVersion();

    return {
      deviceId,
      deviceName,
      platform: systemName.toLowerCase() === 'ios' ? 'ios' : 'android',
      osVersion: systemVersion,
    };
  }
}

export const appUsageService = new AppUsageService();



