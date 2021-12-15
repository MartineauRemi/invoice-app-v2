import {  useState } from 'react'
import styled, { css } from 'styled-components'
import Calendar from './Calendar'
import calendar from "../../../assets/icon-calendar.svg"
import { dateFormat } from '../../../helpers/date'
import { DatePickerProps } from '../../invoice-form/DateAndTerms'
import { Label } from '../../invoice-form/InvoiceForm'
import { Button } from '../../Buttons'
import { useThemeContext } from '../../../contexts/ThemeProvider'



export default function DatePicker({pickedDate, setPickedDate}: DatePickerProps) {
    const { theme } = useThemeContext()
    const [calendarActive, setCalendarActive] = useState(false)

    function onClickCalendarButton(e: any){
        e.preventDefault()
        setCalendarActive(!calendarActive)
    }

    return (
        <Wrapper className="date-picker" data-testid='date-picker'>
            <Label htmlFor="date">Invoice Date</Label>
            <DatePickerButton
                theme={theme}
                className="invoice-form__date-input"
                onClick={onClickCalendarButton}
            >
                <span>{dateFormat(pickedDate)}</span>
                <img src={calendar} alt="calendar icon" width="16px" height="16px"/>
            </DatePickerButton>
            {calendarActive
                ? (
                    <CalendarContainer>
                        <Calendar
                            calendarActive={calendarActive}
                            setCalendarActive={setCalendarActive}
                            pickedDate={pickedDate}
                            setPickedDate={setPickedDate}/>
                    </CalendarContainer>
                )
                : null}
        </Wrapper>
    )
}


/*___Styling___*/
const Wrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`

const DatePickerButton = styled(Button)`
    outline: none;
    width: 100%;
    border-radius: 0.5rem;
    padding: 1rem 1.25rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
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

const CalendarContainer = styled.div`
    width: 100%;
    position: absolute;
    //bottom: - calc(100% + 0.5rem);
    bottom: -16.5rem;
    left: 0;
    z-index: 3;
    box-shadow: 0px 10px 20px ${props => props.theme === 'light' ? 'rgba(72, 84, 159, 0.25)' : 'rgba(0,0,0,0.25)'};
`
