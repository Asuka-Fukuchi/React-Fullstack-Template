import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { BaseType, BaseTypeCreate } from "../types/base.type";
import { getItems, createItem, updateItem, deleteItem } from '../services/base.service';

interface BaseTypeContextType {
    items: BaseType[];
    fetchItems: () => Promise<void>;
    addItem: (item: BaseTypeCreate) => Promise<void>;
    updateItemById: (id: string, item: Partial<BaseType>) => Promise<void>;
    deleteItemById: (id: string) => Promise<void>;
}

const BaseTypeContext = createContext<BaseTypeContextType | undefined>(undefined);

export const BaseTypeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<BaseType[]>([]);

    const fetchItems = async () => {
        try {
            const data = await getItems();
            const formatted: BaseType[] = data.map((t: any) => ({
                ...t,
                id: t._id,
            }));
            setItems(formatted);
        } catch (err) {
            console.error("fetchItems error", err);
        }
    };

    const addItem = async (item: BaseTypeCreate) => {
        try {
            const newItem = await createItem(item);
            setItems(prev => [...prev, newItem]);
        } catch (err) {
            console.error("addItem error", err);
            throw err;
        }
    };

    const updateItemById = async (id: string, item: Partial<BaseType>) => {
        try {
            const updated = await updateItem(id, item);
            setItems(prev => prev.map(t => t.id === id ? updated : t));
        } catch (err) {
            console.error("updateItemById error", err);
            throw err;
        }
    };

    const deleteItemById = async (id: string) => {
        try {
            await deleteItem(id);
            setItems(prev => prev.filter(t => t.id !== id));
        } catch (err) {
            console.error("deleteItemById error", err);
            throw err;
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    return (
        <BaseTypeContext.Provider value={{
            items,
            fetchItems,
            addItem,
            updateItemById,
            deleteItemById
        }}>
            {children}
        </BaseTypeContext.Provider>
    );
};

export const useBaseTypeContext = () => {
    const context = useContext(BaseTypeContext);
    if (!context) throw new Error("useBaseTypeContext must be used within BaseTypeProvider");
    return context;
};
