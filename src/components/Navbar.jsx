import React, { useState } from "react";
import Modal from "react-modal";
import {
  Flex,
  IconButton,
  Image,
  Center,
  Text,
  propNames,
  Button
} from "@chakra-ui/react";
import HelpIcon from "../assets/help_icon.svg";
import MapIcon from "../assets/map_icon.svg";
import LeaderBoardIcon from "../assets/leaderboard_icon.svg";
import CloseIcon from "../assets/close_icon.svg";

import MainPanel from "./MainPanel";
import MainPanelChild from "./MainPanelChild";

Modal.setAppElement("#root");

export const Navbar = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <Flex w="100%" pos="fixed" zIndex="100" px="2">

    <Button colorScheme={'yellow'} variant='solid' mt={2} mx={2}>
    {props.name}
  </Button>
      <Flex
        position="relative"
        pr={3}
        mt={2}
        align="center"
        // bgColor={["none","none","blue.50"]}
        w="100%"
        justify="flex-end"
      >
        <Flex position="relative" pr={3} justify="flex-end">
          <IconButton
            colorScheme="whiteAlpha"
            isRound="true"
            onClick={() => setModalIsOpen(true)}
          >
            <Image height="5vh" src={HelpIcon}></Image>
          </IconButton>
        </Flex>

        <Flex position="relative" pr={3} justify="flex-end">
          <IconButton
            colorScheme="whiteAlpha"
            isRound="true"
            onClick={() => setModalIsOpen(true)}
          >
            <Image height="5vh" src={MapIcon}></Image>
          </IconButton>
        </Flex>

        <Flex position="relative" justify="flex-end">
          <IconButton
            colorScheme="whiteAlpha"
            isRound="true"
            onClick={() => setModalIsOpen(true)}
          >
            <Image height="5vh" src={LeaderBoardIcon}></Image>
          </IconButton>
        </Flex>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          className="ReactModal__Overlay"
        >
          <Center>
            <MainPanel>
              <MainPanelChild>
                <IconButton
                  colorScheme="whiteAlpha"
                  isRound="true"
                  onClick={() => setModalIsOpen(false)}
                >
                  <Image height="5vh" src={CloseIcon}></Image>
                </IconButton>
              </MainPanelChild>
            </MainPanel>
          </Center>
        </Modal>
      </Flex>
    </Flex>
  );
};
