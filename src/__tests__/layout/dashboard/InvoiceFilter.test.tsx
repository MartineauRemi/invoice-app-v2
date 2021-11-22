import { render, cleanup, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import InvoiceFilter from '../../../layout/dashboard/InvoiceFilter'
import ThemeProvider from '../../../contexts/ThemeProvider'

const emptyDefaultFn = () => {}

beforeEach(() => {
    render(
        <ThemeProvider>
            <InvoiceFilter
                draftFilterActive={false}
                pendingFilterActive={false}
                paidFilterActive={false}
                setDraftFilterActive={emptyDefaultFn}
                setPendingFilterActive={emptyDefaultFn}
                setPaidFilterActive={emptyDefaultFn}
            />
        </ThemeProvider>
    )
})

describe('Testing InvoiceFilter component', () => {
    afterEach(() => cleanup())

    test('Renders without crashing', () => {
        const filter = screen.getByTestId('invoice-filter')
        expect(filter).toBeInTheDocument()
    })

    test('InvoiceFilter has 3 checkbox labeled as "Draft", "Pending" and "Paid" in this order', () => {
        const filter = screen.getByTestId('invoice-filter')

        const checkboxes = filter.getElementsByClassName('checkbox-container')
        expect(checkboxes).toHaveLength(3)

        expect(checkboxes[0].querySelector('input[type="checkbox"]')).toHaveProperty('name', "Draft")
        expect(checkboxes[0].querySelector('label[for="Draft"]')).not.toBeNull()

        expect(checkboxes[1].querySelector('input[type="checkbox"]')).toHaveProperty('name', "Pending")
        expect(checkboxes[1].querySelector('label[for="Pending"]')).not.toBeNull()

        expect(checkboxes[2].querySelector('input[type="checkbox"]')).toHaveProperty('name', "Paid")
        expect(checkboxes[2].querySelector('label[for="Paid"]')).not.toBeNull()
    })
})