import apiClient from '../api/client';
import type { UserCreate, UserPublic, LoginCredentials, AuthResponse } from '../types/auth.types';

//Register
export const createUser = async (user: UserCreate): Promise<AuthResponse> => {
  try {
    const res = await apiClient.post<AuthResponse>("/auth/register", user);
    const { token, user: createdUser } = res.data;

    localStorage.setItem("token", token);
    localStorage.setItem("userId", createdUser.id);

    return res.data;
  } catch (error) {
    console.error('Failed to create user:', error);
    throw error;
  }
};

// Login
export const loginService = async (credentials: LoginCredentials): Promise<UserPublic> => {
  try {
    const res = await apiClient.post<AuthResponse>("/auth/login", credentials);
    const { token, user } = res.data;

    localStorage.setItem("token", token);
    localStorage.setItem("userId", user.id);

    return user;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

// Logout
export const logoutService = (): void => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
};

// restore User
export const restoreUser = async (): Promise<UserPublic | null> => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  if (!token || !userId) return null;

  try {
    const res = await apiClient.get<UserPublic>(`/auth/me`);
    return res.data;
  } catch (err) {
    console.error('Failed to restore user', err);
    logoutService();
    return null;
  }
};