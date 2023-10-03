

export interface ICategoryModel {
    id:number,
    name:string,
    image:string,
    description:string
}

export interface ICreateCategory {
    name:string,
    image:File|undefined,
    description:string
}