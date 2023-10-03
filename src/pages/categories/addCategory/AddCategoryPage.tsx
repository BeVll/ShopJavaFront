import { useFormik } from 'formik';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom';
import AppleLoginButton from '../../../components/buttons/appleLoginButton/AppleLoginButton';
import GitHubLoginButton from '../../../components/buttons/gitHubLoginButton/GitHubLoginButton';
import GoogleLoginButton from '../../../components/buttons/googleLoginButton/GoogleLoginButton';
import { useLanguage } from '../../../context/LanguageContext';
import { useTheme } from '../../../context/ThemeContext';
import UserService from '../../../services/UserService';
import Dark from '../../../utils/Theme/Dark';
import Light from '../../../utils/Theme/Light';
import { IAuthUser, IRegisterUser } from '../../../utils/Types/auth';
import { countries } from '../../../utils/countries';
import { Camera, PatchCheckFill, Instagram, Twitter, GeoAlt } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';
import Loader from '../../../components/loader/Loader';
import Post from '../../../components/post/Post';
import { IUserProfile, IChangeImageRequest } from '../../../utils/Types/user';
import './AddCategoryPage.scss';
import { ICategoryModel, ICreateCategory } from '../../../utils/Types/category';
import CategoryService from '../../../services/CategoryService';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import * as yup from 'yup';

export default function AddCategoryPage() {
    const { theme } = useTheme();
    const themeColors = theme == "dark" ? Dark : Light;
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [google, setGoogle] = useState(false);
    const { languageItem } = useLanguage();
    const [loadingCategories, setLoadingCategories] = useState<boolean>(false);
    const [show, setShow] = useState(false);
    const [image, setImage] = useState<any>();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const url = `https://accounts.google.com/o/oauth2/v2/auth?
    scope=https%3A//www.googleapis.com/auth/drive.metadata.readonly&
    include_granted_scopes=true&
    response_type=token&
    state=state_parameter_passthrough_value&
    redirect_uri=https%3A//oauth2.example.com/code&
    client_id=349322929062-ukqi0ffks12d1vg6oh08po0edev5n459.apps.googleusercontent.com`

    document.title = `Create category | FladeUp`;

    const onChangeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            console.log("files");
            const file = files[0];
            const allowTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
            if (!allowTypes.includes(file.type)) {
                alert("Невірний формат файлу");
                return;
            } 
            setFieldValue("image", file);
            const fileReader = new FileReader();

            fileReader.onload = () => {
                setImage(fileReader.result);
               
            };
            fileReader.readAsDataURL(file);
            

        }

    }


    useEffect(() => {


        return () => {

        }
    }, [])

    const initValues: ICreateCategory = {
        name: "",
        image: undefined,
        description: ""
    };

    const createSchema = yup.object({
        name: yup.string().min(2, "Too short").max(50, "Too long").required("Name is required"),
        description: yup.string().min(2, "Too short").max(50, "Too long").required("Name is required"),
    });

    const onSubmitFormikData = async (values: ICreateCategory) => {

        CategoryService.createCateory(values)
            .then((res2) => {
                navigate("../");
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
        loadingCategories
            ?
            <Loader />
            :
            <div className='createCategory'>

                <div className="userDataBlock" style={{ backgroundColor: themeColors.background, justifyContent: loadingCategories ? "center" : "start" }}>
                    <form className="inputs" onSubmit={handleSubmit}>
                        <div className="avatarBlock" style={{ backgroundImage: image ? `url(${image})` : "#fff", borderColor: themeColors.background, backgroundColor: themeColors.secondaryBackground }}>

                            <>
                                <label className="changeBg" htmlFor='image'>
                                    <Camera size={50} />
                                </label>

                                <input name='image' id='image' accept="image/png, image/jpeg, image/gif, image/jpg" onChange={onChangeImageHandler} style={{ display: 'none' }} height={0} width={0} type="file" />
                            </>


                        </div>
                        <div className="inputBlock">
                            <input type="text" name='name' className='input' value={values.name} onChange={handleChange} style={{ backgroundColor: themeColors.backgroundHover, borderColor: themeColors.descriptionText, outlineColor: themeColors.primary, color: themeColors.mainText }} placeholder={languageItem.login.name} />
                            <span className='error' style={{ color: themeColors.error }}>{errors.name}</span>
                        </div>

                        <div className="inputBlock">
                            <input type="text" name='description' className='input' value={values.description} onChange={handleChange} style={{ backgroundColor: themeColors.backgroundHover, borderColor: themeColors.descriptionText, outlineColor: themeColors.primary, color: themeColors.mainText }} placeholder={"Description"} />
                            <span className='error' style={{ color: themeColors.error }}>{errors.description}</span>
                        </div>

                        <div className="inputBlock signButtons">
                            <button type='submit' data-toggle="modal" data-target="#exampleModal" className='registerBtn' style={{ borderColor: themeColors.primary, backgroundColor: themeColors.primary, color: themeColors.mainText }}>Create</button>
                            <a className="otherSignPage" style={{ color: themeColors.primary }} onClick={() => {navigate("../")}}>Back</a>
                        </div>

                    </form>



                </div>
            </div>
    )
}
