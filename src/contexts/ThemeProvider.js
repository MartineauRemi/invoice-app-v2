import React, { useState, useContext } from 'react'

const ThemeContext = React.createContext()
export function useThemeContext(){
    return useContext(ThemeContext)
}

export default function ThemeProvider({children}){
    const [theme, setTheme] = useState('light')
    function toggleTheme(){
        setTheme(theme === 'light'
            ? 'dark'
            : 'light'
        )
    }
    return(
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

