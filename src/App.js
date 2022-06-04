import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import LoginPage from "./pages/loginPage";

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
