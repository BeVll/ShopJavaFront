import axios from "axios";
import { IChangeImageRequest, IFollowResult, IUserProfile } from "../utils/Types/user";
import { AuthUserActionType, IConfirmEmail, ILoginGoogleUser, ILoginResult, ILoginUser, IRegisterUser } from "../utils/Types/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formHttp, http } from "../http";


const UserService = {

  loginGoogleUser: async function (userData: ILoginGoogleUser) {
    try {
      const response = await formHttp.post<ILoginResult>("/auth/loginGoogle", userData)
      return response;
    } catch (error) {
      throw error;
    }
  },
  logout: async function () {
    try {
      
      return "Ok";
    } catch (error) {
      throw error;
    }
  },
  loginUser: async function (userData: ILoginUser) {
    try {
      const response = await formHttp.post("/auth/login", {data: userData});
      return response;
    } catch (error) {
      throw error;
    }
  },
  registerUser: async function (userData: IRegisterUser) {
    try {
      const response = await formHttp.post("/account/register", {data: userData});
      return response;
    } catch (error) {
      throw error;
    }
  },
  changeAvatar: async function (model: IChangeImageRequest) {
    try {

      const response = await formHttp.post("/user/changeAvatar", model);

      return response;
    }
    catch (error) {
      throw error;
    }
  },
  changeHeader: async function (model: IChangeImageRequest) {
    try {

      const response = await formHttp.post("/user/changeHeader", model);

      return response;
    }
    catch (error) {
      throw error;
    }
  },
  getProfile: async function (id: string, forUserId?:string) {
    try {
      var url = forUserId ? `/user/${id}?forUserId=${forUserId}` : `/user/${id}`;
      const response = await http.get<IUserProfile>(url);

      return response;
    }
    catch (error) {
      throw error;
    }
  },
  followToggle: async function (userId:number) {
    try {

      const response = await http.post<IFollowResult>(`user/followToggle?userId=${userId}`);

      return response;
    }
    catch (error) {
      throw error;
    }
  },

  getAuthenticatedUser: async function (token: string) {
    try {
      const response = await http.get("/user/getAuthenticatedUser");
      return response;
    } catch (error) {
      throw error;
    }
  },
  confirmEmail: async function (userData: IConfirmEmail) {
    try {
      console.log(userData);
      const response = await formHttp.post(`/Auth/confirmEmail`, userData);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;