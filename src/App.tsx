import { useEffect, useState } from 'react'
import './App.scss'
import DefaultLayout from './layouts/default/DefaultLayout'
import ThemeContextProvider from './context/ThemeContext'
import { RouterProvider, BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import UserService from './services/UserService';
import { IAuthed } from './utils/Types/auth';

import History from "./utils/History";
import ConfirmEmail from './pages/confirmEmail/ConfirmEmail';
import { GoogleOAuthProvider } from '@react-oauth/google';


import RegisterPage from './pages/register/RegisterPage';
import LoginPage from './pages/login/LoginPage';
import SearchPage from './pages/search/SearchPage';
import LanguageContextProvider from './context/LanguageContext';
import CategoriesListPage from './pages/categories/categoriesList/CategoriesListPage';
import AddCategoryPage from './pages/categories/addCategory/AddCategoryPage';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

function App() {
  const [count, setCount] = useState(0)
  const [userData, setUserData] = useState<IAuthed>({
    token: undefined,
    user: undefined,
    isAuth: false,
  });

  const checkLoggedIn = async () => {
    let token = localStorage.getItem("auth-token");

    if (token === null) {
      localStorage.setItem("auth-token", "");
      token = "";
    }

    try {
      if (token) {
        const decodedToken = jwtDecode<any>(token);

        // check if token still available or expired
        if (decodedToken.exp * 1000 < Date.now()) {
          // token expired
          localStorage.setItem("auth-token", "");
          token = "";
          setUserData({
            token: undefined,
            user: undefined,
            isAuth: false,
          });
          console.log(
            decodedToken.exp * 1000,
            "<",
            Date.now(),
            "Token is expired!"
          );
          History.push("/login");
        } else {
          // token not yet expire
          var tokenCache = window.sessionStorage.getItem("CacheUserData");
          if (tokenCache) {
            let cacheUserData = JSON.parse(tokenCache);
            // check if user data was cached or not
            if (cacheUserData) {
              // user data is cached
              setUserData({
                token: cacheUserData.token,
                user: cacheUserData.user,
                isAuth: cacheUserData.isAuth,
              });
            } else {
              // user data is not cached, so execute an api request to fetch data.
              UserService.getAuthenticatedUser(token)
                .then((res) => {
                  setUserData({
                    token: token,
                    user: res.data,
                    isAuth: true,
                  });
                  // add data to the cache
                  window.sessionStorage.setItem(
                    "CacheUserData",
                    JSON.stringify({
                      token: token,
                      isAuth: true,
                      user: res.data,
                    })
                  );
                })
                .catch((error) => {
                  console.log("Unknown Token!", error);
                });
            }
          }

        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  checkLoggedIn();

  useEffect(() => {


    return () => {

    }
  }, [])


  return (
    <BrowserRouter>
      <ThemeContextProvider >
        <LanguageContextProvider>
          <GoogleOAuthProvider clientId='349322929062-ukqi0ffks12d1vg6oh08po0edev5n459.apps.googleusercontent.com'>
            <Routes>
              <Route path='/' element={<DefaultLayout />}>
                <Route index element={<Home />} />
                <Route path='confirmEmail/:id' element={<ConfirmEmail />} />
                <Route path='register' element={<RegisterPage />} />
                <Route path='login' element={<LoginPage />} />
                <Route path='search' element={<SearchPage />} />
                <Route path='categories'>
                    <Route index element={<CategoriesListPage/>}/>
                    <Route path='create' element={<AddCategoryPage/>} />
                </Route>
              </Route>
            </Routes>
          </GoogleOAuthProvider>
        </LanguageContextProvider>

      </ThemeContextProvider>
    </BrowserRouter>
  )
}

export default App

