import { useState, Dispatch, SetStateAction, MouseEvent, ChangeEvent, useEffect } from 'react'
import binIcon from "../../assets/icon-delete.svg"
import TextInput from '../form-elements/TextInput'
import { InvoiceItem } from '../../interfaces'
import styled, { css } from 'styled-components'
import { Button } from '../Buttons'
import { useFormikContext, FormikProps, Field } from 'formik'
import Invoice from '../../interfaces'
import { useThemeContext } from '../../contexts/ThemeProvider'

interface InvoiceItemProps{
    index: number;
    data: InvoiceItem;
    form:  FormikProps<Invoice>;
}

export default function InvoiceItemFields({index, data, form }: InvoiceItemProps) {
    const [total, setTotal] = useState<number>(data? data.total : 0)
    
    const { values } = useFormikContext()
    const { theme } = useThemeContext()

    function removeItemFromList(): void{
        form.setFieldValue('items', form.values.items.filter(item => item !== data))
    }

    function onClickDeleteBtn(e: MouseEvent){
        e.preventDefault()
        removeItemFromList()
    }

    //update the total price of the item as soon as the quantity or the price changes
    useEffect(() => {
        if(data.quantity && data.price){
            setTotal(data.quantity * data.price)
            form.values.items.filter(item => item.id === data.id).map(item => item.total = data.quantity * data.price)
        }
        else
            setTotal(0)
    }, [values, data, form])

    
    return (
        <Wrapper className="invoice-form-item" data-testid='invoice-form-item-fieldset'>
            <TextInput
                name={`items.${index}.name`}
                className='name'
                label='Item Name'
            />
            <TextInput
                    name={`items.${index}.quantity`}
                    className='quantity'
                    label='Qty.'
            />
            <TextInput
                name={`items.${index}.price`}
                className='price'
                label='Price'
            />
            <div>
                <TotalLabel
                    htmlFor='total'
                    theme={theme}
                >
                    Total
                </TotalLabel>

                <TotalField
                    type='number'
                    name='total'
                    className='total'
                    value={total}
                    theme={theme}
                    disabled
                />
            </div>
            <DeleteItemButton
                className="delete-item-button"
                onClick={onClickDeleteBtn}
            >
                <img src={binIcon} alt="" aria-hidden='true' width="16px" height="16px"/>
            </DeleteItemButton>
        </Wrapper>
    )
}


/*___Styling___*/

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(4, auto);
    grid-template-areas: 'itemName itemName itemName itemName' 'quantity price total delete';
    column-gap: 1rem;
    row-gap: 1.5rem;

    .name{
        grid-area: itemName;
    }

    .quantity{
        grid-area: quantity;
        width: 4rem;
    }

    .price{
        grid-area: price;
        width: 6rem;
    }

    .total{
        grid-area: total;
    }

    .delete-item-button{
        grid-area: delete;
    }

    @media screen and (min-width: 768px){
        grid-template-columns: repeat(5, auto);
        grid-template-areas: 'itemName quantity price total delete';
    }
`

const DeleteItemButton = styled(Button)`
    padding: 1rem 0.5rem;
    background-color: transparent;
    display: grid;

    img{
        align-self: flex-end;
        justify-self: center;
    }
`

const TotalField = styled.input`
    min-width: 4rem;
    padding: 1rem 0;
    outline: none;
    border: none;
    width: 100%;
    background-color: var(--white);

    ${props => props.theme === 'dark' && css`
        background-color: var(--dark-primary);
        color: var(--white);
    `};

    @media screen and (min-width: 1440px){
        width: 6rem;
    }
`

const TotalLabel = styled.label`
    margin-bottom: 0.625rem;
    font-size: 0.75rem;
    line-height: 1rem;
    letter-spacing: -0.25px;
    font-weight: var(--fw-medium);
    display: block;

    &.error{
        color: $red-primary;
    }

    color: ${props => props.theme === 'light' ? 'var(--blue-ternary)' : 'var(--gray)'};
`