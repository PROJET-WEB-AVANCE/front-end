import axiosInstance from "../interceptors/auth.interceptor";
import { CategoryDto } from "../models/category";

export const getAllCategories = async (): Promise<CategoryDto[]> => {
    const response = await axiosInstance.get(`/categories`);
    return response.data;
};
