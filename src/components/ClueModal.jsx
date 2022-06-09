import {
  Box,
  Center,
  Heading,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import React from "react";
import Modal from "react-modal";
import CloseIcon from "../assets/close_icon.svg";
import Frame from "../assets/Popup_Frame.svg";

Modal.setAppElement("#root");

export const InfoModal = ({ handleClose, show, children }) => {
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
            <Heading>Rules</Heading>
            <Text p={2}>
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum."
            </Text>
          </Box>
        </div>
      </Center>
    </Modal>
  );
};
