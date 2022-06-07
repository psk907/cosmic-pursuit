import React, { useState } from "react";
import Modal from "react-modal";
import {
  Flex,
  IconButton,
  Image,
  Center,
  Button,
  VStack,
  Box,
} from "@chakra-ui/react";
import CloseIcon from "../assets/close_icon.svg";
import Map from "../assets/map.jpg";
import MainPanel from "./MainPanel";
import MainPanelChild from "./MainPanelChild";
import { MapInteractionCSS } from "react-map-interaction";

Modal.setAppElement("#root");

export const MapModal = ({ handleClose, show, children }) => {
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

              <Box h="full">
                <MapInteractionCSS>
                  <Image src={Map} />
                </MapInteractionCSS>
              </Box>
            </VStack>
          </MainPanelChild>
        </MainPanel>
      </Center>
    </Modal>
  );
};