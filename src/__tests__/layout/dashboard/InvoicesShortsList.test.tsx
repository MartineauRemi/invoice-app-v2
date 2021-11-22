import { render, cleanup, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import InvoicesShortsList from '../../../layout/dashboard/InvoicesShortsList'
import ThemeProvider from '../../../contexts/ThemeProvider'
import invoices from '../../../data/invoices.json'

afterEach(() => cleanup())

const emptyDefaultFn = () => {}


describe('Testing InvoicesShortsList component', () => {
    test('Renders without crashing', () => {
        render(
            <ThemeProvider>
                <InvoicesShortsList
                    draftFilterActive={false}
                    pendingFilterActive={false}
                    paidFilterActive={false}
                    setSelectedInvoice={emptyDefaultFn}
                    shorts={invoices}
                />
            </ThemeProvider>
        )

        const list = screen.getByTestId('invoices-shorts-list')
        expect(list).toBeInTheDocument()
    })
})