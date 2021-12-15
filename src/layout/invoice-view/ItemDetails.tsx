import React, { ReactElement } from 'react'
import styled from 'styled-components'
import { useThemeContext } from '../../contexts/ThemeProvider'
import { InvoiceItem } from '../../interfaces'

interface Props {
    item: InvoiceItem
}

export default function ItemDetails({item}: Props): ReactElement {
    const { theme } = useThemeContext()
    return (
        <Wrapper className='item-details' data-testid='item-details' theme={theme}>
            <Name theme={theme}>{item.name}</Name>
            <Quantity>{item.quantity} x ${item.price}</Quantity>
            <Price>${item.total}</Price>
        </Wrapper>
    )
}

/*___styling___*/

const Wrapper = styled.div`
    background: ${props => props.theme === 'light' ? 'var(--light-secondary)' : 'var(--dark-ternary)'};
    padding: 1.5rem;
    display: grid;
    grid-template-areas: 'itemName price' 'quantity price';
    row-gap: 0.5rem;

    @media screen and (min-width: 768px){
        grid-template-areas: 'itemName quantity price';
    }
`

const Name = styled.em`
    color: ${props => props.theme === 'light' ? 'var(--black-secondary)' : 'var(--white)'};
    font-weight: var(--fw-bold);
    grid-area: itemName;
`

const Quantity = styled.p`
    grid-area: quantity;

    @media screen and (min-width: 768px){
        justify-self: flex-end;
        width: 6rem;
    }
`

const Price = styled.strong`
    grid-area: price;
    align-self: center;
    justify-self: flex-end;

    @media screen and (min-width: 768px){
        width: 8.5rem;
        display: flex;
        justify-content: flex-end;
    }
`