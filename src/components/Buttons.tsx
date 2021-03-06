import styled, { css } from "styled-components"
import plusIcon from '../assets/icon-plus.svg'
import moonIcon from '../assets/icon-moon.svg'
import sunIcon from '../assets/icon-sun.svg'
import iconArrowLeft from '../assets/icon-arrow-left.svg'
import { useThemeContext } from "../contexts/ThemeProvider"
import React, { ReactNode } from "react"

export interface ButtonProps {
    label?: string;
    invariant?: boolean;
    onClick?: (args?: any) => void;
    type?: 'submit' | 'reset' | 'button';
    children?: ReactNode;
}

const defaultFunction = () => {}

export const Button = styled.button<ButtonProps>`
    padding: 1rem;
    font-size: 0.75rem;
    line-height: 1rem;
    letter-spacing: -0.25px;
    font-weight: var(--fw-bold);
    transition: all .3s ease-in-out;
    cursor: pointer;
    border: none;
    border-radius: 1.5rem;

    @media screen and (min-width: 768px){
        padding: 1rem 1.5rem;
    }
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
    
    .text, .text *{
        color: var(--white);
    }
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

export const NewInvoiceButton: React.FC<ButtonProps> = ({onClick = defaultFunction}) => {
    return (
        <BlueButtonWithIcon
            data-testid='new-invoice-button'
            className='new-invoice-button'
            onClick={() => onClick()}
        >
            <IconContainer>
                <img
                    src={plusIcon}
                    alt=''
                    aria-hidden='true'
                    width='10px'
                    height='10px'
                />
            </IconContainer>
            <p className='text'>New <span className='mobile-hidden'>Invoice</span></p>
      </BlueButtonWithIcon>
    )
}



/*___ Styling elements for LightButton ___*/

const StyledLightButton = styled(Button)`
    ${props => ((props.theme && props.theme === 'light') || props.invariant) && css`
        background-color: var(--light-secondary);
        color: var(--blue-ternary);

        &:hover{
            background-color: var(--blueish-gray);
        }
    `}
    
    ${props => ((props.theme && !props.invariant) && props.theme === 'dark') && css`
        background-color: var(--dark-ternary);
        color: var(--blueish-gray);

        &:hover{
            background-color: var(--white);
        }
    `}
`

export const LightButton: React.FC<ButtonProps> = ({invariant = false, onClick = defaultFunction, children}) => {
    const { theme } = useThemeContext()

    return (
        <StyledLightButton
            invariant={invariant}
            theme={theme}
            onClick={() => onClick()}
        >
            {children}
        </StyledLightButton>
    )
}



/*___ Styling elements for DarkButton ___*/

const StylingDarkButton = styled(Button)`
    background-color: var(--anthracite);

    ${props => (props.theme && props.theme === 'light') && css`
        color: var(--gray);

        &:hover{
            background-color: var(--black-secondary);
        }
    `}

    ${props => (props.theme && props.theme === 'dark') && css`
        color: var(--blueish-gray);

        &:hover{
            background-color: var(--dark-secondary);
        }
    `}
`

export const DarkButton: React.FC<ButtonProps> = ({onClick = defaultFunction, children}) => {
    const { theme } = useThemeContext()

    return (
        <StylingDarkButton theme={theme} onClick={() => onClick()}>
            {children}
        </StylingDarkButton>
    )
}



/*___ Styling elements for ThemeToggleButton ___*/

const StylingThemeButton = styled(Button)`
    padding: 1.5rem;
    background: transparent;
    display: flex;
    justify-content: center;
    align-items: center;

    @media screen and (min-width: 768px){
        padding: 1.875rem;
    }

    @media screen and (min-width: 1440px){
        padding: 2rem;
    }
`

export const ThemeToggleButton: React.FC<ButtonProps> = () => {
    const {theme, toggleTheme} = useThemeContext()
    
    function onClickThemeToggleButton(){
        toggleTheme()
    }

    return (
        <StylingThemeButton
            className={`theme-toggle-button theme-toggle-button--${theme}`}
            data-testid='theme-toggle-button'
            onClick={() => onClickThemeToggleButton()}
            aria-label='theme-toggle-button'
        >
            <img
                src={
                    theme === 'light'
                    ? moonIcon
                    : sunIcon
                }
                alt='theme toggle button'
                aria-hidden='true'
                width='20px'
                height='20px'
            />
        </StylingThemeButton>
    )
}


/*___ Styling elements for GoBackButton ___*/

const StyledGoBackButton =  styled(Button)`
    background-color: transparent;
    display: flex;
    align-items: center;
    padding: 0;
    
    span{
        margin-left: 1.5rem;
    }

    ${props => props.theme === 'light' && css`
        span{
            color: var(--black-secondary);

            &:hover{
                color: var(--blue-ternary);
            }
        }
    `};

    ${props => props.theme === 'dark' && css`
        span{
            color: var(--white);

            &:hover{
                color: var(--gray);
            }
        }
    `};
`

export const GoBackButton: React.FC<ButtonProps> = ({onClick = defaultFunction}) => {
    const { theme } = useThemeContext()

    return (
        <StyledGoBackButton
            data-testid='go-back-button'
            className='go-back-button'
            onClick={() => onClick()}
            theme={theme}
        >
            <img src={iconArrowLeft} alt='' aria-hidden='true' />
            <span>Go back</span>
        </StyledGoBackButton>
    )
}