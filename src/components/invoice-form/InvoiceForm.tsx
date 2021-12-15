import { Dispatch, SetStateAction, useRef, useState } from 'react'
import { useThemeContext } from '../../contexts/ThemeProvider'
import { GoBackButton } from '../Buttons'
import styled, { css } from 'styled-components'
import { Formik, Form, FormikHelpers } from 'formik'
import  { InvoiceFormValidationSchema }from  "../../validation/InvoiceFormValidation"
import { useInvoicesContext } from '../../contexts/InvoicesProvider'
import Invoice, { InvoiceItem, InvoiceStatusEnum, PaymentsTermsEnum } from '../../interfaces'
import ControlPanel from './ControlPanel'
import useClickOutside from '../../hooks/useClickOutside'
import BillFields from './BillFields'
import DateAndTerms from './DateAndTerms'
import InvoiceItemsList from './InvoiceItemsList'
import { calculateInvoiceTotal } from '../../helpers/Invoice'

export interface InvoiceFormProps{
    setInvoiceFormActive: Dispatch<SetStateAction<boolean>>;
    selectedInvoice: Invoice | null;
    setSelectedInvoice: Dispatch<SetStateAction<Invoice | null>>;
}

const Title = ({selectedInvoice, theme}: {selectedInvoice: Invoice | null, theme: 'light' | 'dark'}) => {
    return (
        <h2>
            {
                selectedInvoice
                    ? `Edit #${selectedInvoice.id}`
                    : 'New Invoice'
            }
        </h2>
    )
}

export default function InvoiceForm({setInvoiceFormActive, selectedInvoice, setSelectedInvoice}: InvoiceFormProps) {
    const { theme } = useThemeContext()
    const invoicesContext = useInvoicesContext()
    const generateNewInvoiceId = invoicesContext ? invoicesContext['generateNewInvoiceId'] : () => {}
    const addInvoice = invoicesContext ? invoicesContext['addInvoice'] : () => {}
    const updateInvoice = invoicesContext ? invoicesContext['updateInvoice'] : () => {}

    const [invoiceStatus, setInvoiceStatus] = useState<string | InvoiceStatusEnum>(selectedInvoice ? selectedInvoice.status : InvoiceStatusEnum.Pending)
    //const [items, setItems] = useState<InvoiceItem[]>(selectedInvoice ? selectedInvoice.items : [])
    const [pickedDate, setPickedDate] = useState(new Date())


    const items = selectedInvoice ? selectedInvoice.items: []
    const initialValues: Invoice = selectedInvoice
        ? {...selectedInvoice}
        : {
            id: `${generateNewInvoiceId()}`,
            createdAt: new Date().toDateString(),
            paymentDue:'',
            description:'',
            paymentsTerms: PaymentsTermsEnum.OneMonth,
            status: invoiceStatus,
            sender: {
                address: {
                    street: '',
                    city: '',
                    postCode: '',
                    country: ''
                }
            },
            client: {
                name: '',
                email: '',
                address: {
                    street: '',
                    city: '',
                    postCode: '',
                    country: ''
                }
            },
            items: items,
            total: 0
        }

    function onClickGoBackButton(){
        setInvoiceFormActive(false)
    }

    const saveAsDraft = (values: Invoice) => {
        const newInvoice = {...values, status: InvoiceStatusEnum.Draft}
        addInvoice(newInvoice)
    }

    const onSubmit = (values: Invoice, {setSubmitting}: FormikHelpers<Invoice>) => {
        const total = calculateInvoiceTotal(values.items)
        const newInvoice = {...values, total}

        if(selectedInvoice){
            updateInvoice(newInvoice)
            setSelectedInvoice(newInvoice)
        }else{
            addInvoice(newInvoice)
        }

        setSubmitting(false)
        setInvoiceFormActive(false)
    }

    const formRef = useRef<any>(null)
    //close the form when the user clicks outside of it
    //useClickOutside(formRef, () => setInvoiceFormActive(false))

    return (
        <Wrapper
            className='invoice-form'
            data-testid='invoice-form'
        >
            <Container theme={theme} ref={formRef}>
            <Formik
                initialValues={initialValues}
                validationSchema={InvoiceFormValidationSchema}
                onSubmit={onSubmit}
            >
                {form => <StyledForm>
                    <Title theme={theme} selectedInvoice={selectedInvoice} />
                    <GoBackButton onClick={() => onClickGoBackButton()} />
                    <BillFields />
                    <DateAndTerms
                        pickedDate={pickedDate}
                        setPickedDate={setPickedDate}
                    />
                    <InvoiceItemsList
                        form={form}
                    />
                    <ControlPanel
                        selectedInvoice={selectedInvoice}
                        setInvoiceFormActive={setInvoiceFormActive}
                        setInvoiceStatus={setInvoiceStatus}
                        saveAsDraft={() => saveAsDraft(form.values)}
                    />
                </StyledForm>
            }
            </Formik>
            </Container>
        </Wrapper>
    )
}

/*___Styling___*/

const Wrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100vw;
    height: 100%;
    background-color: rgba(0,0,0, 0.5);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    
    *{
        transition: all .3s ease-in-out;
    }
`

const Container = styled.div`
    height: calc(100vh - 4.5rem);
    margin-top: 4.5rem;
    
    ${props => props.theme === 'light' && css`
        background-color: var(--white);
    `};

    ${props => props.theme === 'dark' && css`
        background-color: var(--dark-primary);
    `};

    @media screen and (max-width: 767px){
        width: 100%;
    }

    @media screen and (min-width: 768px){
        border-radius: 0 1.25rem 1.25rem 0;
        height: calc(100vh - 5rem);
        margin-top: 5rem;
        padding: 3rem 2rem;
        width: 38.5rem;
    }

    @media screen and (min-width: 1440px){
        padding: 2rem;
        width: 45rem;
        height: 100vh;
        margin-top: 0;
    }
`

const StyledForm = styled(Form)`
    height: calc(100vh - 9rem);
    overflow-y: scroll;
    scrollbar-width: thin;
    scrollbar-color: var(--dark-ternary) var(--dark-secondary);
    display: grid;
    row-gap: 1.5rem;
    padding: 1rem;

    @media screen and (max-width: 767px){
        width: 100%;
    }
    
    @media screen and (min-width: 768px){
        padding: 0 1rem 3rem 0;
    }

    @media screen and (min-width: 1440px){
        padding: 1rem;
        padding-left: 6.5rem;
        height: calc(100vh - 4rem);
    }
`

export const Label = styled.label`
    margin-bottom: 0.625rem;
    color: ${props => props.theme === 'light' ? 'var(--blue-ternary)' : 'var(--gray)'};
    font-size: 0.75rem;
    line-height: 1rem;
    letter-spacing: -0.25px;
`