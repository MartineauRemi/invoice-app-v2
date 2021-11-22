import styled from 'styled-components'
import illustrationEmpty from '../../assets/illustration-empty.svg'


export default function EmptyInvoicesListMessage(){
    return (
        <Wrapper data-testid='empty-invoices-list-message' className="dashboard__empty-content">
            <Image src={illustrationEmpty} alt='Your invoices list is empty' />
            <Title>There is nothing here</Title>
            <p>Create an invoice by clicking the <strong>New</strong> <strong className='mobile-hidden'>Invoice</strong> button and get started</p>
        </Wrapper>
    )
}


/*___Styling___*/

const Wrapper = styled.div`
    place-self: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 15.125rem;
    text-align: center;

    *{
        transition: all .3s ease-in-out;
    }
`

const Image = styled.img`
    width: 15.125rem;
    height: 12.5rem;
    margin-bottom: 2.5rem;
`

const Title = styled.h2`
    margin-bottom: 1.5rem;
`