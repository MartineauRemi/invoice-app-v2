import Globalstyle from './Globalstyle'
import ThemeProvider from './contexts/ThemeProvider'
import Header from './layout/shared/Header';


function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Globalstyle />
        <h1>Hello world</h1>
        <Header />
      </div>
    </ThemeProvider>
  );
}

export default App;