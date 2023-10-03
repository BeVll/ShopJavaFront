export interface ILanguage {
    login: {
        email: string,
        password: string,
        loginBtn: string,
        logoutBtn: string,
        signUpBtn: string,
        continueWith: string,
        name: string,
        confirmPassword: string,
        userName: string,
        dateOfBirth: string,
        country: string,
    },
    profile: {
        followers: string,
        followed: string,
        likes: string,
        editProfile: string,
        follow: string,
        unFollow: string
    }
}