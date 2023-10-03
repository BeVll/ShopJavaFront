import { IUser } from "./user"

export interface IAuthed {
    token: string|null|undefined,
    user: ILoggedUser|null|undefined,
    isAuth: boolean
}

export interface ILoggedUser{
    id: number,
    name: string,
    image: string,
    email: string
}

export interface ILoginUser{
    email: string,
    password: string
}

export interface IRegisterUser{
    email: string,
    password: string,
    passwordConfirm: string,
    name: string,
    userName: string,
    country: string,
    countryCode: string,
    dateOfBirth: string
}

export interface IConfirmEmail{
    id: number,
    token: string
}

export interface ILoginGoogleUser{
    token:string,
    country:string,
    countryCode:string
}

export interface ILoginResult {
    token: string
}

export enum AuthUserActionType {
    LOGIN_USER = "AUTH_LOGIN_USER",
    LOGOUT_USER = "AUTH_LOGOUT_USER"
}

export interface IAuthUser {
    isAuth: boolean,
    user?: IUser
}