import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import { store } from './store/index.ts';
import jwtDecode from 'jwt-decode';
import { Provider } from 'react-redux';
import { AuthUserActionType } from './utils/Types/auth.ts';
import { IUser } from './utils/Types/user.ts';
import axios from 'axios';
import { http, formHttp } from './http.ts';

if (localStorage.token && localStorage.getItem("user")) {
  http.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;
  formHttp.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;

  const user = jwtDecode(localStorage.token) as IUser;
  store.dispatch({
    type: AuthUserActionType.LOGIN_USER, payload: {
      id: user.id,
      name: user.name,
      userName: user.userName,
      image: user.image,
      bg: user.bg,
      roles: user.roles
    } as IUser
  });
 
}


ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
