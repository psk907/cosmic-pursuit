import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { useCookies } from "react-cookie";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import GamePage from "./pages/gamePage";
import LoginPage from "./pages/loginPage";

const App = () => {
  const [cookies] = useCookies(["uid"]);

  const theme = extendTheme({
    styles: {
      global: {
        body: {
          color: "white",
        },
        a: {
          color: "gray.200",
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
            element={!cookies["uid"] ? <LoginPage /> : <GamePage />}
          />
        </Routes>
        <Footer />
      </Router>
    </ChakraProvider>
  );
};

export default App;
