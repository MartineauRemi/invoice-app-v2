import styled, { css } from 'styled-components'
import { useThemeContext } from '../../contexts/ThemeProvider'

export default function Main({children}:any) {
    const { theme } = useThemeContext()
    return (
        <Wrapper theme={theme}>
            {children}
        </Wrapper>
    )
}

/*___Styling___*/

const Wrapper = styled.main`
    min-height: 100vh;
    transition: all .3s ease-in-out;
    background-color: ${props => props.theme === 'light' ? 'var(--light-primary)' : 'var(--dark-primary)'};
    position: relative;
    padding: 2rem 1.5rem;
    margin-top: 4.875rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media screen and (min-width: 768px){
        padding: 3.5rem 3rem;
        margin-top: 5.125rem;
    }

    @media screen and (min-width: 1440px){
        padding: 5rem 0;
        margin-top: 0;
    }

    .mobile-hidden{
        @media screen and (max-width: 767px){
            display: none;
        }
    }

    ${props => props.theme === 'light' && css`
        h2, em, strong{
            color: var(--black-secondary);
        }

        p{
            color: var(--gray);
        }
    `};

    ${props => props.theme === 'dark' && css`
        h2, em, strong{
            color: var(--white);
        }

        p{
            color: var(--blueish-gray);
        }
    `};
`
