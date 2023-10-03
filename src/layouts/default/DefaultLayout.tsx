import React from 'react'
import Header from '../../components/header/Header'
import './DefaultLayout.scss';
import LogoutButton from '../../components/buttons/logout/LogoutButton';
import Dark from '../../utils/Theme/Dark';
import Light from '../../utils/Theme/Light';
import { useTheme } from '../../context/ThemeContext';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IAuthUser } from '../../utils/Types/auth';
import LoginButton from '../../components/buttons/login/LoginButton';

export default function DefaultLayout() {
  const { theme } = useTheme()
  const theme2 = theme == "dark" ? Dark : Light;
  const { user, isAuth } = useSelector((store: any) => store.auth as IAuthUser);
  
  return (
    <div className='defaultLayout' style={{ backgroundColor: theme2.backgroungBody }}>
      <Header />
      {isAuth ? <LogoutButton/> : <LoginButton/>}
      <div className='content'>
        <Outlet />
      </div>

    </div>
  )
}
