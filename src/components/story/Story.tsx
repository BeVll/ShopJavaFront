import React from 'react'

import './Story.scss';
import { useTheme } from '../../context/ThemeContext';
import Dark from '../../utils/Theme/Dark';
import Light from '../../utils/Theme/Light';

export default function Story() {
    const { theme, toggleTheme } = useTheme();
    const themeColors = theme == "dark" ? Dark : Light;

    return (
        <div className="storyComponent">
            <div className='storyBorder'>
                <div className="story" style={{ border: `2px solid ${themeColors.background}` }}>
                    <div className='filterBlock'></div>
                </div>
                <span className='userName' style={{color: Dark.mainText}}>
                    b.e.e.v.l
                </span>
            </div>
        </div>

    )
}
