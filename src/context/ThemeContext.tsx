import React, { createContext, Component, useState, useEffect } from "react";

// import data files
import Dark from "../utils/Theme/Dark";
import Light from "../utils/Theme/Light";

interface ThemeContextProps {
    theme: string;
    setTheme(value:string): void,
    toggleTheme():void
  }
  const initialState:ThemeContextProps = {
    theme: "dark",
    setTheme: () => {},
    toggleTheme: () => {}
  }

export const ThemeContext = createContext<ThemeContextProps>(initialState);

const getTheme = () => {
    const theme = localStorage.getItem("theme");
    if (!theme) {
      // Default theme is taken as dark-theme
      localStorage.setItem("theme", "dark");
      return "dark";
    } else {
      return theme;
    }
  };

export default function ThemeContextProvider({children}:{children:any}) {
    const [theme, setTheme] = useState(getTheme);
    // state = {
    //     isLightTheme: true,
    //     dark: Dark,
    //     light: Light,
    // };
    function toggleTheme() {
        if (theme === "dark") {
          setTheme("light");
        } else {
          setTheme("dark");
        }
      };
    
      useEffect(() => {
        const refreshTheme = () => {
          localStorage.setItem("theme", theme);
        };
    
        refreshTheme();
      }, [theme]);
    
    // toggle current theme
    

    return (
        // pass state and fun to whole app
        <ThemeContext.Provider value={{
            theme,
            setTheme,
            toggleTheme,
          }}>
           {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => React.useContext(ThemeContext);