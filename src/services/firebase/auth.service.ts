/**
 * Authentication Service
 * Servicio para manejar autenticación con Firebase
 */

import { getAuth } from "../../core/config/firebase.config";
import { User, Parent, Child } from "../../domain/entities/User";
import { getFirestore } from "../../core/config/firebase.config";
import { UserRole, SubscriptionTier } from "../../core/types";

export class AuthService {
  private get auth() {
    return getAuth();
  }

  private get firestore() {
    return getFirestore();
  }

  /**
   * Registra un nuevo usuario
   */
  async register(
    email: string,
    password: string,
    displayName: string,
    role: UserRole
  ): Promise<User> {
    try {
      // Crear usuario en Firebase Auth
      const userCredential = await this.auth.createUserWithEmailAndPassword(
        email,
        password
      );

      const firebaseUser = userCredential.user;
      if (!firebaseUser) {
        throw new Error("Error al crear usuario");
      }

      // Actualizar perfil
      await firebaseUser.updateProfile({ displayName });

      // Crear documento en Firestore
      const userData: Partial<User> = {
        id: firebaseUser.uid,
        email: firebaseUser.email || email,
        displayName,
        role,
        subscriptionTier: SubscriptionTier.FREE,
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
      };

      if (role === UserRole.PARENT) {
        (userData as Partial<Parent>).childrenIds = [];
        (userData as Partial<Parent>).settings = {
          notificationsEnabled: true,
          panicAlertsEnabled: true,
          dailyReportsEnabled: true,
          weeklyReportsEnabled: true,
        };
      } else if (role === UserRole.CHILD) {
        (userData as Partial<Child>).settings = {
          panicButtonEnabled: true,
          chatEnabled: true,
          youtubeEnabled: true,
          audiobooksEnabled: true,
        };
      }

      await this.firestore
        .collection("users")
        .doc(firebaseUser.uid)
        .set(userData);

      return userData as User;
    } catch (error: any) {
      throw new Error(`Error en registro: ${error.message}`);
    }
  }

  /**
   * Inicia sesión
   */
  async login(email: string, password: string): Promise<User> {
    try {
      const userCredential = await this.auth.signInWithEmailAndPassword(
        email,
        password
      );

      const firebaseUser = userCredential.user;
      if (!firebaseUser) {
        throw new Error("Error al iniciar sesión");
      }

      // Obtener datos del usuario desde Firestore
      const userDoc = await this.firestore
        .collection("users")
        .doc(firebaseUser.uid)
        .get();

      if (!userDoc.exists) {
        throw new Error("Usuario no encontrado en la base de datos");
      }

      const userData = userDoc.data() as User;
      return userData;
    } catch (error: any) {
      throw new Error(`Error en login: ${error.message}`);
    }
  }

  /**
   * Cierra sesión
   */
  async logout(): Promise<void> {
    try {
      await this.auth.signOut();
    } catch (error: any) {
      throw new Error(`Error al cerrar sesión: ${error.message}`);
    }
  }

  /**
   * Obtiene el usuario actual
   */
  getCurrentUser(): User | null {
    const firebaseUser = this.auth.currentUser;
    if (!firebaseUser) {
      return null;
    }
    // Nota: En producción, deberías obtener los datos de Firestore
    return {
      id: firebaseUser.uid,
      email: firebaseUser.email || "",
      displayName: firebaseUser.displayName || "",
      role: UserRole.PARENT, // Temporal, debería venir de Firestore
      subscriptionTier: SubscriptionTier.FREE,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    };
  }

  /**
   * Escucha cambios en el estado de autenticación
   */
  onAuthStateChanged(callback: (user: User | null) => void): () => void {
    return this.auth.onAuthStateChanged(async (firebaseUser) => {
      if (!firebaseUser) {
        callback(null);
        return;
      }

      try {
        const userDoc = await this.firestore
          .collection("users")
          .doc(firebaseUser.uid)
          .get();

        if (userDoc.exists) {
          callback(userDoc.data() as User);
        } else {
          callback(null);
        }
      } catch (error) {
        console.error("Error obteniendo usuario:", error);
        callback(null);
      }
    });
  }
}

export const authService = new AuthService();
