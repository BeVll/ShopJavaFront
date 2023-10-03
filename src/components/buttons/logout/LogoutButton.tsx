import React from 'react'
import './LogoutButton.scss';
import { useTheme } from '../../../context/ThemeContext';
import Dark from '../../../utils/Theme/Dark';
import Light from '../../../utils/Theme/Light';
import UserService from '../../../services/UserService';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthUserActionType } from '../../../utils/Types/auth';
import axios from 'axios';
import { http, formHttp } from '../../../http';
import { useLanguage } from '../../../context/LanguageContext';

export default function LogoutButton() {
    const { theme, toggleTheme } = useTheme()
    const theme2 = theme == "dark" ? Dark : Light;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { languageItem } = useLanguage();
    
    const logout = () => {
        
        localStorage.removeItem("token");
        delete http.defaults.headers.common["Authorization"];
        delete formHttp.defaults.headers.common["Authorization"];
        dispatch({ type: AuthUserActionType.LOGOUT_USER });
        navigate("/login");
    }

    return (
        <div className='logoutButton' onClick={logout}>
            <div className='logoutContent'>
                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill={Dark.mainText} className="icon bi bi-box-arrow-right" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                    <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                </svg>
                <span className='text' style={{color: Dark.mainText}}>{languageItem.login.logoutBtn}</span>
            </div>

        </div>
    )
}
