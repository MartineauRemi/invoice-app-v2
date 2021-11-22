import { useState } from 'react'
import Globalstyle from './Globalstyle'
import ThemeProvider from './contexts/ThemeProvider'
import Header from './layout/shared/Header'
import Main from './layout/shared/Main'
import Dashboard from './layout/dashboard/Dashboard'
import InvoicesProvider from './contexts/InvoicesProvider'
import InvoiceDetails from './components/invoice/InvoiceDetails'
import Invoice from './interfaces'

function App() {
  const [invoiceFormActive, setInvoiceFormActive] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)

  return (
    <ThemeProvider>
      <InvoicesProvider>
        <div className="App">
          <Globalstyle />
          <Main>
            <Header />
            {selectedInvoice
              ? <InvoiceDetails invoice={selectedInvoice} />
               : (
                  <Dashboard
                    setInvoiceFormActive={setInvoiceFormActive}
                    setSelectedInvoice={setSelectedInvoice} 
                  />)
            }
          </Main>
        </div>
      </InvoicesProvider>
    </ThemeProvider>
  );
}

export default App;