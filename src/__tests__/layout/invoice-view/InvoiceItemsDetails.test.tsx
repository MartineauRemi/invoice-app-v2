import { render, cleanup, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import InvoiceItemsDetails from '../../../layout/invoice-view/InvoiceItemsDetails'
import invoices from '../../../data/invoices.json'
import ThemeProvider from '../../../contexts/ThemeProvider'
import Invoice from '../../../interfaces'

afterEach(cleanup)

const invoice = invoices[0]
const invoiceWithoutItems = {
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
    "items": [],
    "total": 0
  }

function renderInvoiceItemDetails(invoice: Invoice){
    render(
        <ThemeProvider>
            <InvoiceItemsDetails invoice={invoice}/>
        </ThemeProvider>
    )
}


describe('Testing InvoiceItemsDetails component', () => {
    test('Contains an ItemDetails component for every item in the list', () => {
        renderInvoiceItemDetails(invoice)
        const nbOfItems = invoice.items.length
        expect(document.getElementsByClassName('item-details')).toHaveLength(nbOfItems)
    })

    test('Displays the total amount of the invoice', () => {
        renderInvoiceItemDetails(invoice)
        expect(screen.getByTestId('grand-total')).toHaveTextContent(`$${invoice.total}`)
    })


    describe('Testing with an invoice with an empty items list', () => {
        beforeEach(() => renderInvoiceItemDetails(invoiceWithoutItems))

        test('Contains no ItemDetails component', () => {
            expect(document.getElementsByClassName('item-details')).toHaveLength(0)
        })
    
        test('Displays a total amount of $0', () => {
            expect(screen.getByTestId('grand-total')).toHaveTextContent('$0')
        })
    })
})