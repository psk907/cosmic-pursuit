import React, { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import {
  Flex,
  IconButton,
  Image,
  Center,
  VStack,
  Box,
  Text,
  Heading,
  HStack,
  Spacer,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import CloseIcon from "../assets/close_icon.svg";
import MainPanel from "./MainPanel";
import MainPanelChild from "./MainPanelChild";
import axios from "axios";

Modal.setAppElement("#root");

export const LeaderModal = ({ handleClose, show, iter, children }) => {
  const serverUrl = "http://localhost:5000";
  const [boardState, setboardState] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const count = useRef(0);

  useEffect(() => {
    axios.get(`${serverUrl}/getLeaderboard`).then((res) => {
      setboardState(res.data);
      setLoading(false);
      console.log("useEffect");
    });
  }, [count.current]);

  const SetTableRow = (team) => {
    return (
      <Box p={1} borderRadius="lg" shadow="md" m={0} w="100%" bgGradient='linear(to-l, #1A2980, #021B79)'>
        <Grid templateColumns="repeat(5, 1fr)" gap={4} w="100%">
          <GridItem colSpan={3} h="10">
            <Heading size={5} pr={5} mt={1}>
              {team.teamName}
            </Heading>
          </GridItem>
          <GridItem colStart={4} colEnd={6} h="10">
          <Heading size='sm' mt={1}>{team.score}</Heading>
          </GridItem>
        </Grid>
        {/* <HStack dir="row" m={0} w='100%'>
          <Heading size={5} pr={5} w='50%'>
            {team.teamName}
          </Heading>
         
        </HStack> */}
      </Box>
    );
  };

  // TODO: Add a black tint under the modal as an overlay
  return (
    <Modal
      isOpen={show}
      onRequestClose={handleClose}
      className="ReactModal__Overlay"
      overlayClassName="ReactModal__Overlay"
    >
      <Center>
        <MainPanel>
          <MainPanelChild>
            <VStack w="100%">
              <Flex mb={2}>
                <IconButton
                  colorScheme="BlackAlpha"
                  isRound="true"
                  onClick={handleClose}
                >
                  <Image height="5vh" src={CloseIcon}></Image>
                </IconButton>
              </Flex>
              <Box h="full" pb={20} w={200}>
                <Heading size="md" pb={2} mt={-1}>
                  Leader Board
                </Heading>
                {!isLoading ? (
                  <VStack h="full" overflowY="scroll">
                  {count.current === iter ? void 0 : (count.current = iter)}
                    {boardState.map(SetTableRow)}
                  </VStack>
                ) : (
                  void 0
                )}
              </Box>
            </VStack>
          </MainPanelChild>
        </MainPanel>
      </Center>
    </Modal>
  );
};
