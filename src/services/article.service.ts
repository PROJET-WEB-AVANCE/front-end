import axiosInstance from "../interceptors/auth.interceptor";
import { ArticleDto } from "../models/article";

export const getAllArticles = async (filters: {
    offset: number;
    name: string;
    limit: number;
    categoryName: string | undefined;
    sortPrice: string
}): Promise<{ data: ArticleDto[]; total: number }> => {
    const response = await axiosInstance.get(`/articles`, { params: filters });
    return response.data;
};

export const getArticleByName = async (name: string | undefined): Promise<ArticleDto> => {
    const response = await axiosInstance.get(`/articles/name/${name}`);
    return response.data;
};
