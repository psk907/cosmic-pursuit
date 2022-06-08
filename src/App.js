import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { useCookies } from "react-cookie";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Footer } from "./components/Footer";
import { GameArea } from "./components/GameArea";
import { Navbar } from "./components/Navbar";
import LoginPage from "./pages/loginPage";

const App = () => {
  const [cookies] = useCookies(["uid"]);

  // Version 1: Using objects
  const theme = extendTheme({
    styles: {
      global: {
        // styles for the `body`
        body: {
          color: "white",
        },
        // styles for the `a`
        a: {
          color: "gray.200",
          // _hover: {
          //   textDecoration: "underline",
          // },
        },
      },
    },
  });
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/login" element={<LoginPage />} />
          <Route
            exact
            path="/"
            element={!cookies["uid"] ? <LoginPage /> : <GameArea />}
          />
        </Routes>
        <Footer />
      </Router>
    </ChakraProvider>
  );
};

export default App;
