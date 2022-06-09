import React, { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import {
  IconButton,
  Image,
  Center,
  Box,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import CloseIcon from "../assets/close_icon.svg";
import axios from "axios";
import Frame from "../assets/Popup_Frame.svg";

Modal.setAppElement("#root");

export const LeaderModal = ({ handleClose, show, iter, children }) => {
  const serverUrl = "http://localhost:5000";
  const [boardState, setboardState] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const count = useRef(0);

  useEffect(() => {
    axios.get(`${serverUrl}/getLeaderboard`).then((res) => {
      res.data = setRank(res.data);
      setboardState(res.data);
      setLoading(false);
    });
  }, [count.current]);

  const setRank = (data) => {
    if (data) {
      for (let i = 0; i < data.length; i++) {
        data[i].rank = i + 1;
      }
    }
    return data;
  };

  const SetTableRow = (team) => {
    return (
      <Tr>
        <Td>
          <p>{team.rank}</p>
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
        <div
          style={{
            height: "80vh",
            position: "absolute",
            top: "10%",
            maxWidth: "600px",
            aspectRatio: 0.5344,
            backgroundSize: "contain",
            backgroundClip: "border-box",
            backgroundImage: `url(${Frame})`,
            backgroundRepeat: "no-repeat",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box
            style={{
              marginRight: "6%",
              marginLeft: "6%",
              paddingTop: "8 %",
              paddingBottom: "8%",
              display: "flex",
              height: "100%",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <IconButton
              colorScheme="BlackAlpha"
              isRound="true"
              onClick={handleClose}
              position="relative"
              top="-7%"
              right="50%"
              zIndex="100"
            >
              <Image height="5vh" src={CloseIcon}></Image>
            </IconButton>
            <Box display="none">
              {count.current === iter ? void 0 : (count.current = iter)}
            </Box>
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th isNumeric color="white">
                      Rank
                    </Th>
                    <Th color="white">Team</Th>
                    <Th isNumeric color="white">
                      Score
                    </Th>
                  </Tr>
                  {boardState.map(SetTableRow)}
                </Thead>
              </Table>
            </TableContainer>
          </Box>
        </div>
      </Center>
    </Modal>
  );
};
