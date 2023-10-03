
import { IUserProfile } from "../utils/Types/user";
import { formHttp, http } from "../http";
import { ICreatePost, IPostModel } from "../utils/Types/post";
import { ICategoryModel, ICreateCategory } from "../utils/Types/category";


const CategoryService = {

  getCategories: async function () {
    try {
      const response = await http.get<ICategoryModel[]>(`/categories`)
      return response;
    } catch (error) {
      throw error;
    }
  },
  createCateory: async function (post:ICreateCategory) {
    try {
      const response = await formHttp.post<IPostModel>(`/categories`, post);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default CategoryService;