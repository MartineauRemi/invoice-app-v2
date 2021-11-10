import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import '@testing-library/jest-dom/extend-expect'
import ThemeProvider, { useThemeContext } from '../../contexts/ThemeProvider'

describe('Testing the theme context', () => {
    var wrapper;
    var result;

    beforeEach(() => {
        wrapper = ({children}) => <ThemeProvider>{children}</ThemeProvider>
        result = renderHook(() => useThemeContext(), {wrapper}).result
    })
    
    test('App renders with a default theme set to `light`', () => {
        expect(result.current.theme).toBe('light')
    })

    test('The theme toggles properly', () => {
        expect(result.current.theme).toBe('light')
        
        act(() => result.current.toggleTheme())
        expect(result.current.theme).toBe('dark')

        act(() => result.current.toggleTheme())
        expect(result.current.theme).toBe('light')

    })
})
