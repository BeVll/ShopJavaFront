import React, { useEffect, useState } from 'react'
import './ConfirmEmail.css'
import { useTheme } from '../../context/ThemeContext';
import Dark from '../../utils/Theme/Dark';
import Light from '../../utils/Theme/Light';
import { useParams, useSearchParams } from 'react-router-dom';
import UserService from '../../services/UserService';
import { IConfirmEmail } from '../../utils/Types/auth';

export default function ConfirmEmail(props:any) {
    const { theme } = useTheme();
    const themeColors = theme == "dark" ? Dark : Light;
    const [searchParams] = useSearchParams();
    const [token, setToken] = useState();
    const [loading, setLoading] = useState<boolean>(true);
    const [errorMessage, setError] = useState<string>("");
    const [confirmed, setConfirmed] = useState<boolean>(false);
    const { id } = useParams();
    const searchParams2 = new URLSearchParams(document.location.search);

    useEffect(() => {
        const tokenTmp = searchParams.get("token");
        
        console.log(searchParams2.get("token"));
        if (tokenTmp && id) {
            setLoading(true);
            const data:IConfirmEmail = {
                id: parseInt(id),
                token: tokenTmp.toString()
            }
            UserService.confirmEmail(data)
                .then(res => {
                    setConfirmed(true);
                    setLoading(false);

                })
                .catch((error:any) => {
                    setError(error.toString());
                    console.log("error");
                })
        }

        return () => {

        }
    }, [])


    return (
        <div className='confirmPage' style={{ backgroundColor: themeColors.background }}>
            {confirmed &&
                <div className="confirmed" style={{color: themeColors.mainText}}>
                    Successfully verified!
                </div>
            }
            <div className="error">
                {errorMessage}
            </div>
        </div>
    )
}
