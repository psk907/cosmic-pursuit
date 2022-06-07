import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import LoginPage from "./pages/loginPage";
import { GameArea } from "./components/GameArea";
import { Navigate } from "react-router";
import { useCookies } from "react-cookie";

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
