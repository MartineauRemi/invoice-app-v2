import React from 'react'
import styled, { css } from 'styled-components'
import iconChecked from '../../assets/icon-check.svg'
import { useThemeContext } from '../../contexts/ThemeProvider'

interface CheckboxProps{
    id: string;
    name: string;
    onChange: () => void;
    checked: boolean;
}

export default function Checkbox({id, name, onChange, checked}: CheckboxProps) {
    const { theme } = useThemeContext()

    return (
        <Wrapper
            className='checkbox-container'
            data-testid='checkbox-container'
            theme={theme}
        >
            <StyledCheckbox
                type="checkbox"
                theme={theme}
                id={id}
                name={name}
                onChange={() => onChange()}
                checked={checked}/>
            <label htmlFor={name}>{name}</label>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    label{
        color: ${props => props.theme === 'light' ? '' : 'var(--white)'};
    }
`
const StyledCheckbox = styled.input`
    margin-right: 1rem;
    appearance: none;
    height: 0.75rem;
    width: 0.75rem;
    border-radius: 0.125rem;
    cursor: pointer;
    position: relative;

    ${props => props.theme === 'light' && css`
        background-color: var(--blueish-gray);
        border: 1px solid var(--blueish-gray);
    `};

    ${props => props.theme === 'dark' && css`
        background-color: var(--dark-secondary);
        border: 1px solid var(--dark-secondary);
        
        &:hover{
            background-color: var(--dark-primary);
        }
        
        &:checked{
            background-color: var(--blue-primary);
        }
    `};

    &:hover{
        border: 1px solid var(--blue-primary);
    }

    &:checked{
        background-color: var(--blue-primary);
    }

    &:checked::after{
        position: absolute;
        top: 0;
        left: 0;
        content: '';
        width: 100%;
        height: 100%;
        background-image: ${`url(${iconChecked})`};
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
    }
`
