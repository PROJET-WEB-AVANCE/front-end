import {Base64} from 'js-base64';
import {JwtPayload, JwtTokenDto, UserCreateDto, UserLoginDto} from '../models/auth';
import axiosInstance from "../interceptors/auth.interceptor";

const USER_JWT_TOKEN_KEY = 'USER_JWT_TOKEN_KEY';

export const login = async (userLoginDto: UserLoginDto): Promise<JwtTokenDto> => {
    const response = await axiosInstance.post<JwtTokenDto>(`/auth/login`, userLoginDto);
    setCurrentToken(response.data);

    const event = new Event('session-changed');
    window.dispatchEvent(event);

    return response.data;
};

export const register = async (userCreateDto: UserCreateDto): Promise<JwtTokenDto> => {
    const response = await axiosInstance.post<any>(`/auth/register`, userCreateDto);
    return response.data;
};

export const logout = () => {
    localStorage.removeItem(USER_JWT_TOKEN_KEY);

    const event = new Event('session-changed');
    window.dispatchEvent(event);
};

export const decodeJwt = (token: string): Record<string, any> | null => {
    try {
        const base64Url = token.split('.')[1];
        return JSON.parse(Base64.decode(base64Url));
    } catch (error) {
        console.error('Failed to decode JWT:', error);
        return null;
    }
};

export const getCurrentSession = (): JwtPayload | null => {
    const userJwtToken = localStorage.getItem(USER_JWT_TOKEN_KEY);
    if (userJwtToken) {
        return decodeJwt(userJwtToken) as JwtPayload;
    }
    return null;
};

export const getCurrentToken = (): JwtTokenDto | null => {
    const userJwtToken = localStorage.getItem(USER_JWT_TOKEN_KEY);
    return userJwtToken ? JSON.parse(userJwtToken) : null;
};

export const isLoggedIn = (): boolean => {
    return getCurrentSession() !== null;
};

const setCurrentToken = (loginStatus: JwtTokenDto) => {
    const userJwtTokenString = JSON.stringify(loginStatus);
    localStorage.setItem(USER_JWT_TOKEN_KEY, userJwtTokenString);
};

export const hasRole = (role: string): boolean => {
    const currentSession = getCurrentSession();
    return currentSession !== null && currentSession.role === role;
};
