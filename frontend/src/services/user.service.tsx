import apiClient from '../api/client';
import type { UserPublic } from '../types/auth.types';

// For Admin
export const getUsers = async (): Promise<UserPublic[]> => {
    try {
        const res = await apiClient.get<UserPublic[]>("/users");
        return res.data;
    } catch (error) {
        console.error('Failed to fetch users:', error);
        throw error;
    }
}

//Get Single User Info
export const getUserById = async(id: string): Promise<UserPublic> => {
    try {
        const res = await apiClient.get<UserPublic>(`/users/${id}`);
        return res.data;
    } catch (error) {
        console.error(`Failed to fetch user ${id}:`, error);
        throw error;
    }
}

//Update User Info
export const updateUser = async (id: string, user: Partial<UserPublic>): Promise<UserPublic> => {
  try {
    const res = await apiClient.put<UserPublic>(`/users/${id}`, user);
    return res.data;
  } catch (error) {
    console.error(`Failed to update user ${id}:`, error);
    throw error;
  }
};

//delete User
export const deleteUser = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/users/${id}`);
  } catch (error) {
    console.error(`Failed to delete user ${id}:`, error);
    throw error;
  }
};