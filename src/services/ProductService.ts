
import { IUserProfile } from "../utils/Types/user";
import { formHttp, http } from "../http";
import { ICategoryModel, ICreateCategory } from "../utils/Types/category";
import { IProductModel } from "../utils/Types/product";


const ProductService = {

  getProducts: async function () {
    try {
      const response = await http.get<IProductModel[]>(`/products`)
      return response;
    } catch (error) {
      throw error;
    }
  },
  // createCateory: async function (post:ICreateCategory) {
  //   try {
  //     const response = await formHttp.post<IPostModel>(`/categories`, post);
  //     return response;
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}

export default ProductService;