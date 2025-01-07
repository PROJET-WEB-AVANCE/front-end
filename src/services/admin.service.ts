import axiosInstance from "../interceptors/auth.interceptor";
import {ArticleDto} from "../models/auth";
import axios from "axios";

export const getAllArticles = async (): Promise<ArticleDto[]> => {
    const response = await axiosInstance.get<ArticleDto[]>(`/articles`);
    return response.data;
};

export const deleteArticle = async (id: number) =>{
    const response = await axiosInstance.delete(`/articles/${id}`, { method: 'DELETE' });
    return response.data;
}

export const addArticle = async (article: ArticleDto)=>{

    const response = await axiosInstance.post(`/articles`, JSON.stringify(article));
    return response.data;
}

export const updateArticle = async (article : ArticleDto) => {
    const response = await axiosInstance.put(`/articles/${article.id}`, JSON.stringify(article));
    return response.data;
}

export const getArticleById = async(id: number) => {
    const response = await axiosInstance.get<ArticleDto>(`/articles/${id}`);
    return response.data;
}

