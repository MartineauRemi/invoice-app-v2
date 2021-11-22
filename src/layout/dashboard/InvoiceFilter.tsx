import { useState, useRef } from 'react'
import styled from 'styled-components'
import arrowDown from '../../assets/icon-arrow-down.svg'
import { Button } from '../../components/Buttons'
import Checkbox from '../../components/form-elements/Checkbox'
import { useThemeContext } from '../../contexts/ThemeProvider'
import useClickOutside from '../../hooks/useClickOutside'

interface InvoiceFilterProps{
    paidFilterActive: boolean;
    pendingFilterActive: boolean;
    draftFilterActive: boolean;
    setPaidFilterActive: (boolean: boolean) => void;
    setPendingFilterActive: (boolean: boolean) => void;
    setDraftFilterActive: (boolean: boolean) => void;
}

export default function InvoiceFilter({paidFilterActive, pendingFilterActive, draftFilterActive, setPaidFilterActive, setPendingFilterActive, setDraftFilterActive}:InvoiceFilterProps){
    const { theme } = useThemeContext()

    //filter form activation / deactivation
    const [filterVisible, setFilterVisible] = useState(false)

    //used for the useClickOutside hook
    const filterRef = useRef<HTMLFormElement>(null)

    /* onChange functions for each checkbox */
    function onChangeDraftCheckbox(): void{ setDraftFilterActive(!draftFilterActive) }
    function onChangePendingCheckbox(): void{ setPendingFilterActive(!pendingFilterActive) }
    function onChangePaidCheckbox(): void{ setPaidFilterActive(!paidFilterActive) }

    //close the filter form when the user clicks outside of it
    useClickOutside(
        filterRef,
        () => {
            if(filterVisible)
                setFilterVisible(false)
        }
    )

    return (
        <Wrapper
            theme={theme}
            data-testid='invoice-filter'
        >
            <ActivationButton 
                className={filterVisible? "active" : ""}
                onClick={() => {setFilterVisible(!filterVisible)}}>
                <p>
                    <em>Filter</em>
                    <em className='mobile-hidden'> by Status</em>
                </p>
                <img
                    src={arrowDown}
                    alt=""
                    aria-hidden='true'
                />
            </ActivationButton>

            <FilterForm
                ref={filterRef}
                className={`filter ${filterVisible? "active" : ""}`}
                theme={theme}
            >
                <Checkbox
                    id='draft'
                    name='Draft'
                    onChange={onChangeDraftCheckbox}
                    checked={draftFilterActive}
                />
                <Checkbox
                    id='pending'
                    name='Pending'
                    onChange={onChangePendingCheckbox}
                    checked={pendingFilterActive}
                />
                <Checkbox
                    id='paid'
                    name='Paid'
                    onChange={onChangePaidCheckbox}
                    checked={paidFilterActive}
                />
            </FilterForm>
        </Wrapper>
    )
}

/*___ Styling ___*/

const Wrapper = styled.div`
    display: grid;
    position: relative;
    grid-template-columns: repeat(2, auto);
    column-gap: 1rem;

    @media screen and (min-width: 768px){
        column-gap: 2.5rem;
    }
`

const ActivationButton = styled(Button)`
    padding: 0;
    background-color: transparent;
    place-self: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    p{
        margin-right: 1rem;
        font-weight: var(--fw-bold);
    }

    img{
        transition: all 0.3s ease-in-out;
    }

    &.active{
        img{
            transform: rotate(180deg);
        }
    }
`

const FilterForm = styled.form`
    transition: all .3s ease-in-out;
    background-color: ${props => props.theme === 'light'? 'var(--white)' : 'var(--dark-ternary)'};
    display: none;
    height: 8rem;
    width: 9.25rem;
    position: absolute;
    bottom: -9.5rem;
    left: -3rem;
    border-radius: 0.5rem;
    padding: 1.5rem;
    z-index: 2;

    @media screen and (min-width: 768px){
        left: -1rem;
    }

    &.active{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
    }
`