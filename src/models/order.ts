import {UserDto} from "./auth";

export interface OrderDto {
    id: number;
    userId: number | UserDto;
    date: Date;
    items: { id: number; name: string;  quantity: number }[];
    status: string;
    totalAmount: number;
}

export interface AllOrderDto {
    id: number;
    userId: UserDto;
    date: Date;
    items: { id: number; name: string;  quantity: number }[];
    status: string;
    totalAmount: number;
}


export enum Estatus {
    PENDING = "pending",
    ACCEPTED = "accepted",
    DELETED = "deleted"
}