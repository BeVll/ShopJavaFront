export interface IUserProfile{
    id: number,
    name: string,
    userName: string,
    image: string,
    header: string,
    description: string,
    verified: boolean,
    country: string,
    countryCode: string,
    city: string,
    isLightTheme: boolean,
    instagram: string,
    facebook: string,
    twitter: string,
    isFollowed: boolean,
    followersCount: number,
    followedCount: number,
    likesCount: number
}

export interface IUser {
    id: string,
    firstname: string,
    lastname: string,
    phone:string,
    email: string
}

export interface IChangeImageRequest {
    image: File
}

export interface IFollowResult {
    isFollowed: boolean
}