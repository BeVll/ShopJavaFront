import React from 'react'
import './LoginButton.css';
import { useTheme } from '../../../context/ThemeContext';
import Dark from '../../../utils/Theme/Dark';
import Light from '../../../utils/Theme/Light';
import UserService from '../../../services/UserService';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthUserActionType } from '../../../utils/Types/auth';
import { useLanguage } from '../../../context/LanguageContext';

export default function LoginButton() {
    const { theme, toggleTheme } = useTheme()
    const themeColors = theme == "dark" ? Dark : Light;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { languageItem } = useLanguage();


    return (
        <div className='loginButton' style={{backgroundColor: themeColors.primary, borderColor: themeColors.primary}} onClick={() => {navigate("/login");}}>
            <div className='loginContent'>
                <span className='text' style={{color: Dark.background}}>{languageItem.login.loginBtn}</span>
            </div>

        </div>
    )
}
