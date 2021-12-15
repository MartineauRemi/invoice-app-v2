import { useThemeContext } from '../../contexts/ThemeProvider'
import Invoice from '../../interfaces'
import InvoiceItemFields from './InvoiceItemFields'
import { LightButton } from '../Buttons'
import styled from 'styled-components'
import { FormikProps } from 'formik'

// interface InvoiceItemsListProps{
//     items: InvoiceItem[];
//     setItems: Dispatch<SetStateAction<InvoiceItem[]>>;
// }

export default function InvoiceItemsList({form}: {form: FormikProps<Invoice>}) {
    const { theme } = useThemeContext()

    function getNewId(){
        var id = ''
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        for(let i = 0; i < 2; i++)
            id += chars.charAt(Math.floor(Math.random() * chars.length))
        return id += Math.floor(Math.random() * 1000)
    }

    function onClickAddNewItemBtn(): void{
        form.setFieldValue('items', [...form.values.items, {id: getNewId(), name: '', quantity: 0, price: 0, total: 0}])
    }

    return (
        <Wrapper className="invoice-form-items">
            <h2>Item List</h2>
            <ItemsList>
                {form.values.items.map((item, index) => (
                        <li key={index}>
                            <InvoiceItemFields
                                index={index}
                                data={item}
                                form={form}
                            />
                        </li>
                    )
                )}
            </ItemsList>
            <StyledLightButton onClick={() => onClickAddNewItemBtn()} type='button'>
                + Add New Item
            </StyledLightButton>
        </Wrapper>
    )
}


/*___Styling___*/

const Wrapper = styled.div`
    width: 100%;
    display: grid;
    row-gap: 1.5rem;
`

const ItemsList = styled.ul`
    display: grid;
    row-gap: 1rem;
`

const StyledLightButton = styled(LightButton)`
    width: 100%;
`