import { render, cleanup, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import InvoiceForm from '../../../components/invoice-form/InvoiceForm'
import ThemeProvider from '../../../contexts/ThemeProvider'


describe('Testing PaymentsTerms component', () => {
    afterEach(cleanup)

    beforeEach(() => {
        render(
            <ThemeProvider>
                <InvoiceForm selectedInvoice={null} setInvoiceFormActive={() => {}}/>
            </ThemeProvider>
        )
    })

    test('PaymentsTerms contains a button displaying the selected payments terms', () => {
        expect(screen.getByTestId('payments-terms-toggle-button')).toHaveTextContent('Net 30 days')
    })

    test('Clicking on the payments term button makes the PaymentsTerms radio inputs appear/disappear', () => {
        const button = screen.getByTestId('payments-terms-toggle-button')
    })

    test('PaymentsTerms has 4 radio buttons with values "1", "7", "15" and "30". The radio button with value "30" is checked by default', () => {  
        const paymentsTermsInputs = screen.getByTestId('invoice-form').querySelectorAll('input[name="payments-terms"]')
        expect(paymentsTermsInputs[0]).toHaveProperty('value', "1")
        expect(paymentsTermsInputs[1]).toHaveProperty('value', "7")
        expect(paymentsTermsInputs[2]).toHaveProperty('value', "15")
        expect(paymentsTermsInputs[3]).toHaveProperty('value', "30")

        expect(paymentsTermsInputs[3]).toHaveProperty('checked', true)
    })

    test('Clicking on a non-checked radio input checks it and changes the selected terms, and makes the inputs disappear', () => {
        var paymentsTermsInputs = screen.getByTestId('invoice-form').querySelectorAll('input[name="payments-terms"]')
        const button = screen.getByTestId('payments-terms-toggle-button')
        
        fireEvent.click(button)
        paymentsTermsInputs = screen.getByTestId('invoice-form').querySelectorAll('input[name="payments-terms"]')
        fireEvent.click(paymentsTermsInputs[0])
        expect(button).toHaveTextContent('Net 1 days')

        fireEvent.click(button)
        paymentsTermsInputs = screen.getByTestId('invoice-form').querySelectorAll('input[name="payments-terms"]')
        fireEvent.click(paymentsTermsInputs[1])
        expect(button).toHaveTextContent('Net 7 days')

        fireEvent.click(button)
        paymentsTermsInputs = screen.getByTestId('invoice-form').querySelectorAll('input[name="payments-terms"]')
        fireEvent.click(paymentsTermsInputs[2])
        expect(button).toHaveTextContent('Net 15 days')

        fireEvent.click(button)
        paymentsTermsInputs = screen.getByTestId('invoice-form').querySelectorAll('input[name="payments-terms"]')
        fireEvent.click(paymentsTermsInputs[3])
        expect(button).toHaveTextContent('Net 30 days')
    })
})