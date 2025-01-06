import {CategoryDto, UserDto} from "../models/auth";
import axiosInstance from "../interceptors/auth.interceptor";


export const getMyInfos = async (): Promise<UserDto> => {
    const response = await axiosInstance.get<UserDto>(`/users/my-infos`);
    return response.data;
};

export const getAllCategories = async () => {
    const response = await axiosInstance.get<CategoryDto[]>(`/categories`)
    return response.data;
}