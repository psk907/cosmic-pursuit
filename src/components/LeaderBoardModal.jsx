import React, { useState } from "react";
import Modal from "react-modal";
import { Flex, IconButton, Image, Center, Button } from "@chakra-ui/react";
import CloseIcon from "../assets/close_icon.svg";

import MainPanel from "./MainPanel";
import MainPanelChild from "./MainPanelChild";

Modal.setAppElement("#root");

export const LeaderModal = ({ handleClose, show, children }) => {
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
            <IconButton
              colorScheme="BlackAlpha"
              isRound="true"
              onClick={handleClose}
            >
              <Image height="5vh" src={CloseIcon}></Image>
            </IconButton>
          </MainPanelChild>
        </MainPanel>
      </Center>
    </Modal>
  );
};
