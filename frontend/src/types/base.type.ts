export interface BaseType{
    id: string
    userId: string
    title: string
    description: string
}

export type BaseTypeCreate = Omit<BaseType, "id" | "userId">;
export type BaseTypeUpdate = Partial<Omit<BaseType, "id" | "userId">>;