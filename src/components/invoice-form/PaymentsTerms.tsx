import styled, { css } from 'styled-components'
import { PaymentsTermsEnum } from '../../interfaces'
import { useThemeContext } from '../../contexts/ThemeProvider'
import { Label } from './InvoiceForm'


export default function PaymentsTerms(){
    const { theme } = useThemeContext()

    return (
        <Fieldset
            className='payments-terms'
            data-testid='payments-terms'
        >
            <Label theme={theme} htmlFor='payments-terms'>Payments Terms</Label>
            <Select
                theme={theme}
                className='payments-terms-toggle-button'
                data-testid='payments-terms-toggle-button'
                defaultValue={PaymentsTermsEnum.OneMonth}
            >
                <Option id={`${PaymentsTermsEnum.OneDay}`} value={PaymentsTermsEnum.OneDay}>
                    Net {PaymentsTermsEnum.OneDay} day
                </Option>
                <Option id={`${PaymentsTermsEnum.OneWeek}`} value={PaymentsTermsEnum.OneWeek}>
                    Net {PaymentsTermsEnum.OneWeek} days
                </Option>
                <Option id={`${PaymentsTermsEnum.TwoWeeks}`} value={PaymentsTermsEnum.TwoWeeks}>
                    Net {PaymentsTermsEnum.TwoWeeks} days
                </Option>
                <Option id={`${PaymentsTermsEnum.OneMonth}`} value={PaymentsTermsEnum.OneMonth}>
                    Net {PaymentsTermsEnum.OneMonth} days
                </Option>
            </Select>
        </Fieldset>
    )
}

const Fieldset = styled.fieldset`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`

const Select = styled.select`
    outline: none;
    width: 100%;
    border-radius: 0.5rem;
    padding: 1rem 1.25rem;
    cursor: pointer;
    font-size: 0.75rem;
    line-height: 1rem;
    letter-spacing: -0.25px;
    font-weight: var(--fw-bold);

    ${props => props.theme === 'light' && css`
        background-color: var(--white);
        color: var(--black-secondary);
        border: 1px solid var(--blueish-gray);
    `};

    ${props => props.theme === 'dark' && css`
        background-color: var(--dark-primary);
        color: var(--white);
        border: 1px solid var(--dark-secondary);
    `};
`

const Option = styled.option`
    cursor: pointer;
    padding: 1rem 0;
    border: none;
`