import { Dispatch, SetStateAction } from 'react'
import styled, { css } from 'styled-components'
import Invoice from '../../interfaces'
import iconArrowRight from "../../assets/icon-arrow-right.svg"
import { useThemeContext } from '../../contexts/ThemeProvider'
import InvoiceStatus from './InvoiceStatus'

export default function InvoiceShort({invoice, setSelectedInvoice}: {invoice: Invoice, setSelectedInvoice: Dispatch<SetStateAction<Invoice | null>>}){
    const { theme } = useThemeContext()
    
    function onClickInvoiceShort(): void{
        setSelectedInvoice(invoice)
    }

    return (
        <Wrapper
            id={invoice.id}
            className='invoice-short'
            data-testid='invoice-short'
            theme={theme}
            onClick={() => onClickInvoiceShort()}
        >
            <ID>#<em>{invoice.id}</em></ID>
            <Date className='date' data-testid='date'>Due 19 Aug 2021</Date>
            <Name>{invoice.clientsName}</Name>
            <Total>${invoice.total}</Total>
            <InvoiceStatus status={invoice.status} />
            <ArrowIcon src={iconArrowRight} alt="" aria-hidden='true'/>
        </Wrapper>
    )
}


/*___Styling___*/

const Wrapper = styled.div`
    border-radius: 0.5rem;
    padding: 1.25rem 1.5rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas: 'topLeft topRight' 'bottomLeft bottomRight';
    list-style-type: none;
    position: relative;
    height: 8.375rem;
    cursor: pointer;
    transition: all .3s ease-in-out;

    &:hover{
        border-color: var(--blue-primary);
    }

    span, strong{
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    .invoice-status{
        place-self: flex-end;
    }

    @media screen and (min-width: 768px){
        padding: 1rem 1.5rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: auto;
    }


    ${props => props.theme === 'light' && css`
        background-color: var(--white);
        border: 1px solid var(--white);

        span{
            color: var(--gray);
        }
    `};

    ${props => props.theme === 'dark' && css`
        background-color: var(--dark-secondary);
        border: 1px solid var(--dark-secondary);
        
        span{
            color: var(--blueish-gray);
        }
    `};
`

const ID = styled.span`
    font-weight: var(--fw-bold);
    @media screen and (max-width: 767px){
        place-self: flex-start;
    }
`

const Date = styled.span`
    @media screen and (max-width: 767px){
        grid-area: bottomLeft;
        place-self: flex-start;
        margin-bottom: 0.5rem;
    }
`

const Name = styled.span`
    width: 6.25rem;

    @media screen and (max-width: 767px){
        justify-self: flex-end;
        align-self: flex-start;
    }
`

const Total = styled.strong`
    width: 7rem;
    font-size: 1rem;
    line-height: 1.5rem;
    letter-spacing: -0.8px;

    @media screen and (max-width: 767px){
        justify-self: flex-start;
        align-self: flex-end;
        grid-area: bottomLeft;
    }

    @media screen and (min-width: 768px){
        text-align: right;
    }
`

const ArrowIcon = styled.img`
    @media screen and (max-width: 767px){
        display: none;
    }
`