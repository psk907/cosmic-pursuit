import "./App.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import LoginPage from "./pages/loginPage";

const App = () => {
  return (
    <ChakraProvider>
      <LoginPage></LoginPage>
    </ChakraProvider>
  );
};

export default App;
