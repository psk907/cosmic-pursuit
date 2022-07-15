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

/**
 * Modal window showing help for signing in.
 *
 * @param {show} show value for show/hide of the modal
 * @param {handleClose} handleClose action to be performed for closing the modal
 *
 * @returns a modal with text as the rules
 */
export const HelpModal = ({ handleClose, show, children }) => {
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
          <IconButton
            colorScheme="BlackAlpha"
            isRound="true"
            onClick={handleClose}
            position="relative"
            top="-2%"
            left="-45%"
            zIndex="100"
          >
            <Image height="5vh" src={CloseIcon}></Image>
          </IconButton>
          <Box
            style={{
              marginRight: "8%",
              marginLeft: "8%",
              // marginTop: "10%",
              marginBottom: "10%",
              display: "flex",
              height: "100%",
              flexDirection: "column",
              alignItems: "center",
              overflowY: "scroll",
            }}
          >
            <Heading>Help</Heading>
            <Text p={2}>
              <ol
                style={{
                  listStyleType: "none",
                }}
              >
                <li>
                  1) This website was developed for use during a live Treasure
                  Hunt competition.
                </li>
                <br />
                <li>
                  2) If you were a participant, you can use your existing
                  credentials.
                </li>
                <br />
                <li>
                  3) Otherwise, you can use the following credentials:
                  <br />
                  <b>Team ID: </b>
                  <code>101</code>
                  <br />
                  <b>Password: </b>
                  <code>PASS</code>
                  <br />
                  <b>Team ID: </b>
                  <code>102</code>
                  <br />
                  <b>Password: </b>
                  <code>PASS</code>
                  <br />
                  <b>Team ID: </b>
                  <code>103</code>
                  <br />
                  <b>Password: </b>
                  <code>PASS</code>
                </li>
                <br />

                <li>
                  4) Internet access and QR codes/solutons is needed for
                  answering the questions.
                </li>
              </ol>
            </Text>
          </Box>
        </div>
      </Center>
    </Modal>
  );
};
