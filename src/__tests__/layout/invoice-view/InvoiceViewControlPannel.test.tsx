import { render, cleanup, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import ThemeProvider from '../../../contexts/ThemeProvider'
import InvoiceViewControlPannel from '../../../layout/invoice-view/InvoiceViewControlPannel'
import Invoice from '../../../interfaces'

const invoiceWithPaidStatus = {
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

const invoiceWithPendingStatus = 
{
    "id": "XM9141",
    "createdAt": "2021-08-21",
    "paymentDue": "2021-09-20",
    "description": "Graphic Design",
    "paymentsTerms": 30,
    "status": "pending",
    "sender": {
      "address": {
        "street": "19 Union Terrace",
        "city": "London",
        "postCode": "E1 3EZ",
        "country": "United Kingdom"
      }
    },
    "client": {
      "name": "Alex Grim",
      "email": "alexgrim@mail.com",
      "address": {
        "street": "84 Church Way",
        "city": "Bradford",
        "postCode": "BD1 9PB",
        "country": "United Kingdom"
      }
    },
    "items": [
      {
        "id": "AA002",
        "name": "Banner Design",
        "quantity": 1,
        "price": 156.00,
        "total": 156.00
      },
      {
        "id": "AA003",
        "name": "Email Design",
        "quantity": 2,
        "price": 200.00,
        "total": 400.00
      }
    ],
    "total": 556.00
  }
  
const invoiceWithDraftStatus = 
{
    "id": "RT2080",
    "createdAt": "2021-10-11",
    "paymentDue": "2021-10-12",
    "description": "Logo Concept",
    "paymentsTerms": 1,
    "status": "draft",
    "sender": {
      "address": {
        "street": "19 Union Terrace",
        "city": "London",
        "postCode": "E1 3EZ",
        "country": "United Kingdom"
      }
    },
    "client": {
      "name": "Alysa Werner",
      "email": "alysa@email.co.uk",
      "address": {
        "street": "63 Warwick Road",
        "city": "Carlisle",
        "postCode": "CA20 2TG",
        "country": "United Kingdom"
      }
    },
    "items": [
      {
        "id": "AA005",
        "name": "Logo Sketches",
        "quantity": 1,
        "price": 102.04,
        "total": 102.04
      }
    ],
    "total": 102.04
  }

const onClickDeleteButton = jest.fn()
const onClickEditButton = jest.fn()
const onClickMarkAsPaidButton = jest.fn()

function renderControlPannel(invoice: Invoice){
    render(
        <ThemeProvider>
            <InvoiceViewControlPannel
                invoice={invoice}
                onClickDeleteButton={onClickDeleteButton}
                onClickUpdateButton={onClickEditButton}
                onClickMarkAsPaidButton={onClickMarkAsPaidButton}
            />
        </ThemeProvider>
    )
}

afterEach(cleanup)

describe('Testing InvoiceViewControlPannel component', () => {
    test('Displays the status in a InvoiceStatus component', () => {
        render(
            <ThemeProvider>
                <InvoiceViewControlPannel
                    invoice={invoiceWithPendingStatus}
                    onClickDeleteButton={onClickDeleteButton}
                    onClickUpdateButton={onClickEditButton}
                    onClickMarkAsPaidButton={onClickMarkAsPaidButton}
                />
            </ThemeProvider>
        )
        
        const status = screen.getByTestId('invoice-status')
        expect(status).toBeInTheDocument()
        expect(status).toHaveTextContent(/pending/i)
    })
    
    describe('With an invoice having a status different than paid', () => {
        test('Contains an "Edit" button, a "Delete" button and a "Mark as Paid" button', () => {
            const { rerender } = render(
                <ThemeProvider>
                    <InvoiceViewControlPannel
                        invoice={invoiceWithPendingStatus}
                        onClickDeleteButton={onClickDeleteButton}
                        onClickUpdateButton={onClickEditButton}
                        onClickMarkAsPaidButton={onClickMarkAsPaidButton}
                    />
                </ThemeProvider>
            )

            expect(screen.getByRole('button', {name: /edit/i})).toBeInTheDocument()
            expect(screen.getByRole('button', {name: /delete/i})).toBeInTheDocument()
            expect(screen.getByRole('button', {name: /mark as paid/i})).toBeInTheDocument()

            rerender(
                    <ThemeProvider>
                        <InvoiceViewControlPannel
                            invoice={invoiceWithDraftStatus}
                            onClickDeleteButton={onClickDeleteButton}
                            onClickUpdateButton={onClickEditButton}
                            onClickMarkAsPaidButton={onClickMarkAsPaidButton}
                        />
                    </ThemeProvider>
            )

            expect(screen.getByRole('button', {name: /edit/i})).toBeInTheDocument()
            expect(screen.getByRole('button', {name: /delete/i})).toBeInTheDocument()
            expect(screen.getByRole('button', {name: /mark as paid/i})).toBeInTheDocument()
        })

        test('buttons are calling the correct functions when clicked', () => {
            renderControlPannel(invoiceWithPendingStatus)

            const editButton = screen.getByRole('button', {name: /edit/i})
            const deleteButton = screen.getByRole('button', {name: /delete/i})
            const markAsPaidButton = screen.getByRole('button', {name: /mark as paid/i})
            
            expect(onClickEditButton).not.toHaveBeenCalled()
            fireEvent.click(editButton)
            expect(onClickEditButton).toHaveBeenCalled()
    
            expect(onClickDeleteButton).not.toHaveBeenCalled()
            fireEvent.click(deleteButton)
            expect(onClickDeleteButton).toHaveBeenCalled()
    
            expect(onClickMarkAsPaidButton).not.toHaveBeenCalled()
            fireEvent.click(markAsPaidButton)
            expect(onClickMarkAsPaidButton).toHaveBeenCalled()
        })
    })

    describe('With an invoice having a "Paid" status', () => {
        beforeEach(() => renderControlPannel(invoiceWithPaidStatus))
        
        test('Contains an "Edit" button, a "Delete" button but no "Mark as Paid" button', () => {
            const editButton = screen.getByRole('button', {name: /edit/i})
            const deleteButton = screen.getByRole('button', {name: /delete/i})
            const markAsPaidButton = screen.queryByRole('button', {name: /mark as paid/i})

            expect(editButton).toBeInTheDocument()
            expect(deleteButton).toBeInTheDocument()
            expect(markAsPaidButton).toBeNull()
        })
    })
})