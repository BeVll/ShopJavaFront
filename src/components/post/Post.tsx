import React, { useEffect, useState } from 'react'
import './Post.scss';
import { Bookmark, Chat, Heart, Send, ThreeDots } from 'react-bootstrap-icons';
import { useTheme } from '../../context/ThemeContext';
import Dark from '../../utils/Theme/Dark';
import Light from '../../utils/Theme/Light';
import { IPostModel } from '../../utils/Types/post';

export default function Post({ post }: { post: IPostModel }) {
    const { theme, toggleTheme } = useTheme();
    const themeColors = theme == "dark" ? Dark : Light;
    const [text, setText] = useState<string>(post.postText);

    function replacer(match:any, p1:any, p2:any, p3:any, offset:any, string:any) {
        // p1 is non-digits, p2 digits, and p3 non-alphanumerics
        console.log(match, p1, p2, p3, offset, string);
        return `${p1}<a class="tag" style="color: ${themeColors.primary}">${p2}</a>`;
      }

    useEffect(() => {
        // post.postText.matchAll(new RegExp(" (#\w+)+")
            let textTmp = post.postText;
            textTmp = textTmp.replace(/(^|[\s\W])(#\w+)/g, replacer);
            
            setText(textTmp);
        return () => {

        }
    }, [])


    return (
        <div className='post' style={{ backgroundColor: themeColors.background, borderColor: themeColors.secondaryBackground }}>
            <div className="postContent">
                {/* <div className="images">
                    <img src="https://storage.googleapis.com/fladeup_storage/images/ezuv3rh2.trt.jpg" alt="" className="image" />
                </div> */}
                <div className="userAndComments">
                    <div className="postHeader">
                        <div className="dataUser">
                            <div className="avatar" style={{ backgroundImage: `url("${import.meta.env.VITE_STORAGE_URL + post.user?.image}"` }}></div>
                            <div className="nicks">
                                <span className="nameTime">
                                    <span className="name" style={{ color: themeColors.mainText }}>
                                        {post.user.name}
                                    </span>
                                    <span className="time" style={{ color: themeColors.descriptionText }}>
                                        • 15h
                                    </span>
                                </span>
                                <span className="userNick" style={{ color: themeColors.descriptionText }}>@{post.user.userName}</span>
                            </div>
                        </div>
                        <div className="menu">
                            <ThreeDots fontSize={25} color={themeColors.mainText} />
                        </div>
                    </div>
                    {text &&
                        <div className="text" style={{ color: themeColors.mainText }} dangerouslySetInnerHTML={{ __html: text }}></div>
                    }

                </div>
            </div>
            {/* <div className="line" style={{ backgroundColor: themeColors.mainText }}></div> */}
            <div className="actions" >
                <div className="action">
                    <Heart height={15} color={themeColors.descriptionText} />
                    <span className='count' style={{ color: themeColors.descriptionText }}>2.3K Like</span>
                </div>
                <div className="action">
                    <Chat height={15} color={themeColors.descriptionText} />
                    <span className='count' style={{ color: themeColors.descriptionText }}>175 Comment</span>
                </div>
                <div className="action">
                    <Send height={15} color={themeColors.descriptionText} />
                    <span className='count' style={{ color: themeColors.descriptionText }}>125 Share</span>
                </div>
                <div className="action">
                    <Bookmark height={15} color={themeColors.descriptionText} />
                    <span className='count' style={{ color: themeColors.descriptionText }}>8 Save</span>
                </div>
            </div>
        </div>
    )
}
