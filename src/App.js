import './App.css';
import { LoginPage } from './components/LoginForm';
import { ChakraProvider, extendTheme } from "@chakra-ui/react";


const App = () => {
    return (
        <ChakraProvider>
          <LoginPage />
        </ChakraProvider>
      )
}

export default App;
