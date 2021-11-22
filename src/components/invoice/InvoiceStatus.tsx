import styled, { css } from "styled-components"
import { useThemeContext } from "../../contexts/ThemeProvider"

export default function InvoiceStatus({status}: {status: string} ){
    const { theme } = useThemeContext()
    const statusValue = (status !== 'paid' && status !== 'pending' && status !== 'draft')
        ? 'draft'
        : status

    return (
        <Wrapper
            className={`invoice-status invoice-status--${statusValue}`}
            data-testid='invoice-status'
            theme={theme}
        >
            <Circle />
            <span>{statusValue}</span>
        </Wrapper>
    )
}

/*___Styling___*/

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 6.5rem;
    height: 2.5rem;
    border-radius: 0.5rem;
    font-weight: var(--fw-bold);
    transition: all .3s ease-in-out;

    *{
        transition: all .3s ease-in-out;
    }

    &.invoice-status--paid{
        background-color: rgba(51, 214, 159, 0.1);

        span{
            color: var(--green);
        }

        div{
            background-color: var(--green);
        }
    }

    &.invoice-status--pending{
        background-color: rgba(255, 143, 0, 0.1);

        span{
            color: var(--orange);
        }

        div{
            background-color: var(--orange);
        }
    }

    ${props => props.theme === 'light' && css`
        &.invoice-status--draft{
            background-color: rgba(55, 59, 83, 0.1);

            span{
                color: var(--anthracite);
            }

            div{
                background-color: var(--anthracite);
            }
        }
    `};

    ${props => props.theme === 'dark' && css`
        &.invoice-status--draft{
            background-color: rgba(223, 227, 250, 0.1);

            span{
                color: var(--blueish-gray);
            }

            div{
                background-color: var(--blueish-gray);
            }
        }
    `};

    
`

const Circle = styled.div`
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 2rem;
    margin-right: 0.5rem;
`