import React, { MouseEventHandler } from 'react'

import './ModalFladeUp.scss';
import { useTheme } from '../../context/ThemeContext';
import Dark from '../../utils/Theme/Dark';
import Light from '../../utils/Theme/Light';
import { XLg } from 'react-bootstrap-icons';

export default function ModalFladeUp({isOpen = false, onHide, children} : {isOpen:boolean, onHide:MouseEventHandler, children:any}) {
    const { theme } = useTheme();
    const themeColors = theme == "dark" ? Dark : Light;

    

  return (
    isOpen 
    &&
    <div className='modalWrap'>
        <div className="modalDialog" style={{backgroundColor: themeColors.background}}>
            <div className="modalHeader" style={{borderColor: themeColors.descriptionText}}>
                <div></div>
                <div className="modalTitle" style={{color: themeColors.mainText}}>Create post</div>
                <div className="closeBtn" onClick={onHide}>
                    <XLg size={20} color={themeColors.mainText}/>
                </div>
            </div>
            <div className="modalContent">
                {children}
            </div>
        </div>

        <div className="bg" style={{backgroundColor: themeColors.backgroungBody}}> </div>
    </div>
  )
}
