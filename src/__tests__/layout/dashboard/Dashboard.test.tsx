import { render, cleanup, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import App from '../../../App'

afterEach(() => cleanup())

beforeEach(() => render(<App />))

describe('Testing Dashboard component', () => {
    test('Renders without crashing', () => {
        expect(screen.getByTestId('dashboard')).toBeInTheDocument()
    })

    test('Dashboard contains InvoiceFilter, NewInvoiceButton and DashboardInfos components', () => {
        const invoicesFilter = screen.getByTestId('invoice-filter')
        const newInvoiceButton = screen.getByTestId('new-invoice-button')
        const dashboardInfos = screen.getByTestId('dashboard-infos')
        
        expect(invoicesFilter).toBeInTheDocument()
        expect(newInvoiceButton).toBeInTheDocument()
        expect(dashboardInfos).toBeInTheDocument()
    })

    describe('Testing InvoicesShortsList behavior inside the Dashboard component', () => {        
        test('Dashboard contains a InvoicesShortsList component if the list of invoices is not empty', () => {            
            const invoicesList = screen.getByTestId('invoices-shorts-list')
            expect(invoicesList).toBeInTheDocument()
            expect(invoicesList.getElementsByClassName('invoice-short').length > 0).toBeTruthy()
        })

        test('Cliking on an InvoiceShort targets InvoiceDetails component to render with the corresponding invoice as a prop', async() => {
            const invoicesShortsList = screen.getByTestId('invoices-shorts-list')
            const firstShort = invoicesShortsList.getElementsByClassName('invoice-short')[0]
            var idAttr = firstShort.getAttribute('id')
            idAttr = idAttr !== null && idAttr !== '' ? idAttr : ''
            fireEvent.click(firstShort)
            expect(screen.queryByTestId('invoices-shorts-list')).toBeNull()
            
            const invoiceDetails = screen.getByTestId('invoice-details')
            expect(invoiceDetails).toBeInTheDocument()
            expect(invoiceDetails).toHaveTextContent(idAttr)
        })
    })

    describe('Testing the NewInvoiceButton from Dashboard', () => {
        test('Dashboard contains a NewInvoiceButton', () =>{
            const newInvoiceButton = screen.getByTestId('dashboard').getElementsByClassName('new-invoice-button')[0]
            expect(newInvoiceButton).toBeInTheDocument()
        })

        test('Clicking on NewInvoiceButton reveals InvoiceForm component', async () => {
            const newInvoiceButton = screen.getByTestId('dashboard').getElementsByClassName('new-invoice-button')[0]
            expect(screen.queryByTestId('invoice-form')).toBeNull()
            fireEvent.click(newInvoiceButton)
            await waitFor(() => expect(screen.getByTestId('invoice-form')).toBeInTheDocument())
        })
    })
})