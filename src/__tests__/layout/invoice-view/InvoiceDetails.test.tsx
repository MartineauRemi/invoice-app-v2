import { render, cleanup, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import ThemeProvider from '../../../contexts/ThemeProvider'
import InvoiceDetails from '../../../layout/invoice-view/InvoiceDetails'
import { dateFormat } from '../../../helpers/date'


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


afterEach(cleanup)

describe('Testing INvoiceDetails component', () => {
    test('Displays all the invoice\'s data', () => {
        render(
            <ThemeProvider>
                <InvoiceDetails invoice={invoice} />
            </ThemeProvider>
        )

        const invoiceDetails = screen.getByTestId('invoice-details')

        //invoice's main infos are displayed
        expect(invoiceDetails).toHaveTextContent(`#${invoice.id}`)
        expect(invoiceDetails).toHaveTextContent(`${invoice.description}`)

        //invoice's dates are displayed
        const formatedPaymentDeadline = dateFormat(invoice.paymentDue)
        const formatedDateOfCreation = dateFormat(invoice.createdAt)
        
        expect(invoiceDetails).toHaveTextContent(formatedPaymentDeadline)
        expect(invoiceDetails).toHaveTextContent(formatedDateOfCreation)
        
        //sender's address is displayed
        expect(invoiceDetails).toHaveTextContent(`${invoice.sender.address.street}`)
        expect(invoiceDetails).toHaveTextContent(`${invoice.sender.address.city}`)
        expect(invoiceDetails).toHaveTextContent(`${invoice.sender.address.postCode}`)
        expect(invoiceDetails).toHaveTextContent(`${invoice.sender.address.country}`)

        //client's infos are displayed
        expect(invoiceDetails).toHaveTextContent(`${invoice.client.name}`)
        expect(invoiceDetails).toHaveTextContent(`${invoice.client.email}`)
        expect(invoiceDetails).toHaveTextContent(`${invoice.client.address.street}`)
        expect(invoiceDetails).toHaveTextContent(`${invoice.client.address.city}`)
        expect(invoiceDetails).toHaveTextContent(`${invoice.client.address.postCode}`)
        expect(invoiceDetails).toHaveTextContent(`${invoice.client.address.country}`)


        //invoice's items data are displayed
        const invoiceItemsDetails = screen.getByTestId('invoice-items-details')
        expect(invoiceItemsDetails).toBeInTheDocument()
    })
})