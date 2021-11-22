import { ReactElement, Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
import InvoiceShort from '../../components/invoice/InvoiceShort'
import Invoice from '../../interfaces'

export interface InvoicesShortsListProps{
    shorts: Invoice[];
    draftFilterActive: boolean;
    pendingFilterActive: boolean;
    paidFilterActive: boolean;
    setSelectedInvoice: Dispatch<SetStateAction< Invoice | null>>
}

const InvoicesShorts = ({shorts, draftFilterActive, pendingFilterActive, paidFilterActive, setSelectedInvoice}: InvoicesShortsListProps): ReactElement => {
    const noFiltersActive = !paidFilterActive && !pendingFilterActive && !draftFilterActive

    return (
        <List className='invoices-shorts-list' data-testid='invoices-shorts-list'>
            {shorts.map((invoice: Invoice, index: number) => {
                const paidFilter = paidFilterActive && invoice.status === 'paid'
                const pendingFilter = pendingFilterActive && invoice.status === 'pending'
                const draftFilter = draftFilterActive && invoice.status === 'draft'
                
                if(noFiltersActive || draftFilter || pendingFilter || paidFilter){
                    return (
                        <li key={invoice.id}>
                            <InvoiceShort
                                invoice={invoice}
                                setSelectedInvoice={setSelectedInvoice}
                            />
                        </li>
                    )
                }
        
                return null
            })}
        </List>
    )
}

export default function InvoicesShortsList({shorts, draftFilterActive, pendingFilterActive, paidFilterActive, setSelectedInvoice}: InvoicesShortsListProps) {
    return (
        <InvoicesShorts
            shorts={shorts}
            draftFilterActive={draftFilterActive}
            pendingFilterActive={pendingFilterActive}
            paidFilterActive={paidFilterActive}
            setSelectedInvoice={setSelectedInvoice}
        />
    )
}

/*___Styling___*/

const List = styled.ul`
    width: 100%;
    display: grid;
    row-gap: 1rem;
    max-width: 45.625rem;
`
