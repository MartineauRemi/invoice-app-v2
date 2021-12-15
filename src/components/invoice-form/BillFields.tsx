import TextInput from '../form-elements/TextInput'
import styled from 'styled-components'
import AddressInputsGroup from './AddressInputsGroup'

export default function BillFields(){
    return (
    <>
        <Fieldset className="bill-from">
            <Legend>Bill from</Legend>
            <AddressInputsGroup groupName='sender'/>
        </Fieldset>

        <Fieldset className='bill-to'>
            <Legend>Bill to</Legend>
            <TextInput
                name='client.name'
                className='client-name'
                label="Client's Name"
            />        
            <TextInput
                name='client.email'
                className='client-email'
                label="Client's Email"
            />
            <AddressInputsGroup groupName='client'/>
        </Fieldset>
    </>
    )
}


/*___Styling___*/


const Fieldset = styled.fieldset`
    display: grid;
    row-gap: 1.5rem;

    @media screen and (min-width: 1440px){
        margin-bottom: 3rem;
    }
`

const Legend = styled.legend`
    margin-bottom: 1.5rem;
    color: var(--blue-primary);
    font-weight: var(--fw-bold);
`