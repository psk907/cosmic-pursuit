import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import MainPanel from "./MainPanel";
import MainPanelChild from "./MainPanelChild";

export const LoginArea = () => {
  return (
    <MainPanel>
      <MainPanelChild>
        <LoginHeader />
        <LoginForm />
      </MainPanelChild>
    </MainPanel>
  );
};

const LoginHeader = () => {
  return (
    <Box textAlign="center">
      <Heading color={"white"}>Sign In</Heading>
    </Box>
  );
};

const LoginForm = () => {
  return (
    <Box my={8} textAlign="left">
      <form>
        <FormControl>
          <FormLabel color={"white"}>Team ID</FormLabel>
          <Input type="number" placeholder="Enter your Team ID" />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel color={"white"}>Password</FormLabel>
          <Input type="password" placeholder="Enter your password" />
        </FormControl>

        <Button width="full" mt={4}>
          Sign In
        </Button>
      </form>
    </Box>
  );
};
