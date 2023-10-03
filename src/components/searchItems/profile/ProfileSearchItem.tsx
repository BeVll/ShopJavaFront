import React from 'react'
import './ProfileSearchItem.scss';
import { IUserProfile } from '../../../utils/Types/user';
import { useTheme } from '../../../context/ThemeContext';
import Dark from '../../../utils/Theme/Dark';
import Light from '../../../utils/Theme/Light';
import { Link } from 'react-router-dom';

export default function ProfileSearchItem({ profile }: { profile: IUserProfile }) {
    const { theme } = useTheme();
    const themeColors = theme == "dark" ? Dark : Light;

    return (
        <Link className='profileBlock' to={`/profile/${profile.id}`} style={{ backgroundColor: themeColors.background }}>
            <div className="dataAndAvatar">
                <div className="avaAndNicks">
                    <div className="ava" style={{ backgroundImage: profile?.image ? `url("${import.meta.env.VITE_STORAGE_URL + profile?.image}")` : "#fff", borderColor: themeColors.background, backgroundColor: themeColors.secondaryBackground }}></div>
                    <div className="nicks">
                        <div className="name" style={{ color: themeColors.mainText }}>
                            {profile.name}
                        </div>
                        <div className="username" style={{ color: themeColors.descriptionText }}>
                            @{profile.userName}
                        </div>
                    </div>
                </div>
                {
                    profile.description &&
                    <div className="description" style={{ color: themeColors.mainText }}>
                        {profile.description}
                    </div>
                }

            </div>
        </Link>
    )
}
