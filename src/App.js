import "./App.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import LoginPage from "./pages/loginPage";
import { Navbar } from "./components/Navbar";
import { Footer } from './components/Footer'


const App = () => {
  return (
    <ChakraProvider>
      <Navbar name="Admin101"></Navbar>
      <LoginPage></LoginPage>
      <Footer></Footer>
    </ChakraProvider>
  );
};

export default App;
