import React, { useEffect, useState } from 'react'
import { useTheme } from '../../context/ThemeContext';
import Dark from '../../utils/Theme/Dark';
import Light from '../../utils/Theme/Light';
import './RegisterPage.scss';
import { countries } from '../../utils/countries';
import { IRegisterUser } from '../../utils/Types/auth';
import { useFormik } from 'formik';
import * as yup from 'yup';
import UserService from '../../services/UserService';
import GitHubLoginButton from '../../components/buttons/gitHubLoginButton/GitHubLoginButton';
import GoogleLoginButton from '../../components/buttons/googleLoginButton/GoogleLoginButton';
import AppleLoginButton from '../../components/buttons/appleLoginButton/AppleLoginButton';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

export default function RegisterPage() {
    const { theme } = useTheme();
    const themeColors = theme == "dark" ? Dark : Light;
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [google, setGoogle] = useState(false);
    const { languageItem } = useLanguage();
    
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

    const initValues: IRegisterUser = {
        email: "",
        password: "",
        passwordConfirm: "",
        name: "",
        userName: "",
        country: countries.at(0)?.name ? countries[0].name : "Afghanistan",
        countryCode: countries.at(0)?.code ? countries[0].code : "af",
        dateOfBirth: new Date(Date.now()).getDate().toString()
    };

    const createSchema = yup.object({
        email: yup.string().email("Wrong email type").required("Email is required"),
        name: yup.string().min(2, "Too short").max(50, "Too long").required("Name is required"),
        userName: yup.string().min(2, "Too short").max(30, "Too long").required("Username is required"),
        password: yup.string().min(6, "Too short").max(100, "Too long").required("Password is required"),
        passwordConfirm: yup.string().min(6, "Too short").max(100, "Too long").oneOf([yup.ref('password'), ""], 'Passwords must match').required("Confirm password is required field"),
        dateOfBirth: yup.date().min(new Date(1900, 1, 1)).required(),
        countryCode: yup.string().min(2).max(2).required()
    });

    const onSubmitFormikData = async (values: IRegisterUser) => {

        const country = await countries.find(c => c.code.toLocaleLowerCase() == values.countryCode)?.name;

        console.log("country" + country);
        if (country) {
            let userReg: IRegisterUser = {
                email: values.email,
                password: values.password,
                passwordConfirm: values.passwordConfirm,
                name: values.name,
                userName: values.userName,
                country: country,
                countryCode: values.countryCode,
                dateOfBirth: values.dateOfBirth
            }

            UserService.registerUser(userReg)
                .then((res2) => {
                    navigate("/login");
                })
                .catch((error) => {
                    console.log(error);
                    setErrorMessage(error.response.data);
                });

            console.log("valid");
        }





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
                    <input type="text" name='name' className='input' value={values.name} onChange={handleChange} style={{ backgroundColor: themeColors.backgroundHover, borderColor: themeColors.descriptionText, outlineColor: themeColors.primary, color: themeColors.mainText }} placeholder={languageItem.login.name} />
                    <span className='error' style={{ color: themeColors.error }}>{errors.name}</span>
                </div>

                <div className="inputBlock">
                    <input type="email" name='email' className='input' value={values.email} onChange={handleChange} style={{ backgroundColor: themeColors.backgroundHover, borderColor: themeColors.descriptionText, outlineColor: themeColors.primary, color: themeColors.mainText }} placeholder={languageItem.login.email} />
                    <span className='error' style={{ color: themeColors.error }}>{errors.email}</span>
                </div>
                <div className="inputBlock">
                    <input type="password" name='password' className='input' value={values.password} onChange={handleChange} style={{ backgroundColor: themeColors.backgroundHover, borderColor: themeColors.descriptionText, outlineColor: themeColors.primary, color: themeColors.mainText }} placeholder={languageItem.login.password} />
                    <span className='error' style={{ color: themeColors.error }}>{errors.password}</span>
                </div>
                <div className="inputBlock">
                    <input type="password" name='passwordConfirm' className='input' value={values.passwordConfirm} onChange={handleChange} style={{ backgroundColor: themeColors.backgroundHover, borderColor: themeColors.descriptionText, outlineColor: themeColors.primary, color: themeColors.mainText }} placeholder={languageItem.login.confirmPassword} />
                    <span className='error' style={{ color: themeColors.error }}>{errors.passwordConfirm}</span>
                </div>
                <div className="inputBlock">
                    <input type="text" name='userName' className='input' value={values.userName} onChange={handleChange} style={{ backgroundColor: themeColors.backgroundHover, borderColor: themeColors.descriptionText, outlineColor: themeColors.primary, color: themeColors.mainText }} placeholder={languageItem.login.userName} />
                    <span className='error' style={{ color: themeColors.error }}>{errors.userName}</span>
                </div>
                <div className="inputBlock">
                    <input type="date" name='dateOfBirth' className='input' value={values.dateOfBirth} onChange={handleChange} style={{ backgroundColor: themeColors.backgroundHover, borderColor: themeColors.descriptionText, outlineColor: themeColors.primary, color: themeColors.mainText }} placeholder={languageItem.login.dateOfBirth} />
                    <span className='error' style={{ color: themeColors.error }}>{errors.dateOfBirth}</span>
                </div>
                <div className="inputBlock">
                    <select className='input select' name='countryCode' value={values.countryCode} onChange={handleChange} style={{ backgroundColor: themeColors.backgroundHover, borderColor: themeColors.descriptionText, outlineColor: themeColors.primary, color: themeColors.mainText }} placeholder={languageItem.login.country} >
                        {countries.map(country =>
                            <option value={country.code.toLowerCase()} style={{ borderColor: themeColors.primary }}>{country.name}</option>
                        )}
                    </select>
                </div>
                <div className="inputBlock signButtons">
                    <button type='submit' data-toggle="modal" data-target="#exampleModal" className='registerBtn' style={{ borderColor: themeColors.primary, backgroundColor: themeColors.primary, color: themeColors.mainText }}>{languageItem.login.signUpBtn}</button>
                    <Link className="otherSignPage" style={{ color: themeColors.primary }} to="/login">{languageItem.login.loginBtn}</Link>
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
