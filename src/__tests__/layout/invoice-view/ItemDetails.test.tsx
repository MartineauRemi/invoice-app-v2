import { render, cleanup, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import ItemDetails from '../../../layout/invoice-view/ItemDetails'
import ThemeProvider from '../../../contexts/ThemeProvider'

const item1 = {
    id: 'AA001',
    name: 'Rebranding',
    quantity: 2,
    price: 1000,
    total: 2000
}

const item2 = {
    id: 'AA002',
    name: 'Application Mockup',
    quantity: 1,
    price: 700,
    total: 700
}

afterEach(cleanup)

describe('Testing ItemDetails component' , () => {    
    test('Displays item\'s name, quantity, price and total props', () => {
        const {rerender} = render(
            <ThemeProvider>
                <ItemDetails item={item1}/>
            </ThemeProvider>
        )
        expect(screen.getByText(item1.name)).toBeInTheDocument()
        expect(screen.getByText(`${item1.quantity} x $${item1.price}`)).toBeInTheDocument()        
        expect(screen.getByText(`$${item1.total}`)).toBeInTheDocument()

        rerender(
            <ThemeProvider>
                <ItemDetails item={item2}/>
            </ThemeProvider>
        )
        
        expect(screen.getByText(item2.name)).toBeInTheDocument()
        expect(screen.getByText(`${item2.quantity} x $${item2.price}`)).toBeInTheDocument()        
        expect(screen.getByText(`$${item2.total}`)).toBeInTheDocument()      
    })
})