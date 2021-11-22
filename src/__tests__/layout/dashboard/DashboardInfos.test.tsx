import { render, cleanup, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import DashboardInfos from '../../../layout/dashboard/DashboardInfos'
import invoices from '../../../data/invoices.json'
import ThemeProvider from '../../../contexts/ThemeProvider'
import Invoice from '../../../interfaces'

afterEach(() => cleanup())

function renderDashboardInfos(invoices: Invoice[]){
    render(
        <ThemeProvider>
            <DashboardInfos invoices={invoices}/>
        </ThemeProvider>
    )
}

function dashboardInfosMessage(amount: number){
    return (amount > 0
        ? `There are ${amount} total invoices`
        : 'No invoices')
}

describe('Testing the DashboardInfos component', () => {

    test('Renders without crashing', () => {
        renderDashboardInfos([])
        const dashboardInfosElt = screen.getByTestId('dashboard-infos')
        expect(dashboardInfosElt).toBeInTheDocument()
    })

    test('DashboardInfos displays the message "No invoices" when the invoices list is empty', () => {
        const invoices: Invoice[] = []
        renderDashboardInfos(invoices)
        const dashboardInfosElt = screen.getByTestId('dashboard-infos')
        expect(dashboardInfosElt).toHaveTextContent(dashboardInfosMessage(invoices.length))
    })

    test('DashboardInfos displays the right amount of invoices in the list', () => {
        expect(invoices).toHaveLength(7)

        renderDashboardInfos(invoices)
        const dashboardInfosElt = screen.getByTestId('dashboard-infos')
        expect(dashboardInfosElt).toHaveTextContent(dashboardInfosMessage(invoices.length))
    })
})