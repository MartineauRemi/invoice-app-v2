import React from 'react'
import { useThemeContext } from '../../contexts/ThemeProvider'
import { ThemeToggleButton } from '../../components/Buttons'
import avatar from '../../assets/image-avatar.jpg'
import styled from 'styled-components'
import logo from '../../assets/logo.svg'


const HeaderWrapper = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    transition: all .3s ease-in-out;
    background-color: ${props => props.theme === 'light' ? 'var(--anthracite)' : 'var(--dark-secondary)'};
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media screen and (min-width: 1440px){
        flex-direction: column;
        height: 100vh;
        width: auto;
        border-radius: 0 1.25rem 1.25rem 0;
    }
`

const LogoContainer = styled.div`
    border-radius: 0 1.25rem 1.25rem 0;
    background-color: var(--blue-primary);
    position: relative;
    overflow: hidden;
    padding: 1.5rem;
    z-index: -1;

    &::after{
        z-index: -1;
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        bottom: -50%;
        left: 0;
        border-radius: 1.25rem 0 1.25rem 0;
        background-color: var(--blue-secondary);
    }

    @media screen and (min-width: 1440px){
        padding: 2rem;
    }
`

const Logo = styled.img`
    z-index: 3;
    width: 1.75rem;
    height: 1.625rem;
    

    @media screen and (min-width: 768px){
        width: 2rem;
        height: 1.875rem;
    }

    @media screen and (min-width: 1440px){
        width: 2.5rem;
        height: 2.375rem;
    }
`

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    @media screen and (min-width: 1440px){
        height: auto;
        width: 100%;
        flex-direction: column;
    }
`

const Avatar = styled.img`
    border-radius: 50%;
    place-self: center;
    width: 2rem;
    height: 2rem;

    @media screen and (min-width: 1440px){
        width: 2.5rem;
        height: 2.5rem;
    }
`

const AvatarContainer = styled.div`
    height: 100%;
    border-left: 1px solid var(--blue-ternary);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.25rem 1.5rem;
    height: 100%;

    @media screen and (min-width: 768px){
        padding: 1rem 2rem;
        height: 5rem;
    }

    @media screen and (min-width: 1440px){
        border: none;
        border-top: 1px solid var(--blue-ternary);
        padding: 2.5rem 2rem;
    }
`

export default function Header() {
    const { theme, toggleTheme } = useThemeContext()

    function onClickThemeToggleButton(){
        toggleTheme()
    }

    return (
        <HeaderWrapper
            className={`header header--${theme}`}
            theme={theme}
        >
            <LogoContainer>
                <Logo
                    src={logo}
                    alt=''
                    aria-hidden='true'
                />
            </LogoContainer>
            <Container>
                <ThemeToggleButton onClick={() => onClickThemeToggleButton()} />
                <AvatarContainer>
                    <Avatar
                        src={avatar}
                        alt="user's avatar"
                    />
                </AvatarContainer>
            </Container>
        </HeaderWrapper>
    )
}
