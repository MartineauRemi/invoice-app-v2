import { useState } from 'react'
import Globalstyle from './Globalstyle'
import ThemeProvider from './contexts/ThemeProvider'
import Header from './layout/shared/Header'
import Main from './layout/shared/Main'
import Dashboard from './layout/dashboard/Dashboard'
import InvoicesProvider from './contexts/InvoicesProvider'
import InvoiceView from './layout/invoice-view/InvoiceView'
import Invoice from './interfaces'
import InvoiceForm from './components/invoice-form/InvoiceForm'
import DeleteInvoiceModal from './layout/invoice-view/DeleteInvoiceModal'

function App() {
  const [invoiceFormActive, setInvoiceFormActive] = useState<boolean>(false)
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
  const [deleteInvoiceModalActive, setDeleteInvoiceModalActive] = useState(false)

  return (
    <ThemeProvider>
      <InvoicesProvider>
        <div className="App">
          <Globalstyle />
          <Main>
            <Header />
            {selectedInvoice
              ? (
                  <InvoiceView
                    invoice={selectedInvoice}
                    setSelectedInvoice={setSelectedInvoice}
                    setInvoiceFormActive={setInvoiceFormActive}
                    setDeleteInvoiceModalActive={setDeleteInvoiceModalActive}
                  />
               ) : (
                  <Dashboard
                    setInvoiceFormActive={setInvoiceFormActive}
                    setSelectedInvoice={setSelectedInvoice} 
                  />)
            }
            {invoiceFormActive
              ?(<InvoiceForm
                  selectedInvoice={selectedInvoice}
                  setSelectedInvoice={setSelectedInvoice}
                  setInvoiceFormActive={setInvoiceFormActive}
                />
              ): null 
            }

            {selectedInvoice && deleteInvoiceModalActive ? 
              (
                  <DeleteInvoiceModal
                      invoice={selectedInvoice}
                      setSelectedInvoice={setSelectedInvoice}
                      setDeleteInvoiceModalActive={setDeleteInvoiceModalActive}
                  />
              ): null
            }
          </Main>
        </div>
      </InvoicesProvider>
    </ThemeProvider>
  );
}

export default App;