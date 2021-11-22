import { render, cleanup, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import InvoiceShort from '../../../components/invoice/InvoiceShort'
import ThemeProvider from '../../../contexts/ThemeProvider'
import Invoice from '../../../interfaces'

const invoiceData: Invoice =    {
    "id": "RT3080",
    "createdAt": "2021-08-18",
    "paymentDue": "2021-08-19",
    "description": "Re-branding",
    "paymentsTerms": 1,
    "clientsName": "Jensen Huang",
    "clientsEmail": "jensenh@mail.com",
    "status": "paid",
    "sendersAddress": {
      "street": "19 Union Terrace",
      "city": "London",
      "postCode": "E1 3EZ",
      "country": "United Kingdom"
    },
    "clientsAddress": {
      "street": "106 Kendell Street",
      "city": "Sharrington",
      "postCode": "NR24 5WQ",
      "country": "United Kingdom"
    },
    "items": [
      {
        "name": "Brand Guidelines",
        "quantity": 1,
        "price": 1800.90,
        "total": 1800.90
      }
    ],
    "total": 1800.90
  }

function renderInvoiceShort(invoice: Invoice){
    render(
        <ThemeProvider>
            <InvoiceShort invoice={invoice} setSelectedInvoice={() => {}}/>
        </ThemeProvider>
    )
}

describe('Testing InvoiceShort component', () => {
    var short: HTMLElement;

    afterEach(() => cleanup())
    beforeEach(() => {
        renderInvoiceShort(invoiceData)
        short = screen.getByTestId('invoice-short')
    })

    test('Renders without crashing', () => {
        expect(short).toBeInTheDocument()
    })

    test('Displays the invoice\'s ID, client\'s name, total of invoice', () => {
        expect(short).toHaveTextContent(invoiceData.id)
        expect(short).toHaveTextContent(invoiceData.clientsName)
        expect(short).toHaveTextContent("$" + invoiceData.total)
    })

    test('Displays the date to the correct format', () => {
        const invoiceShortDateRegex = new RegExp(/^Due ([0-2][1-9]|3[01]) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) 20[2-9][0-9]$/)
        
        const date = screen.getByTestId('date')
        const dateTextContent = date.textContent ? date.textContent : ''
        expect(date.parentNode).toBe(short)
        expect(invoiceShortDateRegex.test(dateTextContent)).toBeTruthy()
    })
})