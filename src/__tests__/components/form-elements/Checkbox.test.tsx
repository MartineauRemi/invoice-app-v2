import { render, cleanup, screen } from '@testing-library/react'
import Checkbox from '../../../components/form-elements/Checkbox'
import ThemeProvider from '../../../contexts/ThemeProvider'

function renderCheckbox(id: string, name: string, onChange: any, checked: boolean){
    render(
        <ThemeProvider>
            <Checkbox id={id} name={name} onChange={onChange} checked={checked} />
        </ThemeProvider>
    )
}
describe('Testing Checkbox component', () => {
    const id = 'ID00'
    const name = 'react'
    const defaultFunction = () => {}

    var checkboxContainer: HTMLElement | null, checkboxInput: HTMLElement | null
    
    beforeEach(() => {
        renderCheckbox(id, name, defaultFunction, false)
        checkboxContainer = screen.getByTestId('checkbox-container')
        checkboxInput = checkboxContainer.querySelector('input[type="checkbox"]')
    })
    afterEach(() => cleanup())

    test('Renders without crashing', () => {
        expect(screen.getByTestId('checkbox-container')).toBeInTheDocument()
    })

    test('Checkbox has a checkbox element and an associated label', () => {        
        expect(checkboxInput).toBeInTheDocument()
        expect(checkboxInput).toHaveProperty('disabled', false)

        const checkboxLabel: HTMLElement | null = checkboxContainer ? checkboxContainer.querySelector(`label[for="${name}"]`): null
        expect(checkboxLabel).toHaveTextContent(name)
    })
})