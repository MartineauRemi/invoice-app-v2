import Globalstyle from './Globalstyle'
import ThemeProvider from './contexts/ThemeProvider'
import Header from './layout/shared/Header'
import styled from 'styled-components'


const Main = styled.main`
  position: relative;
`

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Globalstyle />
        <Main>
          <Header />
        </Main>
      </div>
    </ThemeProvider>
  );
}

export default App;