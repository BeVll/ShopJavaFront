
import { IUserProfile } from "../utils/Types/user";
import { http } from "../http";


const SearchService = {

  getProfiles: async function (query:string, userId:number) {
    try {
      const response = await http.get<IUserProfile[]>(`/search/profiles?query=${query}&userId=`)
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default SearchService;