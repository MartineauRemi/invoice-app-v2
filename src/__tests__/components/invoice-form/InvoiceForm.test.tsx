import { render, cleanup, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import App from '../../../App'
import { dateFormat } from '../../../helpers/date'
import { PaymentsTermsEnum } from '../../../interfaces'

const invoice = {
    "id": "RT3080",
    "createdAt": "2021-08-18",
    "paymentDue": "2021-08-19",
    "description": "Re-branding",
    "paymentsTerms": 1,
    "client": {
        "name": "Jensen Huang",
        "email": "jensenh@mail.com",
        "address" : {
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
  
beforeEach(() => {
    render(<App />)
    fireEvent.click(screen.getByTestId('new-invoice-button'))
})

afterEach(cleanup)

describe('Testing InvoiceForm component', () => {
    describe('Testing InvoiceForm component to create a new invoice', () => {
        
        test('Clicking on GoBackButton component makes the InvoiceForm to disappear', () => {
            expect(screen.getByTestId('invoice-form')).toBeInTheDocument()
            
            fireEvent.click(screen.getByTestId('go-back-button'))
            expect(screen.queryByTestId('invoice-form')).toBeNull()
        })

        test('All text inputs are set to an empty string', () => {
            const form = screen.getByTestId('invoice-form')
            const textInputs = form.querySelectorAll('input[type="text"]')
            
            textInputs.forEach(input => expect(input).toHaveProperty('value', ''))
        })

        test('Date picker input is set to the current date by default', () => {
            const formatedDate = dateFormat(new Date())
            expect(screen.getByTestId('date-picker')).toHaveTextContent(formatedDate)
        })

        test('Payment terms input is set to "Net 30 days" by default', () => {
            expect(screen.getByTestId('payments-terms-toggle-button')).toHaveDisplayValue(`Net ${PaymentsTermsEnum.OneMonth} days`)
        })

        test('There is no invoice\'s item fieldset by default', () => {
            expect(screen.queryAllByTestId('invoice-form-item-fieldset')).toHaveLength(0)
        })

        test('Clicking on "Add an item" button adds an item fieldset to the form', () => {
            expect(screen.queryAllByTestId('invoice-form-item-fieldset')).toHaveLength(0)

            fireEvent.click(screen.getByRole('button', {name: /\+ add new item/i}))
            expect(screen.getByTestId('invoice-form-item-fieldset')).toBeInTheDocument()
            expect(screen.queryAllByTestId('invoice-form-item-fieldset')).toHaveLength(1)

            fireEvent.click(screen.getByRole('button', {name: /\+ add new item/i}))
            expect(screen.queryAllByTestId('invoice-form-item-fieldset')).toHaveLength(2)
        })

        test('Contains a "Discard" button that closes the form when clicked', () => {
            const discardButton = screen.getByRole('button', {name: /discard/i})
            expect(discardButton).toBeInTheDocument()
            fireEvent.click(discardButton)
            expect(screen.queryByTestId('invoice-form')).toBeNull()
        })


        //a terminer
        test('Contains a "Save as Draft" button that adds saves the new invoice with a status set to "Draft"', () => {
            expect(screen.getByRole('button', {name: /save as draft/i})).toBeInTheDocument()
        })

        //a terminer
        test('Contains a "Save & Send" button', () => {
            expect(screen.getByRole('button', {name: /save & send/i})).toBeInTheDocument()  
        })
    })
})