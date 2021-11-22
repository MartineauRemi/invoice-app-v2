interface Address{
    street: string;
    city: string;
    postCode: string;
    country: string;
}

interface InvoiceItem{
    name: string;
    quantity: number;
    price: number;
    total: number;
}

export default interface Invoice{
    id: string;
    createdAt: string;
    paymentDue: string;
    description: string;
    paymentsTerms: number;
    clientsName: string;
    clientsEmail: string;
    status: string;
    sendersAddress: Address;
    clientsAddress: Address;
    items: InvoiceItem[];
    total: number;
}