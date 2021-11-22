import { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
import { useThemeContext } from '../../contexts/ThemeProvider'
import DashboardInfos from './DashboardInfos'
import { NewInvoiceButton } from '../../components/Buttons'
import InvoiceFilter from './InvoiceFilter'
import InvoicesShortsList from './InvoicesShortsList'
import { useInvoicesContext } from '../../contexts/InvoicesProvider'
import { useState } from 'react'
import EmptyInvoicesListMessage from './EmptyInvoicesListMessage'
import Invoice from '../../interfaces'

interface DashboardProps{
    setInvoiceFormActive: (b: boolean) => void;
    setSelectedInvoice: Dispatch<SetStateAction<Invoice | null>>
}

export default function Dashboard({setInvoiceFormActive, setSelectedInvoice}: DashboardProps) {
    const { theme } = useThemeContext()
    const invoicesContext = useInvoicesContext()
    const invoices = invoicesContext ? invoicesContext['invoices'] : []

    //the differents levels of filtering the invoices list
    //Setting all filters to 'true' disables all filters
    const [paidFilterActive, setPaidFilterActive] = useState(false)
    const [pendingFilterActive, setPendingFilterActive] = useState(false)
    const [draftFilterActive, setDraftFilterActive] = useState(false)

    const onClickNewInvoiceButton = () => setInvoiceFormActive(true)

    return (
        <Wrapper className='dashboard' data-testid='dashboard' theme={theme}>
            <Container>
                <DashboardInfos invoices={invoices}/>
                <Controls>
                    <InvoiceFilter
                        paidFilterActive={paidFilterActive}
                        setPaidFilterActive={setPaidFilterActive}
                        pendingFilterActive={pendingFilterActive}
                        setPendingFilterActive={setPendingFilterActive}
                        draftFilterActive={draftFilterActive}
                        setDraftFilterActive={setDraftFilterActive}
                    />
                    <NewInvoiceButton
                        onClick={onClickNewInvoiceButton}
                    />
                </Controls>
            </Container>
            
            {invoices.length === 0
                ? <EmptyInvoicesListMessage />
                : (
                    <InvoicesShortsList
                        shorts={invoices}
                        draftFilterActive={draftFilterActive}
                        pendingFilterActive={pendingFilterActive}
                        paidFilterActive={paidFilterActive}
                        setSelectedInvoice={setSelectedInvoice}  
                    />
                )
            }
        </Wrapper>
    )
}


/*___Styling___*/
const Wrapper = styled.section`
    width: 100%;
    height: 100%;
    max-width: var(--layout-max-width);
    display: grid;
    row-gap: 1rem;

    .invoices-shorts-list{
        place-self: center;
    }

    @media screen and (min-width: 768px){
        row-gap: 3.5rem;
    }

    @media screen and (min-width: 1440px){
        row-gap: 4rem;
    }
`

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Controls = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`