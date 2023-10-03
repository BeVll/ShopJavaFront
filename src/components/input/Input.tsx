import React, { ChangeEventHandler } from 'react'
import { useTheme } from '../../context/ThemeContext';
import Dark from '../../utils/Theme/Dark';
import Light from '../../utils/Theme/Light';

export default function Input({ backgroundColor, borderColor, outlineColor, color, onChange, value, id, name, className, placeHolder, type, width }: { backgroundColor?: string, borderColor?: string, outlineColor?: string, color?: string, onChange?: ChangeEventHandler, value?:any, id?:string, name?:string, className?:string, placeHolder?:string, type?:string, width?:string|number }) {
    const { theme } = useTheme();
    const themeColors = theme == "dark" ? Dark : Light;

    return (
        <input type={type} id={id} name={name} className={className} value={value} onChange={onChange}  placeholder={placeHolder}
        style={{ 
            backgroundColor: backgroundColor ? backgroundColor : themeColors.backgroundHover, 
            borderColor: borderColor ? borderColor : themeColors.descriptionText,
            outlineColor: outlineColor ? outlineColor : themeColors.primary, 
            color: color ? color : themeColors.mainText, 
            width: width 
        }} />
    )
}
