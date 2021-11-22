import styled from 'styled-components'
import { useThemeContext } from '../../contexts/ThemeProvider'
import Invoice from '../../interfaces'

const Content = ({invoices}: {invoices: Invoice[]}) => {
    return (
        invoices && invoices.length > 0?
            (
                <p>
                    <span className='mobile-hidden'>There are </span>
                    {invoices.length}
                    <span className='mobile-hidden'> total</span> invoices
                </p>
            )
            : (
                <p>
                    No invoices
                </p>
            )
    )
}

export default function DashboardInfos({invoices}: {invoices: Invoice[]}) {
    const { theme } = useThemeContext()

    return (
        <Infos data-testid='dashboard-infos' className='dashboard-infos' theme={theme}>
            <h2>Invoices</h2>
            <Content invoices={invoices} />
        </Infos>
    )
}


/*___styling___*/

const Infos = styled.div`
    h2, p{
        transition: all .3s ease-in-out;
    }
`
