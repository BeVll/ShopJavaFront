import React, { createContext, useEffect, useState } from 'react'
import English from '../utils/Languages/English';
import Ukrainian from '../utils/Languages/Ukrainian';
import { ILanguage } from '../utils/Types/language';

interface LanguageContextProps {
    language: string;
    setLanguage(value:string): void,
    changeLanguage(value:string):void,
    languageItem:ILanguage
  }
  const initialState:LanguageContextProps = {
    language: "ukrainian",
    setLanguage: () => {},
    changeLanguage: () => {},
    languageItem: Ukrainian
  }

export const LanguageContext = createContext<LanguageContextProps>(initialState);

const getLanguage2 = () => {
    const language = localStorage.getItem("language");
    if (!language) {
      // Default theme is taken as dark-theme
      localStorage.setItem("language", "ukrainian");
      return "ukrainian";
    } else {
      return language;
    }
  };

export default function LanguageContextProvider({children}:{children:any}) {
    const [language, setLanguage] = useState<string>(getLanguage2);
    const [languageItem, setLanguageItem] = useState<ILanguage>(Ukrainian);
    const english = English;
    const ukrainian = Ukrainian;
    const _language = window.localStorage.getItem("language");

    useEffect(() => {
        console.log(_language);
        if (_language == "english") {
            setLanguage("English");
            setLanguageItem(English);
        }
        if (_language == "ukrainian") {
            setLanguage("Ukrainian");
            setLanguageItem(Ukrainian);
        }

        return () => {

        }
    }, [])

    const changeLanguage = (lang:string) => {

        if (lang == "english") {
            setLanguage("English");
            setLanguageItem(English);
            window.localStorage.setItem("language", "english");
        }
        else if (lang == "ukrainian") {
            setLanguage("Ukrainian");
            setLanguageItem(Ukrainian);
            window.localStorage.setItem("language", "ukrainian");
        }
    };

    return (
        <LanguageContext.Provider value={{
            language,
            languageItem,
            setLanguage,
            changeLanguage
        }}>
            {children}
        </LanguageContext.Provider>
    )
}

export const useLanguage = () => React.useContext(LanguageContext);