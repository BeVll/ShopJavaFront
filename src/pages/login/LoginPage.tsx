import React, { useEffect, useState } from 'react'
import { useTheme } from '../../context/ThemeContext';
import Dark from '../../utils/Theme/Dark';
import Light from '../../utils/Theme/Light';
import './LoginPage.scss';
import { AuthUserActionType, ILoginUser } from '../../utils/Types/auth';
import { useFormik } from 'formik';
import * as yup from 'yup';
import UserService from '../../services/UserService';
import GitHubLoginButton from '../../components/buttons/gitHubLoginButton/GitHubLoginButton';
import GoogleLoginButton from '../../components/buttons/googleLoginButton/GoogleLoginButton';
import AppleLoginButton from '../../components/buttons/appleLoginButton/AppleLoginButton';
import { Link, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { IUser } from '../../utils/Types/user';
import { useDispatch } from 'react-redux';
import { http, formHttp } from '../../http';
import { useLanguage } from '../../context/LanguageContext';

export default function LoginPage() {
    const { theme } = useTheme();
    const { languageItem } = useLanguage();

    const themeColors = theme == "dark" ? Dark : Light;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState("");
    const [google, setGoogle] = useState(false);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const url = `https://accounts.google.com/o/oauth2/v2/auth?
    scope=https%3A//www.googleapis.com/auth/drive.metadata.readonly&
    include_granted_scopes=true&
    response_type=token&
    state=state_parameter_passthrough_value&
    redirect_uri=https%3A//oauth2.example.com/code&
    client_id=349322929062-ukqi0ffks12d1vg6oh08po0edev5n459.apps.googleusercontent.com`

    document.title = `Sign up | FladeUp`;





    useEffect(() => {
        

        return () => {

        }
    }, [])

    const initValues: ILoginUser = {
        email: "",
        password: ""
    };

    const createSchema = yup.object({
        email: yup.string().email("Wrong email type").required("Email is required"),
        password: yup.string().min(6, "Too short").max(100, "Too long").required("Password is required")
    });

    const onSubmitFormikData = async (values: ILoginUser) => {

        UserService.loginUser(values)
            .then((res) => {
                localStorage.token = res.data.token;
                http.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;
                formHttp.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;
                console.log(localStorage.token);
                const user2 = jwtDecode(localStorage.token) as IUser;
                localStorage.user = user2;
                console.log(user2);
                dispatch({
                    type: AuthUserActionType.LOGIN_USER, payload: {
                        id: user2.id,
                        firstname: user2.firstname,
                        lastname: user2.lastname,
                        phone: user2.phone
                    } as IUser
                });

                navigate("/");
            })
            .catch((error) => {
                console.log(error);
                setErrorMessage(error.response.data);
            });

        console.log("valid");
    }

    const formik = useFormik({
        initialValues: initValues,
        validationSchema: createSchema,
        onSubmit: onSubmitFormikData
    });

    const { values, errors, handleSubmit, setFieldValue, handleChange } = formik;

    return (
        <div className='registerPage' style={{ backgroundColor: themeColors.background }}>
        
            <span className='errorSended' style={{ color: themeColors.error }}>{errorMessage}</span>
            <form className="inputs" onSubmit={handleSubmit}>

                

                <div className="inputBlock">
                    <input type="email" name='email' className='input' value={values.email} onChange={handleChange} style={{ backgroundColor: themeColors.backgroundHover, borderColor: themeColors.descriptionText, outlineColor: themeColors.primary, color: themeColors.mainText }} placeholder={languageItem.login.email} />
                    <span className='error' style={{ color: themeColors.error }}>{errors.email}</span>
                </div>
                <div className="inputBlock">
                    <input type="password" name='password' className='input' value={values.password} onChange={handleChange} style={{ backgroundColor: themeColors.backgroundHover, borderColor: themeColors.descriptionText, outlineColor: themeColors.primary, color: themeColors.mainText }} placeholder={languageItem.login.password} />
                    <span className='error' style={{ color: themeColors.error }}>{errors.password}</span>
                </div>
                
                <div className="inputBlock signButtons">
                    <button type='submit' data-toggle="modal" data-target="#exampleModal" className='registerBtn' style={{ borderColor: themeColors.primary, backgroundColor: themeColors.primary, color: themeColors.mainText }}>{languageItem.login.loginBtn}</button>
                    <Link className="otherSignPage" style={{ color: themeColors.primary }} to="/register">{languageItem.login.signUpBtn}</Link>
                </div>

                <div className="lineDiv">
                    <div className="line" style={{ backgroundColor: themeColors.mainText }}></div>
                    <div className="textLine" style={{ color: themeColors.mainText }}>{languageItem.login.continueWith}</div>
                    <div className="line" style={{ backgroundColor: themeColors.mainText }}></div>
                </div>
                <div className="inputBlock appsLogin" style={{ borderColor: themeColors.primary }}>

                    <GoogleLoginButton onClickFunc={() => { setGoogle(!google) }} backgroundColor={themeColors.backgroundHover} size='50px' colorIcon={themeColors.mainText} />
                    <AppleLoginButton backgroundColor={themeColors.backgroundHover} size='50px' colorIcon={themeColors.mainText} />
                    <GitHubLoginButton backgroundColor={themeColors.backgroundHover} size='50px' colorIcon={themeColors.mainText} />
                </div>
            </form>


        </div>
    )
}
