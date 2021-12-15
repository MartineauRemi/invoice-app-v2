import * as Yup from 'yup'

export const InvoiceFormValidationSchema = Yup.object().shape({
    sender: Yup.object().shape({
        address: Yup.object().shape({
            street: Yup.string()
                .max(56, 'Must be 56 characters or less')
                .required('Required'),
            city: Yup.string()
                .max(20, 'Must be 20 characters or less')
                .required('Required'),
            postCode: Yup.string()
                .max(10, 'Must be 10 characters or less')
                .required('Required'),
            country: Yup.string()
                .max(20, 'Must be 20 characters or less')
                .required('Required'),
        })
    }),
    client: Yup.object().shape({
        name: Yup.string()
        .max(24, 'Must be 24 characters or less')
        .required('Required'),
        email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
        address: Yup.object().shape({
            street: Yup.string()
                .max(56, 'Must be 56 characters or less')
                .required('Required'),
            city: Yup.string()
                .max(20, 'Must be 20 characters or less')
                .required('Required'),
            postCode: Yup.string()
                .max(10, 'Must be 10 characters or less')
                .required('Required'),
            country: Yup.string()
                .max(20, 'Must be 20 characters or less')
                .required('Required'),
        })
    }),
    description: Yup.string()
        .max(56, 'Must be 56 characters or less')
        .required('Required'),
    items: Yup.array().of(Yup.object().shape({
        name: Yup.string()
            .max(56, 'Must be 56 characters or less')
            .required('Required'),
        quantity: Yup.number()
            .typeError('Invalid input')
            .integer('Invalid input')
            .required('Required'),
        price: Yup.number()
            .typeError('Invalid input')
            .required('Required'),
    })).min(1, 'You must add at least one item')
})