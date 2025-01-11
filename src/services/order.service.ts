import axiosInstance from "../interceptors/auth.interceptor";
import {AllOrderDto, OrderDto} from "../models/order";

export const getOrders = async () => {
    const response = await axiosInstance.get<AllOrderDto[]>("/order/all");
    return response.data;

}

export const getMyOrders = async () => {
    const response = await axiosInstance.get("/order/my-orders");
    return response.data;
}

export const deleteOrder = async (orderId: number) => {
    const response = await axiosInstance.delete<OrderDto>(`/order/${orderId}`);
    return response.data;
}

export const updateOrder = async (order: OrderDto) => {
    const response = await axiosInstance.put<OrderDto>(`/order/`, {id:order.id, order: order});
    return response.data;
}

export const validateOrder = async (orderId: number) => {
    console.log("Validate Order : ", orderId);
    const response = await axiosInstance.post(`/order/accept/${orderId}`);
    return response.data;
}