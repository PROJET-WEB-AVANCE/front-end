export interface UserCreateDto{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface UserLoginDto{
    email: string;
    password: string;
}

export interface UserDto {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    type: ERole;
}



export enum ERole {
    ROLE_CLIENT = "Client",
    ROLE_SALES = "Sales",
    ROLE_ADMIN = "Admin"
}


export interface JwtTokenDto {
    token: string;

}

export interface JwtPayload {
    id: number;
    firstName: string;
    role: ERole;
}

export interface RegisterDto {
    message: string;
}

