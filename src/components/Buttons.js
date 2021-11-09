import styled from "styled-components";
import plusIcon from '../assets/icon-plus.svg'

const Button = styled.button`
    padding: 1rem 1.5rem;
    font-size: 0.75rem;
    line-height: 1rem;
    letter-spacing: -0.25px;
    font-weight: var(--fw-bold);
    transition: background-color .2s ease-in-out;
    cursor: pointer;
    border: none;
    border-radius: 1.5rem;
`

export const BlueButton = styled(Button)`
    background-color: var(--blue-primary);
    color: var(--white);

    &:hover{
        background-color: var(--blue-secondary);
    }
`

export const RedButton = styled(Button)`
    background-color: var(--red-primary);
    color: var(--white);

    &:hover{
        background-color: var(--red-secondary);
    }
`


/*___ styling elements for NewInvoiceButton ___*/
const BlueButtonWithIcon = styled(BlueButton)`
    padding: 0.5rem 1rem 0.5rem 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
`

const IconContainer = styled.div`
    border-radius: 50%;
    background-color: var(--white);
    padding: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
`

export const NewInvoiceButton = (onClick) => {
    return (
        <BlueButtonWithIcon
            onClick={() => onClick()}
        >
            <IconContainer>
              <img src={plusIcon} alt='' aria-hidden='true' width='10px' height='10px'/>
            </IconContainer>
            <span>New Invoice</span>
      </BlueButtonWithIcon>
    )
}

export const LightButton = styled(Button)`
    background-color: var(--light-secondary);
    color: var(--blue-ternary);

    &:hover{
        background-color: var(--blueish-gray);
    }
`

export const DarkButton = styled(Button)`
    background-color: var(--anthracite);
    color: var(--gray);

    &:hover{
        background-color: var(--black-secondary);
    }
`