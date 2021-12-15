import styled, { css } from 'styled-components'
import { useThemeContext } from '../../contexts/ThemeProvider'
import { dateFormat } from '../../helpers/date'
import Invoice from '../../interfaces'
import InvoiceItemsDetails from './InvoiceItemsDetails'

interface Props{
    invoice: Invoice;
}

export default function InvoiceDetails({invoice}: Props) {
    const { theme } = useThemeContext()

    return (
        <Wrapper
            data-testid='invoice-details'
            theme={theme}
        >
            <MainInfos>
                <Container>
                    <DescriptionAndID>
                        <p>#<strong>{invoice.id}</strong></p>
                        <p>{invoice.description}</p>
                    </DescriptionAndID>
                    <SenderAddress>
                        <p>{invoice.sender.address.street}</p>
                        <p>{invoice.sender.address.city}</p>
                        <p>{invoice.sender.address.postCode}</p>
                        <p>{invoice.sender.address.country}</p>
                    </SenderAddress>
                </Container>

                <ClientInfos>
                    <Dates>
                        <div>
                            <p>Invoice date</p>
                            <strong>{dateFormat(invoice.createdAt)}</strong>
                        </div>

                        <div>
                            <p>Payment due</p>
                            <strong>{dateFormat(invoice.paymentDue)}</strong>
                        </div>
                    </Dates>

                    <BillTo>
                        <p>Bill to</p>
                        <strong>{invoice.client.name}</strong>
                        <p>{invoice.client.address.street}</p>
                        <p>{invoice.client.address.city}</p>
                        <p>{invoice.client.address.postCode}</p>
                        <p>{invoice.client.address.country}</p>
                    </BillTo>
                    
                    <SentTo>
                        <p>Sent to</p>
                        <strong>{invoice.client.email}</strong>
                    </SentTo>
                </ClientInfos>
            </MainInfos>
            <InvoiceItemsDetails invoice={invoice} />
        </Wrapper>
    )
}


/*___styling___*/

const Wrapper = styled.section`
    width: 100%;
    border-radius: 0.5rem;
    padding: 1.5rem;
    display: grid;
    row-gap: 1rem;

    strong{
        font-size: 1rem;
        line-height: 1.5rem;
        letter-spacing: -0.31px;
    }

    ${props => props.theme === 'light' && css`
        background-color: var(--white);
    `};

    ${props => props.theme === 'dark' && css`
        background-color: var(--dark-secondary);
    `};

    @media screen and (min-width: 768px){
        padding: 2rem;
        row-gap: 1.5rem;
    }

    @media screen and (min-width: 1440px){
        padding: 3rem;
    }
`

const MainInfos = styled.div`
    width: 100%;
    display: grid;
    row-gap: 2rem;
    grid-template-rows: repeat(2, auto);
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    @media screen and (min-width: 450px){
        flex-direction: row;
        justify-content: space-between;
    }
`

const DescriptionAndID = styled.div`
    @media screen and (max-width: 449px){
        margin-bottom: 2rem;
    }
`

const SenderAddress = styled.div``


const Dates = styled.div`
    display: grid;
    row-gap: 2rem;
    grid-area: dates;
`

const ClientInfos = styled.div`
    display: grid;
    grid-template-columns: repeat(2, auto);
    grid-template-areas: 'dates billTo' 'dates billTo' 'sentTo sentTo';
    row-gap: 2rem;

    @media screen and (min-width: 768px){
        column-gap: 6rem;
        grid-template-columns: repeat(3, auto);
        grid-template-areas: 'dates billTo sentTo';
    }
`

const BillTo = styled.div`
    grid-area: billTo;
    
    strong{
        display: inline-block;
        margin-bottom: 0.5rem;
    }
`

const SentTo = styled.div`
    grid-area: sentTo;
`