import { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
import DatePicker from '../form-elements/date-picker/DatePicker'
import TextInput from '../form-elements/TextInput'
import PaymentsTerms from './PaymentsTerms'

export interface DatePickerProps{
    pickedDate: Date;
    setPickedDate: Dispatch<SetStateAction<Date>>;
}

export default function DateAndTerms({pickedDate, setPickedDate}: DatePickerProps){
    return (
        <Fieldset>
            <DatePicker
                pickedDate={pickedDate}
                setPickedDate={setPickedDate}
            />
            <PaymentsTerms />
            <TextInput
                name='description'
                className='project-description'
                label='Project Description'
            />
        </Fieldset>
    )
}

/*___Styling___*/
const Fieldset = styled.fieldset`
    display: grid;
    row-gap: 1.5rem;

    @media screen and (min-width: 768px){
        column-gap: 1.5rem;
        grid-template-columns: repeat(2, auto);
        grid-template-rows: repeat(2, auto);
        grid-template-areas: 'date terms' 'description description';

        .date-picker{
            grid-area: date;
        }

        .payments-terms{
            grid-area: terms;
        }

        .project-description{
            grid-area: description;
        }
    }
`