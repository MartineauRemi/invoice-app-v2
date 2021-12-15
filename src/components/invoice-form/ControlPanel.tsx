import { Dispatch, SetStateAction } from "react"
import Invoice from "../../interfaces"
import styled from 'styled-components'
import {  BlueButton, LightButton, DarkButton } from '../Buttons'
import { MouseEvent } from "react"
import { InvoiceStatusEnum } from "../../interfaces"
import { useThemeContext } from "../../contexts/ThemeProvider"

interface ControlPanelProps{
    setInvoiceFormActive: Dispatch<SetStateAction<boolean>>;
    selectedInvoice: Invoice | null;
    setInvoiceStatus: Dispatch<SetStateAction<string | InvoiceStatusEnum>>;
    saveAsDraft: any;
}

export default function ControlPanel({selectedInvoice, setInvoiceFormActive, setInvoiceStatus, saveAsDraft}: ControlPanelProps){
    const { theme } = useThemeContext()

    function onClickResetButton(e: MouseEvent){
        setInvoiceFormActive(false)
    }

    return (
        selectedInvoice
            ? (
                <Wrapper theme={theme}>
                    <Container>
                        <LightButton type='reset' onClick={(e) => onClickResetButton(e)}>Cancel</LightButton>
                        <BlueButton type='submit'>Save Changes</BlueButton>
                    </Container>
                </Wrapper>
            )
            : (
                <Wrapper className='new-invoice-control-panel' theme={theme}>
                    <DarkButton type='button' onClick={saveAsDraft}>Save as Draft</DarkButton>
                    
                    <Container>
                        <LightButton type='reset' onClick={(e) => onClickResetButton(e)}>Discard</LightButton>
                        <BlueButton type='submit'>Save &amp; Send</BlueButton>
                    </Container>
                </Wrapper>
            )
    )
}

/*___Styling___*/

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    
    background-color: ${props => props.theme === 'light' ? 'var(--white)' : 'var(--dark-primary)'};

    &.new-invoice-control-panel{
        justify-content: space-between;
    }
`

const Container = styled.div`
    button:first-child{
        margin-right: 0.5rem;
    }
`