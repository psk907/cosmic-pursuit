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
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
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
      <Tr>
        <Td>
          <p>x</p>
        </Td>
        <Td>
          <p>{team.teamName}</p>
        </Td>
        <Td>
          <p>{team.score}</p>
        </Td>
      </Tr>
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
          <div>
            <IconButton
              colorScheme="BlackAlpha"
              isRound="true"
              onClick={handleClose}
              position="relative"
              top="-45"
              right="-15"
            >
              <Image height="5vh" src={CloseIcon}></Image>
            </IconButton>
            {/*             
              <Heading size="md" pb={2} mt={-1}>
              Leaderboard
              </Heading>
            */}
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th isNumeric>Rank</Th>
                    <Th>Team</Th>
                    <Th isNumeric>Score</Th>
                  </Tr>
                </Thead>

                {count.current === iter ? void 0 : (count.current = iter)}

                {boardState.map(SetTableRow)}
              </Table>
            </TableContainer>
          </div>
        </MainPanel>
      </Center>
    </Modal>
  );
};
