import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import styled, { css } from 'styled-components'
import leftArrow from "../../../assets/icon-arrow-left.svg"
import rightArrow from "../../../assets/icon-arrow-right.svg"
import { useThemeContext }from '../../../contexts/ThemeProvider'
import { Button } from '../../Buttons'

interface CalendarProps{
    calendarActive: boolean;
    setCalendarActive: Dispatch<SetStateAction<boolean>>;
    pickedDate: Date;
    setPickedDate: Dispatch<SetStateAction<Date>>;
}

interface DayProps{
    day: number;
    isNextMonth: boolean;
}

export default function Calendar({calendarActive, setCalendarActive, pickedDate, setPickedDate}: CalendarProps) {
    const {theme} = useThemeContext()

    const [date, setDate] = useState<Date>(pickedDate ? pickedDate : new Date())

    function lastDayOfTheMonth(date: Date){
        var newDate = new Date()
        newDate.setMonth(date.getMonth() + 1)
        newDate.setDate(0)
        return newDate.getDate()
    }

    function getDays(){
        var days = []
        var lastDayOfMonth = lastDayOfTheMonth(date)
        for(var i = 0; i < 35; i++){
            days.push({day: i % (lastDayOfMonth) + 1, isNextMonth: (i >= lastDayOfMonth)})
        }
        return days
    }
    
    function onClickLeftArrow(e: any){
        e.preventDefault()
        var newDate= new Date()
        newDate.setFullYear(date.getFullYear())
        newDate.setMonth(date.getMonth() - 1)
        setDate(newDate)
        
    }

    function onClickRightArrow(e: any){
        e.preventDefault()
        var newDate = new Date()
        newDate.setFullYear(date.getFullYear())
        newDate.setMonth(date.getMonth() + 1)
        newDate.setDate(15)
        setDate(newDate)
    }

    function onClickDay(day: DayProps){
        var newPickedDate = date;
        newPickedDate.setDate(day.day)
        setPickedDate(newPickedDate)
        setCalendarActive(false)
    }

    function dateCalendarDisplayFormat(){
        var dateFormat = date.toDateString().split(' ')
        return dateFormat[1] + " " + dateFormat[3]
    }

    /**
     * set the date to the corresponding picked date
     */
    useEffect(() => {
        if(!calendarActive)
            setDate(pickedDate)
    }, [calendarActive, pickedDate, setDate])

    useEffect(() => {}, [date])

    var days = getDays()

    return (
        <Wrapper theme={theme} className='calendar'>
            <Controls className="calendar-ctrls">
                <StyledButton onClick={(e) => onClickLeftArrow(e)}>
                    <img src={leftArrow} alt=""/>
                </StyledButton>
                    <CurrentMonth theme={theme}>{dateCalendarDisplayFormat()}</CurrentMonth>
                <StyledButton onClick={(e) => onClickRightArrow(e)}>
                    <img src={rightArrow} alt=""/>
                </StyledButton>
            </Controls>
            <DaysList>
                {days.map((day, index) => {
                    return (
                    <Day
                        key={index}
                        className={`day ${day.isNextMonth ? 'day--next-month' : ''}`}
                        theme={theme}
                        onClick={() => onClickDay(day)}>
                        {day.day}
                    </Day>)
                })}
            </DaysList>        
        </Wrapper>
    )
}

/*___Styling___*/
const Wrapper = styled.div`
    border-radius: 0.5rem;
    width: 100%;
    padding: 1.5rem 1.25rem;
    background-color: ${props => props.theme === 'light' ? 'var(--white)' : 'var(--dark-ternary)'};
`

const Controls = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 2rem;
`

const CurrentMonth = styled.span`
    color: ${props => props.theme === 'light' ? 'var(--black-secondary)' : 'var(--gray)'};
    font-size: 0.75rem;
    line-height: 1rem;
    letter-spacing: -0.25px;
    font-weight: var(--fw-bold);
`

const StyledButton = styled(Button)`
    padding: 0.5rem;
    background-color: transparent;
`

const DaysList = styled.ul`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    row-gap: 1rem;
`

const Day = styled.li`
    cursor: pointer;
    width: 100%;
    height: 100%;
    text-align: center;
    font-weight: var(--fw-bold);
    font-size: 0.75rem;
    line-height: 1rem;
    letter-spacing: -0.25px;
    color: ${props => props.theme === 'light' ? 'var(--black-secondary)' : 'var(--blueish-gray)'};

    &.day--next-month{
        color: ${props => props.theme === 'light' ? 'rgb(200, 200, 200, 0.7)': 'rgba(223, 227, 250, 0.1)'};
    }
    
    &:hover{
        color: var(--blue-secondary);
    }
`