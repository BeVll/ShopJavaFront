import React from 'react'
import './GitHubLoginButton.css';
import { Github } from 'react-bootstrap-icons';

export default function GitHubLoginButton({backgroundColor, size = "45px", sizeIcon = "20px", colorIcon = "#fff"} : {backgroundColor?:string, size?:string, sizeIcon?:string, colorIcon?:string}) {
  return (
    <div className='GitHubloginBtn' style={{backgroundColor: backgroundColor, height: size, width: size}}>
        <Github size={sizeIcon} color={colorIcon}/>
    </div>
  )
}
