import React from 'react'
import { useThemeContext } from '../../contexts/ThemeProvider'
import { ThemeToggleButton } from '../../components/Buttons'

export default function Header() {
    const { toggleTheme } = useThemeContext()

    function onClickThemeToggleButton(){
        toggleTheme()
    }

    return (
        <div>
            <ThemeToggleButton onClick={onClickThemeToggleButton} />
        </div>
    )
}
