import { useField, FieldHookConfig } from "formik"
import styled, { css } from "styled-components"
import { useThemeContext } from "../../contexts/ThemeProvider"

interface TextInputProps{
    label: string;
}
export default function TextInput(props: TextInputProps & FieldHookConfig<string>){
    const [field, meta] = useField(props)
    const { theme } = useThemeContext()
    return (
        <Wrapper
            className={props.className}
            data-testid={`${props.name}-text-input-container`}
        >
            <Label 
              className={meta.error && meta.touched? 'error': ''}
              htmlFor={props.id || props.name}
              theme={theme}
            >
              {props.label}
            </Label>
            <Input theme={theme} className={`text-input ${meta.error && meta.touched? 'error': ''}`} type='text' {...field} />
            {meta.touched && meta.error
                ? (
                    <ErrorMsg className='error'>
                        {meta.error}
                    </ErrorMsg>
                )
                : null}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    position: relative;

    .error{
        color: var(--red-primary);
    }
`

const Input = styled.input`
    padding: 1rem;
    border-radius: 0.5rem;
    outline: none;
    width: 100%;
    font-size: 0.75rem;
    line-height: 1rem;
    letter-spacing: -0.25px;

    &:hover{
        border: 1px solid var(--blue-primary);
    }

    &:focus{
        border: 1px solid var(--blue-primary);
    }

    &.error{
        border: 1px solid var(--red-primary);
    }

    ${props => props.theme === 'light' && css`
        border: 1px solid var(--blueish-gray);
    `};

    ${props => props.theme === 'dark' && css`
        border: 1px solid var(--dark-secondary);
        background-color: var(--dark-secondary);
        color: var(--white);
    `};
`

const ErrorMsg = styled.div`
    position: absolute;
    bottom: -1.125rem;
    left: 0;
    margin-top: 0.5rem;
    font-weight: bold;
    font-size: 0.75rem;
`

const Label = styled.label`
    margin-bottom: 0.625rem;
    font-size: 0.75rem;
    line-height: 1rem;
    letter-spacing: -0.25px;
    font-weight: var(--fw-medium);
    display: block;

    &.error{
        color: $red-primary;
    }

    color: ${props => props.theme === 'light' ? 'var(--blue-ternary)' : 'var(--gray)'};
`