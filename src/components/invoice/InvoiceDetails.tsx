import Invoice from "../../interfaces";

export default function InvoiceDetails({invoice}: {invoice: Invoice}) {
    return (
        <div
            className='invoice-details'
            data-testid='invoice-details'
        >
            {invoice ? invoice.id: ''}
        </div>
    )
}
