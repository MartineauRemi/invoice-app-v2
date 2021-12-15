import styled from 'styled-components'
import TextInput from '../form-elements/TextInput'

export default function AddressInputsGroup({groupName}: {groupName:string}) {
    return (
        <Wrapper>
            <TextInput
                name={`${groupName}.address.street`}
                className={`street ${groupName}-street`}
                label={`${groupName}'s Street Address`}
            />
            <TextInput
                name={`${groupName}.address.city`}
                className={`city ${groupName}-city`}
                label={`${groupName}'s City`}
            />
            <TextInput
                name={`${groupName}.address.postCode`}
                className={`post-code ${groupName}-post-code`}
                label={`${groupName}'s Post Code`}
            />
            <TextInput
                name={`${groupName}.address.country`}
                className={`country ${groupName}-country`}
                label={`${groupName}'s Country`}
            />
        </Wrapper>
    )
}


/*___Styling___*/

const Wrapper = styled.div`
    display: grid;
    row-gap: 1.5rem;
    column-gap: 1.5rem;

    @media screen and (min-width: 768px){
        grid-template-areas: 'address address address' 'city code country';

        .street{
            grid-area: address;
        }
        .city{
            grid-area: city;
        }
        .post-code{
            grid-area: code;
        }
        .country{
            grid-area: country;
        }
    }
`