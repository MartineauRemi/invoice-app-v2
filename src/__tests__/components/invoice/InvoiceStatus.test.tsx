import { render, cleanup, screen, RenderResult } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import InvoiceStatus from '../../../components/invoice/InvoiceStatus'
import ThemeProvider from '../../../contexts/ThemeProvider'
import { ReactElement, ReactNode } from 'react'


afterEach(() => cleanup())

function InvoiceStatusWithTheme({status}: {status:string}): ReactElement{
    return (
        <ThemeProvider>
            <InvoiceStatus status={status}/>
        </ThemeProvider>
    )
}

function renderInvoiceStatus(status: string): RenderResult{
    return render(<InvoiceStatusWithTheme status={status} />)
}

describe('Testing the InvoiceStatus component', () => {
    var statusElt: ReactNode;
    
    test('Renders without crashing', () => {
        renderInvoiceStatus('')
        statusElt = screen.getByTestId('invoice-status')
        expect(statusElt).toBeInTheDocument()
    })

    test('InvoiceStatus has a status set to "draft" when given an empty string as status prop', () => {
        renderInvoiceStatus('')
        statusElt = screen.getByTestId('invoice-status')
        expect(statusElt).toHaveTextContent('draft')
    })

    test('InvoiceStatus displays the correct status value', () => {
        const { rerender } = renderInvoiceStatus('paid')
        statusElt = screen.getByTestId('invoice-status')
        expect(statusElt).toHaveTextContent('paid')
        
        rerender(<InvoiceStatusWithTheme status='draft'/>)
        expect(statusElt).toHaveTextContent('draft')

        rerender(<InvoiceStatusWithTheme status='pending'/>)
        expect(statusElt).toHaveTextContent('pending')

        rerender(<InvoiceStatusWithTheme status='foobar'/>)
        expect(statusElt).toHaveTextContent('draft')
    })
})