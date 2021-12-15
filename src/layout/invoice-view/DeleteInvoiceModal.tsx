import React, { Dispatch, ReactElement, SetStateAction } from 'react'
import styled from 'styled-components'
import { LightButton, RedButton } from '../../components/Buttons'
import { useInvoicesContext } from '../../contexts/InvoicesProvider'
import { useThemeContext } from '../../contexts/ThemeProvider'
import Invoice from '../../interfaces'

interface Props {
    invoice: Invoice;
    setSelectedInvoice: Dispatch<SetStateAction<Invoice | null>>;
    setDeleteInvoiceModalActive: Dispatch<SetStateAction<boolean>>;
}

export default function DeleteInvoiceModal({invoice, setSelectedInvoice, setDeleteInvoiceModalActive}: Props): ReactElement {
    const { theme } = useThemeContext()
    const invoicesContext = useInvoicesContext()
    const removeInvoice = invoicesContext ? invoicesContext['removeInvoice'] : () => {}

    const onClickResetButton = () => setDeleteInvoiceModalActive(false)
    const onClickDeleteButton = () => {
        removeInvoice(invoice.id)
        setSelectedInvoice(null)
        setDeleteInvoiceModalActive(false)
    }

    return (
        <Wrapper theme={theme} data-testid='delete-invoice-modal'>
            <Content theme={theme}>
                <h2>Confirm deletion</h2>
                <p>
                    Are you sure you want to delete invoice #{invoice.id}? This action cannot be undone.
                </p>
                <Buttons>
                    <LightButton
                        onClick={onClickResetButton}
                        data-testid='cancel-deletion-button'
                    >
                        Cancel
                    </LightButton>
                    <RedButton
                        onClick={onClickDeleteButton}
                        data-testid='confirm-deletion-button'
                    >
                        Delete
                    </RedButton>
                </Buttons>
            </Content>
        </Wrapper>
    )
}

/*___styling___*/

const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0,0,0,0.5);
`

const Content = styled.div`
    width: 100%;
    max-width: 30rem;
    border-radius: 0.5rem;
    padding: 2rem;
    display: grid;
    row-gap: 1rem;

    background: ${props => props.theme ==='light'? 'var(--white)' : 'var(--dark-secondary)'};

    @media screen and (min-width: 768px){
        padding: 3rem;
    }
`

const Buttons = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;

    & button:first-child{
        margin-right: 0.5rem;
    }
`