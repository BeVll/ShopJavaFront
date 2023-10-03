import React from 'react'
import { useTheme } from '../../../context/ThemeContext';
import Dark from '../../../utils/Theme/Dark';
import Light from '../../../utils/Theme/Light';
import './TypeSearchButton.scss';


export default function TypeSearchButton({ onClick, activeTypeIndex, name, index }: { onClick: React.MouseEventHandler, activeTypeIndex: number, name: string, index:number }) {
    const { theme } = useTheme();
    const themeColors = theme == "dark" ? Dark : Light;

    return (
        <div className="typeSearchButton" onClick={onClick} style={{backgroundColor: themeColors.background}}>
            <div className="typeSearchItem"  style={{
                color: activeTypeIndex == index ? themeColors.mainText : themeColors.descriptionText,
                borderColor: activeTypeIndex == index ? themeColors.primary : themeColors.background
            }}>
                {name}
            </div>
        </div>
    )
}
