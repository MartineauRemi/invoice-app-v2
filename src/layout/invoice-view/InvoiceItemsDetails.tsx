import React, { ReactElement } from 'react'
import styled from 'styled-components'
import { useThemeContext } from '../../contexts/ThemeProvider'
import Invoice from '../../interfaces'
import ItemDetails from './ItemDetails'

interface Props {
    invoice: Invoice;
}

export default function InvoiceItemsDetails({invoice}: Props): ReactElement {
    const { theme } = useThemeContext()
    return (
        <Wrapper data-testid='invoice-items-details'>
            <ul>
                {invoice.items.map(item => (
                    <li key={item.id}>
                        <ItemDetails item={item} />
                    </li>
                ))}
            </ul>
            <GrandTotal theme={theme} data-testid='grand-total'>
                <p>Amount Due</p>
                <strong>${invoice.total}</strong>
            </GrandTotal>
        </Wrapper>
    )
}

/*___styling___*/

const Wrapper = styled.section`
    width: 100%;
    border-radius: 0.5rem;
    overflow: hidden;
`

const GrandTotal = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem;
    background-color: ${props => props.theme === 'light' ? 'var(--anthracite)' : 'var(--black-secondary)'};

    strong{
        color: var(--white);
    }
`