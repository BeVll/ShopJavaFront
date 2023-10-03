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
import { Camera, PatchCheckFill, Instagram, Twitter, GeoAlt, PlusCircle } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';
import Loader from '../../../components/loader/Loader';
import Post from '../../../components/post/Post';
import { IUserProfile, IChangeImageRequest } from '../../../utils/Types/user';
import './CategoriesListPage.scss';
import { ICategoryModel } from '../../../utils/Types/category';
import CategoryService from '../../../services/CategoryService';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import Input from '../../../components/input/Input';

export default function CategoriesListPage() {
    const { theme } = useTheme();
    const themeColors = theme == "dark" ? Dark : Light;
    const [loadingCategories, setLoadingCategories] = useState<boolean>(true);
    const [categories, setCategories] = useState<ICategoryModel[]>([]);
    const { id } = useParams();

    const { languageItem } = useLanguage();
    const navigate = useNavigate();

    useEffect(() => {
        CategoryService.getCategories()
            .then(async (res: any) => {
                setCategories(res.data);
                console.log(res.data);
                setLoadingCategories(false);
                document.title = `Categories | FladeUp`;
            });



        window.scrollTo(0, 0);

        return () => {

        }
    }, [])


    return (
        loadingCategories
            ?
            <Loader />
            :
            <div className='profile'>

                <div className="userDataBlock" style={{ backgroundColor: themeColors.background, justifyContent: loadingCategories ? "center" : "start" }}>
                    <div className="headerTable">
                        <Input placeHolder='Search' />
                        <Link to={"/categories/create"} className='createBtn' style={{ backgroundColor: themeColors.primary, color: themeColors.secondaryBackground }}>
                            <PlusCircle size={20} />
                            <span>Create</span>
                        </Link>
                    </div>
                    <Table striped bordered hover style={{ width: '100%' }}>
                        <thead>
                            <tr>
                                <th style={{ color: themeColors.descriptionText, width: '5%' }}>
                                    <input type='checkbox' style={{ backgroundColor: themeColors.backgroundHover, borderColor: themeColors.primary }} />
                                </th>
                                <th style={{ color: themeColors.descriptionText, width: '10%' }} >Id</th>
                                <th style={{ color: themeColors.descriptionText, width: '10%'  }}>Image</th>
                                <th style={{ color: themeColors.descriptionText, width: '30%'  }}>Name</th>
                                <th style={{ color: themeColors.descriptionText, width: '40%'  }}>Description</th>
                            </tr>

                        </thead>
                        <tbody>
                            {
                                categories.map(category => (
                                    <tr key={category.id}>
                                        <td>
                                            <input type='checkbox' style={{ backgroundColor: themeColors.backgroundHover, borderColor: themeColors.primary }} />
                                        </td>
                                        <td>{category.id}</td>
                                        <td><img src={import.meta.env.VITE_STORAGE_URL + category.image} height={40} width={40} /></td>
                                        <td>{category.name}</td>
                                        <td style={{ color: themeColors.descriptionText }}>{category.description}</td>
                                    </tr>
                                ))
                            }
                        </tbody>

                    </Table>



                </div>
            </div>
    )
}
