import React from 'react'
import styled, { css } from 'styled-components'
import InvoiceStatus from '../../components/invoice/InvoiceStatus'
import Invoice, { InvoiceStatusEnum } from '../../interfaces'
import { LightButton, RedButton, BlueButton } from '../../components/Buttons'
import { useThemeContext } from '../../contexts/ThemeProvider'

interface Props{
    invoice: Invoice;
    onClickUpdateButton: () => void;
    onClickDeleteButton: () => void;
    onClickMarkAsPaidButton: () => void;
}

export default function InvoiceViewControlPannel({invoice, onClickUpdateButton, onClickDeleteButton, onClickMarkAsPaidButton}: Props) {
    const { theme } = useThemeContext()

    return (
        <Wrapper
            className='invoice-view-control-pannel'
            data-testid='invoice-view-control-pannel'
            theme={theme}
        >
            <StatusContainer>
                <Text>Status</Text>
                <InvoiceStatus
                    status={invoice.status}
                />
            </StatusContainer>
            <ButtonsContainer
                theme={theme}
            >
                <LightButton
                    onClick={onClickUpdateButton}
                >
                    Edit
                </LightButton>
                <RedButton
                    onClick={onClickDeleteButton}
                >
                    Delete
                </RedButton>
                {
                    invoice.status !== InvoiceStatusEnum.Paid ?
                    (
                        <BlueButton
                            onClick={onClickMarkAsPaidButton}
                        >
                            Mark as Paid
                        </BlueButton>
                    ) : null
                }
            </ButtonsContainer>
        </Wrapper>
    )
}

/*___styling___*/

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem;
    border-radius: 0.5rem;

    @media screen and (min-width: 768px){
        padding: 1.25rem 2rem;
    }

    ${props => props.theme === 'light' && css`
        background-color: var(--white);
    `};

    ${props => props.theme === 'dark' && css`
        background-color: var(--dark-secondary);
    `};
`

const StatusContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media screen and (max-width: 767px){
        width: 100%;
    }
`

const ButtonsContainer = styled.div`
    display: flex;
    align-items: center;

    @media screen and (max-width: 767px){
        justify-content: flex-end;
        position: absolute;
        bottom: -100%;
        left: 0;
        width: 100%;

        ${props => props.theme === 'light' && css`
            background-color: var(--white);
        `};

        ${props => props.theme === 'dark' && css`
            background-color: var(--dark-secondary);
        `};

        padding: 1.25rem 1.5rem;
    }
    
    button:not(:last-child){
       margin-right: 0.5rem;
    }
`

const Text = styled.p`
    margin-right: 1rem;
`