import React from 'react'
import Dark from '../../utils/Theme/Dark';
import Light from '../../utils/Theme/Light';
import { useTheme } from '../../context/ThemeContext';
import './Home.scss';
import Story from '../../components/story/Story';
import Post from '../../components/post/Post';

export default function Home() {
    const { theme } = useTheme();
    const themeColors = theme == "dark" ? Dark : Light;
    document.title = "Home | FladeUp"
  return (
    <div className='homePage'>
        <div className='storiesBlock' style={{backgroundColor: themeColors.background}}>
            {/* <h1 className='nameBlock' style={{color: themeColors.mainText}}>Stories</h1> */}
            
        </div>
        <div className="postsBlock" >

        </div>
    </div>
  )
}
