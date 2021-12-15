export interface Address{
    street: string;
    city: string;
    postCode: string;
    country: string;
}

export interface InvoiceItem{
    id: string;
    name: string;
    quantity: number;
    price: number;
    total: number;
}

export enum PaymentsTermsEnum{
    OneDay= 1,
    OneWeek= 7,
    TwoWeeks= 15,
    OneMonth= 30
}

export enum InvoiceStatusEnum{
    Draft = 'draft',
    Pending = 'pending',
    Paid = 'paid'
}

export default interface Invoice{
    id: string;
    createdAt: string;
    paymentDue: string;
    description: string;
    paymentsTerms: PaymentsTermsEnum;
    status: string;
    client: {
        name: string;
        email: string;
        address: Address;
    }
    sender: {
        address: Address;
    }
    items: InvoiceItem[];
    total: number;
}