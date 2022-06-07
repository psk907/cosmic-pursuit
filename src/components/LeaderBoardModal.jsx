import React, { useState, useEffect } from "react";
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
} from "@chakra-ui/react";
import CloseIcon from "../assets/close_icon.svg";
import MainPanel from "./MainPanel";
import MainPanelChild from "./MainPanelChild";
import axios from "axios";

Modal.setAppElement("#root");

export const LeaderModal = ({ handleClose, show, children }) => {
  const serverUrl = "https://sd-treasure-hunt.azurewebsites.net";
  const [boardState, setboardState] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    axios.get(`${serverUrl}/getLeaderboard`).then((res) => {
      setboardState(res.data);
      setLoading(false);
    });
  });

  const SetTableRow = (team) => {
    return (
      <Box p={1} borderRadius="lg" shadow="md" m={0}>
        <HStack dir="row" m={0}>
          <Heading size={5} pr={5}>
            {team.teamName}
          </Heading>
          <Text>{team.score}</Text>
        </HStack>
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
            <VStack>
              <Flex mb={2}>
                <IconButton
                  colorScheme="BlackAlpha"
                  isRound="true"
                  onClick={handleClose}
                >
                  <Image height="5vh" src={CloseIcon}></Image>
                </IconButton>
              </Flex>
              <Box h="full" pb={16}>
                <Heading size="md" pb={2} mt={-1}>
                  Leader Board
                </Heading>

                {!isLoading ? (
                  <VStack
                    h="full"
                    overflowY="scroll"
                  >
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