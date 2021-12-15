import { render, cleanup , screen, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import ThemeProvider from '../../../contexts/ThemeProvider'
import InvoiceView from '../../../layout/invoice-view/InvoiceView'
import Invoice from '../../../interfaces'
import App from '../../../App'

const invoice = {
    "id": "RT3080",
    "createdAt": "2021-08-18",
    "paymentDue": "2021-08-19",
    "description": "Re-branding",
    "paymentsTerms": 1,
    "client": {
      "name": "Jensen Huang",
      "email": "jensenh@mail.com",
      "address": {
        "street": "106 Kendell Street",
        "city": "Sharrington",
        "postCode": "NR24 5WQ",
        "country": "United Kingdom"
      }
    },
    "status": "paid",
    "sender": {
      "address": {
        "street": "19 Union Terrace",
        "city": "London",
        "postCode": "E1 3EZ",
        "country": "United Kingdom"
      }
    },
    "items": [
      {
        "id": "AA001",
        "name": "Brand Guidelines",
        "quantity": 1,
        "price": 1800.90,
        "total": 1800.90
      }
    ],
    "total": 1800.90
  }

const setInvoiceFormActive = jest.fn()
const setSelectedInvoice = jest.fn()
const setDeleteInvoiceModalActive = jest.fn()

function renderInvoiceView(invoice: Invoice) {
    render(
        <ThemeProvider>
            <InvoiceView 
                invoice={invoice}
                setInvoiceFormActive={setInvoiceFormActive}
                setSelectedInvoice={setSelectedInvoice}
                setDeleteInvoiceModalActive={setDeleteInvoiceModalActive}
            />        
        </ThemeProvider>
    )
}

afterEach(cleanup)

describe('Testing InvoiceView component', () => {
    test('Contains a "Go Back" button, an InvoiceViewControlPannel component and an InvoiceDetails component', () => {
        renderInvoiceView(invoice)
        expect(screen.getByRole('button', {name: /go back/i})).toBeInTheDocument()
        expect(screen.getByTestId('invoice-view-control-pannel')).toBeInTheDocument()
        expect(screen.getByTestId('invoice-details')).toBeInTheDocument()
    })

    describe('Testing InvoiceView behavior', () => {        
        test('InvoiceView component isn\'t in the document initially, but is rendered when clicking on an InvoiceShort component', () => {
            render(<App />)
            const dashboardElt = screen.getByTestId('dashboard')
            expect(dashboardElt).toBeInTheDocument()
            expect(screen.queryByTestId('invoice-view')).toBeNull()

            const invoiceShorts = dashboardElt.getElementsByClassName('invoice-short')
            const firstInvoiceShort = invoiceShorts[0]
            fireEvent.click(firstInvoiceShort)
            expect(dashboardElt).not.toBeInTheDocument()
            expect(screen.getByTestId('invoice-view')).toBeInTheDocument()
        })

        //render the app and simulate a click on the first InvoiceShort component
        //to display InvoiceView component
        test('Switch from InvoiceView to Dashboard when clicking on "Go back" button', () => {
            render(<App />)
            fireEvent.click(screen.getAllByTestId('invoice-short')[0])
            fireEvent.click(screen.getByRole('button', {name: /go back/i}))
            expect(screen.queryByTestId('invoice-view')).toBeNull()
            expect(screen.getByTestId('dashboard')).toBeInTheDocument()
        })

        test('Testing to delete an invoice', () => {
            render(<App />)
            const initialNbOfShorts = document.getElementsByClassName('invoice-short').length
            const firstInvoiceShort = screen.getAllByTestId('invoice-short')[0]
            
            var firstInvoiceId = screen.getAllByTestId('invoice-short-id')[0].textContent
            firstInvoiceId = firstInvoiceId ? firstInvoiceId : ''

            fireEvent.click(firstInvoiceShort)

            //clicking on the "delete" button from the InvoiceView component
            fireEvent.click(screen.getByRole('button', {name: /delete/i}))

            //clicking on the "delete" button from the DeleteInvoiceModal component
            fireEvent.click(screen.getByTestId('confirm-deletion-button'))
            
            const updatedShorts = document.getElementsByClassName('invoice-short')
            expect(updatedShorts).toHaveLength(initialNbOfShorts - 1)

            const ids = Array(screen.getAllByTestId('invoice-short-id'))
            expect(ids).not.toContain(firstInvoiceId)
        })

        test('Clicking on "Edit" button opens an InvoiceForm component', () => {
            render(<App />)
            expect(screen.queryByTestId('invoice-form')).toBeNull()

            fireEvent.click(screen.getAllByTestId('invoice-short')[0])
            fireEvent.click(screen.getByRole('button', {name: /edit/i}))

            expect(screen.queryByTestId('invoice-form')).toBeInTheDocument()
        })

        test('Testing changing status from "pending" to "paid', () => {
            render(<App />)
            fireEvent.click(screen.getAllByTestId('invoice-short')[1])
            expect(screen.getByTestId('invoice-status')).toHaveTextContent(/pending/i)

            fireEvent.click(screen.getByRole('button', {name: /mark as paid/i}))
            expect(screen.getByTestId('invoice-status')).toHaveTextContent(/paid/i)

        })
    })
})