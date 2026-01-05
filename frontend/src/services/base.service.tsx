import apiClient from "../api/client";
import type { BaseType, BaseTypeCreate, BaseTypeUpdate } from "../types/base.type";

// Create 
export const createItem = async (newItem: BaseTypeCreate): Promise<BaseType> => {
  try {
    const res = await apiClient.post<BaseType>("/url", newItem);
    return res.data;
  } catch (error: any) {
    console.error("Failed to create newItem:", error);
    throw new Error(error.response?.data?.message || "Failed to create newItem");
  }
};

// Get all items
export const getItems = async (filter?: string): Promise<BaseType[]> => {
  try {
    const res = await apiClient.get<BaseType[]>("/url", { params: { filter }});
    return res.data;
  } catch (error: any) {
    console.error("Failed to fetch tasks:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch tasks");
  }
};

// Get single item by id
export const getItemById = async (id: string): Promise<BaseType> => {
  try {
    const res = await apiClient.get<BaseType>(`/url/${id}`);
    return res.data;
  } catch (error: any) {
    console.error(`Failed to fetch ${id}:`, error);
    throw new Error(error.response?.data?.message || "Failed to fetch");
  }
};

// Update item
export const updateItem = async (id: string, item: BaseTypeUpdate): Promise<BaseType> => {
  try {
    const res = await apiClient.patch<BaseType>(`/url/${id}`, item);
    return res.data;
  } catch (error: any) {
    console.error(`Failed to update ${id}:`, error);
    throw new Error(error.response?.data?.message || "Failed to update");
  }
};

// Delete item
export const deleteItem = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/url/${id}`);
  } catch (error: any) {
    console.error(`Failed to delete ${id}:`, error);
    throw new Error(error.response?.data?.message || "Failed to delete");
  }
};