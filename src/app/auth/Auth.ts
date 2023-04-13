export interface LoginForm{
    email: string;
    password: string;
}

export interface profile{
    firstName: string;
    lastName: string;
    age: string;
    gender: string;
}

export interface RegisterForm{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    age: number;
    gender: string;
}