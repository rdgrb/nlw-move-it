import { createContext, useEffect, useState } from "react";
import { lightTheme, darkTheme } from "../styles/themes";

interface Theme {
    title: string;
    colors: object;
}

interface ThemeContextValues {
    theme: Theme;
    changeTheme: () => void;
}

export const ThemeContext = createContext({} as ThemeContextValues);

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState({ title: "light", colors: lightTheme });

    function changeTheme() {
        theme.title === "light" ? 
            setTheme({ title: "dark", colors: darkTheme }) : 
            setTheme({ title: "light", colors: lightTheme });
    }

    useEffect(() => {
        Object.entries(theme.colors).forEach(([key, value]) => {
            document.documentElement.style.setProperty(`--${key}`, value.toString());
        });
    }, [theme])

    return (
        <ThemeContext.Provider 
            value={{
                theme, changeTheme
            }}
        >
            { children }
        </ThemeContext.Provider>
    )

}