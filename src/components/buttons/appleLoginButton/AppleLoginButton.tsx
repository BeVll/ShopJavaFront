import React from 'react'
import './AppleLoginButton.css';
import { Apple } from 'react-bootstrap-icons';

export default function AppleLoginButton({backgroundColor = "#121111", size = "45px", sizeIcon = "20px", colorIcon = "#fff"} : {backgroundColor?:string, size?:string, sizeIcon?:string, colorIcon?:string}) {
  return (
    <div className='AppleLoginBtn' style={{backgroundColor: backgroundColor, height: size, width: size}}>
        <Apple size={sizeIcon} color={colorIcon} />
    </div>
  )
}
