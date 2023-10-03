import React, { ChangeEvent, useState } from 'react';
import './SearchPage.scss';
import { useTheme } from '../../context/ThemeContext';
import Dark from '../../utils/Theme/Dark';
import Light from '../../utils/Theme/Light';
import Input from '../../components/input/Input';
import { ChevronLeft, Filter, Sliders2 } from 'react-bootstrap-icons';
import TypeSearchButton from '../../components/searchItems/typeSearch/TypeSearchButton';
import SearchService from '../../services/SearchService';
import { IUserProfile } from '../../utils/Types/user';
import ProfileSearchItem from '../../components/searchItems/profile/ProfileSearchItem';

export default function SearchPage() {
    const { theme } = useTheme();
    const themeColors = theme == "dark" ? Dark : Light;
    const [loadingProfile, setLoadingProfile] = useState<boolean>(true);
    const [typeIndex, setTypeIndex] = useState(0);
    const [profiles, setProfiles] = useState<IUserProfile[]>();

    const changeIndex = (index: number) => {
        setTypeIndex(index);
    }

    const loadResults = (query:string) => {
        if(typeIndex == 1){
            SearchService.getProfiles(query)
            .then((res) => {
                setProfiles(res.data);
            })
        }
    }

    const onChangeInput = (e:any) => {
        console.log(e.target.value);
        if(e.target.value){
            loadResults(e.target.value);
        }
        
    }

    return (
        <div className="searchPage">
            <div className='searchBlock' style={{ backgroundColor: themeColors.background }}>
                <div className="inputSearchBlock">
                    <button className='iconBtn' style={{ color: themeColors.mainText }}><ChevronLeft size={22} /></button>
                    <Input placeHolder='Search' onChange={onChangeInput} />
                    <button className='iconBtn' style={{ color: themeColors.mainText }}><Sliders2 size={22} /></button>
                </div>
                <div className='typesSearch'>
                    <TypeSearchButton onClick={() => changeIndex(0)} index={0} activeTypeIndex={typeIndex} name='Goods' />
                    <TypeSearchButton onClick={() => changeIndex(1)} index={1} activeTypeIndex={typeIndex} name='Categories' />
                    <TypeSearchButton onClick={() => changeIndex(2)} index={2} activeTypeIndex={typeIndex} name='Users' />
                    <TypeSearchButton onClick={() => changeIndex(3)} index={3} activeTypeIndex={typeIndex} name='Tags' />
                </div>
            </div>

            <div className="resultBlock" style={{ backgroundColor: themeColors.secondaryBackground }}>
                {
                    profiles?.map(p => (
                        <ProfileSearchItem key={p.id} profile={p}/>
                    ))
                }
            </div>
        </div>
    )
}
