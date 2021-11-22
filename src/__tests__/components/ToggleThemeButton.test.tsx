import { render, fireEvent, cleanup, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import App from '../../App'
import sunIcon from '../../assets/icon-sun.svg'
import moonIcon from '../../assets/icon-moon.svg'

afterEach(() => cleanup())

describe('Testing the theme toggle button', () => {
    var button: HTMLElement;

    beforeEach(() => {
        render(<App />)
        button = screen.getByTestId('theme-toggle-button')
    })

    test('Renders without crashing', () => {
        expect(button).toBeInTheDocument()
    })

    test('Toggles the theme when clicked', () => {
        expect(button).toHaveClass('theme-toggle-button--light')
        
        fireEvent.click(button)
        expect(button).toHaveClass('theme-toggle-button--dark')

        fireEvent.click(button)
        expect(button).toHaveClass('theme-toggle-button--light')
    })



    describe('Testing the theme toggle button icons', () => {
        var icon: HTMLImageElement | null;
        beforeEach(() => {
            icon = button.querySelector('img')
        })

        test('Renders with a moon icon when light theme is active', () => {
            expect(icon).toHaveAttribute('src', moonIcon)
        })
    
        test('Renders with a sun icon when dark theme is active', () => {
            fireEvent.click(button)
            expect(icon).toHaveAttribute('src', sunIcon)
        })
    })
})
