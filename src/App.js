import "./App.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import LoginPage from "./pages/loginPage";
import { Navbar } from "./components/Navbar";

const App = () => {
  return (
    <ChakraProvider>
      <Navbar name="Admin101"></Navbar>
    </ChakraProvider>
  );
};

export default App;
