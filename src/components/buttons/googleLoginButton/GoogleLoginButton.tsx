import React from 'react'
import './GoogleLoginButton.css';
import { Github, Google } from 'react-bootstrap-icons';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { ILoginGoogleUser, ILoginResult, ILoggedUser, AuthUserActionType } from '../../../utils/Types/auth';
import UserService from '../../../services/UserService';
import { IUser } from '../../../utils/Types/user';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { http, formHttp } from '../../../http';

export default function GoogleLoginButton({ backgroundColor = "#121111", size = "45px", sizeIcon = "20px", colorIcon = "#fff", onClickFunc }: { backgroundColor?: string, size?: string, sizeIcon?: string, colorIcon?: string, onClickFunc: any }) {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  return (
    <div className='GoogleLoginBtn' style={{ backgroundColor: backgroundColor, height: size, width: size }}>
      <Google size={sizeIcon} color={colorIcon} />
      <GoogleOAuthProvider clientId='349322929062-ukqi0ffks12d1vg6oh08po0edev5n459.apps.googleusercontent.com'>
        <GoogleLogin
          type='icon'
          shape='square'
          size='large'

          onSuccess={(credentialResponse: any) => {

            console.log(credentialResponse);
            if (credentialResponse.credential) {
              axios.get('https://api.geoapify.com/v1/ipinfo?apiKey=d74e417fb77f459daa5e229304c08a0e')
                .then(async (response: any) => {
                  const country = response.data.country;
                  console.log('User Country:', country);
                  console.log(credentialResponse);
                  var user: ILoginGoogleUser = {
                    token: credentialResponse.credential ? credentialResponse.credential : "",
                    country: country.name,
                    countryCode: country.iso_code
                  }

                  UserService.loginGoogleUser(user)
                    .then((reg: any) => {
                      localStorage.token = reg.data.token;

                      http.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;
                      formHttp.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;

                      console.log(localStorage.token);
                      const user2 = jwtDecode(localStorage.token) as IUser;
                      localStorage.user = user2;
                      console.log(user2);
                      dispatch({
                        type: AuthUserActionType.LOGIN_USER, payload: {
                          id: user2.id,
                          name: user2.name,
                          userName: user2.userName,
                          image: user2.image,
                          bg: user2.bg,
                          roles: user2.roles
                        } as IUser
                      });

                      navigate("/");
                    });
                })
                .catch((error) => {
                  console.log('Error fetching user country:', error);
                });
            }
          }}

          onError={() => {
            console.log('Login Failed');
          }}
        />
      </GoogleOAuthProvider>
    </div>
  )
}
