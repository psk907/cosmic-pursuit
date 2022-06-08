import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import MainPanel from "./MainPanel";
import MainPanelChild from "./MainPanelChild";

export const LoginArea = () => {
  return (
    <MainPanel>
      <MainPanelChild>
        <VStack height="100%" justify="center">
          <LoginHeader />
          <LoginForm />
        </VStack>
      </MainPanelChild>
    </MainPanel>
  );
};

const LoginHeader = () => {
  return (
    <Box textAlign="center">
      <Heading color={"white"}>Welcome</Heading>
    </Box>
  );
};

const LoginForm = () => {
  const [teamId, setteamId] = useState();
  const [password, setpassword] = useState();
  const navigate = useNavigate();

  const axios = require("axios").default;
  const serverUrl = process.env.REACT_APP_SERVER_URL || "http://localhost:5000";
  const [isLoading, setLoading] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["uid"]);

  // When the page loads, check for UID, if present that means
  // the user has logged in, so we can redirect them to the gamescreen
  // if (cookies["uid"]) {
  //   console.log("Already logged in!");
  //   <Navigate to="/play" />;
  // }

  function handleLogin(event) {
    event.preventDefault();
    setLoading(true);
    // console.log("teamId:", teamId);
    // console.log("password:", password);
    axios
      .post(`${serverUrl}/auth/login`, {
        teamNo: parseInt(teamId) || 0,
        password: password,
      })
      .then(function (response) {
        if (response.status === 200) {
          setCookie("uid", response.data.uid, {
            path: "/",
          });
          navigate("/");
        }
      })
      .catch(function (error) {
        console.log(error);
        if (error.response.status !== 200 && error.response.data !== undefined)
          alert(error.response.data.message);
        else alert(error.message);
      })
      .finally(function () {
        setLoading(false);
      });
  }

  function handleLogout(event) {
    event.preventDefault();
    setLoading(true);
    // console.log("teamId:", teamId);
    // console.log("password:", password);
    removeCookie("uid");
    setLoading(false);
  }

  function handleContinue(event) {
    event.preventDefault();
  }

  return (
    <Box my={8} textAlign="left">
      {cookies["uid"] ? (
        <VStack spacing="25">
          <Link to="/">
            <Button colorScheme="blue">Continue</Button>
          </Link>
          <Button colorScheme="red" variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </VStack>
      ) : (
        <form>
          <FormControl
            onChange={(event) => setteamId(event.target.value)}
            value={teamId}
            isRequired
          >
            <FormLabel color={"white"}>Team ID</FormLabel>
            <Input
              type="number"
              placeholder="Enter your Team ID"
              color={"white"}
            />
          </FormControl>

          <FormControl
            mt={4}
            onChange={(event) => setpassword(event.target.value)}
            value={password}
            isRequired
          >
            <FormLabel color={"white"}>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              color={"white"}
            />
          </FormControl>

          <Button
            width="full"
            mt={4}
            onClick={handleLogin}
            isLoading={isLoading}
            variant="solid"
            background="blue.600"
          >
            Sign In
          </Button>
        </form>
      )}
    </Box>
  );
};
