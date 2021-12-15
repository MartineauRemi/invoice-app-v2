import { InvoiceItem } from "../interfaces";


/** 
 * @param items
 * @returns the sum of the total of each item, 0 if the list is empty
 */
export const calculateInvoiceTotal = (items: InvoiceItem[]): number =>  {
    items.map(item => console.log("quantity: " + item.quantity + ", price: " + item.price + ', total: ' + item.total))
    const total = items.reduce((acc, curr) => acc + curr.total, 0)
    return total
}