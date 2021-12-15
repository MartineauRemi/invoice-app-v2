import React, { useState, useContext, createContext } from 'react'
import data from "../data/invoices.json"
import Invoice from '../interfaces'

export interface InvoicesContextInterface{
    invoices: Invoice[];
    addInvoice: (invoice: Invoice) => void;
    updateInvoice: (invoice: Invoice) => void;
    removeInvoice: (id: string) => void;
    removeAllInvoices: () => void;
    generateNewInvoiceId: () => string;
}

const MAX_INVOICES = 1000
const InvoicesContext = createContext<InvoicesContextInterface>({} as InvoicesContextInterface)

export const useInvoicesContext = () => useContext(InvoicesContext)

export default function InvoicesProvider({children}: any){
    const [invoices, setInvoices] = useState<Invoice[]>(data)

    /**
     * @returns an invoice ID string  pattern for invoices ID: /^[A-Z]{2}[0-9]{4}$/
     * e.g. #RM9264
     */
    function generateNewInvoiceId() :string{
        var id = ''
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        for(let i = 0; i < 2; i++)
            id += chars.charAt(Math.floor(Math.random() * chars.length))
        return id += Math.floor(Math.random() * MAX_INVOICES)
    }

    /**
     * @param newInvoice invoice to add to the invoices list
     */
    function addInvoice(newInvoice: Invoice): void{
        var correspondingInvoice = invoices.find(invoice => invoice.id === newInvoice.id)
        if(!correspondingInvoice)
            setInvoices([...invoices, newInvoice])
    }

    /**
     * @param updatedInvoice which will replace it's older version in the list
     */
    function updateInvoice(updatedInvoice: Invoice) :void{
        var updatedList = invoices.map(invoice => invoice.id === updatedInvoice.id
                    ? updatedInvoice
                    : invoice
        )
        setInvoices(updatedList)
    }

    /**
     * @param id of the invoice to remove from the list
     */
    function removeInvoice(id :string) :void{
        setInvoices(invoices.filter(invoice => invoice.id !== id))
    }

    function removeAllInvoices(): void{
        setInvoices([])
    }

    const invoicesContextValue = {
        invoices,
        addInvoice,
        updateInvoice,
        removeInvoice,
        removeAllInvoices,
        generateNewInvoiceId,
    }

    return (
        <InvoicesContext.Provider value={invoicesContextValue}>
            {children}
        </InvoicesContext.Provider>
    )
}
