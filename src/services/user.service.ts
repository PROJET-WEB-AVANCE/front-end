import {UserDto} from "../models/auth";
import axiosInstance from "../interceptors/auth.interceptor";
import {CategoryDto} from "../models/category";
import {EditedProfileDto} from "../models/profile";
import {cartDto} from "../models/cart";

export const getMyInfos = async (): Promise<UserDto> => {
    const response = await axiosInstance.get<UserDto>(`/users/my-infos`);
    return response.data;
};

export const getAllCategories = async () => {
    const response = await axiosInstance.get<CategoryDto[]>(`/categories`)
    return response.data;
}

export const updateUser = async (user : EditedProfileDto) =>{
    const response = await axiosInstance.put<UserDto>(`/users/update-profile`, user)
    return response.data;
}

export const getUserCart = async () => {
    const response = await axiosInstance.get<cartDto>(`/cart`);
    return response.data;
}
