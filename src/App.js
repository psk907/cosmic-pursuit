import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import LoginPage from "./pages/loginPage";
import { GameArea } from "./components/GameArea";
import { Navigate } from "react-router";
import { useCookies } from "react-cookie";

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["uid"]);
  return (
    <ChakraProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route
            exact
            path="/play"
            element={cookies["uid"] ? <GameArea /> : <LoginPage />}
          />
        </Routes>
        <Footer />
      </Router>
    </ChakraProvider>
  );
};

export default App;
