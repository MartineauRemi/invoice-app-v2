import { Dispatch, SetStateAction } from "react"
import Invoice, { InvoiceStatusEnum } from "../../interfaces"
import { GoBackButton } from "../../components/Buttons"
import styled from 'styled-components'
import InvoiceViewControlPannel from "./InvoiceViewControlPannel"
import InvoiceDetails from "./InvoiceDetails"
import { useInvoicesContext } from "../../contexts/InvoicesProvider"

interface Props{
    invoice: Invoice;
    setSelectedInvoice: Dispatch<SetStateAction<Invoice | null>>;
    setInvoiceFormActive: Dispatch<SetStateAction<boolean>>;
    setDeleteInvoiceModalActive: Dispatch<SetStateAction<boolean>>;
}

export default function InvoiceView({invoice, setInvoiceFormActive, setSelectedInvoice, setDeleteInvoiceModalActive}: Props) {    
    const invoicesContext = useInvoicesContext()
    const updateInvoice = invoicesContext ? invoicesContext['updateInvoice'] : () => {}
    
    const onClickUpdateButton = () => setInvoiceFormActive(true)
    const onClickGoBackButton = () => setSelectedInvoice(null)
    const onClickDeleteButton = () => setDeleteInvoiceModalActive(true)
    
    const onClickMarkAsPaidButton = () =>{
        const newInvoice = {...invoice, status: InvoiceStatusEnum.Paid}
        updateInvoice(newInvoice)
        setSelectedInvoice(newInvoice)
    }

    return (
        <Wrapper
            className='invoice-view'
            data-testid='invoice-view'
        >
            <Content>
                <GoBackButton
                    onClick={onClickGoBackButton}
                />
                <InvoiceViewControlPannel
                    invoice={invoice}
                    onClickUpdateButton={onClickUpdateButton}    
                    onClickDeleteButton={onClickDeleteButton}    
                    onClickMarkAsPaidButton={onClickMarkAsPaidButton}    
                />
                <InvoiceDetails invoice={invoice}/>
            </Content>
        </Wrapper>
    )
}


/*___Styling___*/

const Wrapper = styled.section`
    width: 100%;
    position: relative;
    display: grid;

    *{
        transition: all .3s ease-in-out;
    }
`

const Content = styled.div`
    place-self: center;
    width: 100%;
    max-width: 45.625rem;
    display: grid;
    row-gap: 1rem;

    @media screen and (min-width: 768px){
        row-gap: 1.5rem;
    }
`