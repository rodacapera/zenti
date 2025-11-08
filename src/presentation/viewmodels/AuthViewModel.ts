/**
 * Auth ViewModel
 * ViewModel para autenticación usando MVVM
 */

import { useState, useEffect } from "react";
import { authService } from "../../services/firebase/auth.service";
import { User } from "../../domain/entities/User";
import { UserRole } from "../../core/types";

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export const useAuthViewModel = () => {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((user) => {
      setState({
        user,
        loading: false,
        error: null,
      });
    });

    return unsubscribe;
  }, []);

  const register = async (
    email: string,
    password: string,
    displayName: string,
    role: UserRole
  ) => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      const user = await authService.register(
        email,
        password,
        displayName,
        role
      );
      setState((prev) => ({ ...prev, user, loading: false }));
      return user;
    } catch (error: any) {
      setState((prev) => ({
        ...prev,
        error: error.message,
        loading: false,
      }));
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      const user = await authService.login(email, password);
      setState((prev) => ({ ...prev, user, loading: false }));
      return user;
    } catch (error: any) {
      setState((prev) => ({
        ...prev,
        error: error.message,
        loading: false,
      }));
      throw error;
    }
  };

  const logout = async () => {
    try {
      setState((prev) => ({ ...prev, loading: true }));
      await authService.logout();
      setState((prev) => ({ ...prev, user: null, loading: false }));
    } catch (error: any) {
      setState((prev) => ({
        ...prev,
        error: error.message,
        loading: false,
      }));
      throw error;
    }
  };

  return {
    ...state,
    register,
    login,
    logout,
  };
};
