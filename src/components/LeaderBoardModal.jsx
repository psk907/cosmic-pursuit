import { Box, Center, IconButton, Image, VStack } from "@chakra-ui/react";
import React from "react";
import Modal from "react-modal";
import CloseIcon from "../assets/close_icon.svg";
import Frame from "../assets/Popup_Frame.svg";

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
        <div
          style={{
            height: "80vh",
            position: "absolute",
            top: "-15%",
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
              marginRight: "2%",
              marginLeft: "2%",
              paddingTop: "10%",
              paddingBottom: "10%",
              display: "flex",
              // height: "85%",
            }}
          >
            <VStack justify="center">
              <Box h="full"></Box>
            </VStack>
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
          </Box>
        </div>
      </Center>
    </Modal>
  );
};
