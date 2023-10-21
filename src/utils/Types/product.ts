
export interface IProductModel {
    id:number,
    name:string,
    description:string,
    images:IProductImageModel[],
    price:number
}

export interface IProductImageModel {
    id:number,
    image:string,
    productId:number,
    
}

