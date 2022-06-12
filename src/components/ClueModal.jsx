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
 * Modal window showing the Rules of the contest
 *
 * @param {show} show value for show/hide of the modal
 * @param {handleClose} handleClose action to be performed for closing the modal
 *
 * @returns a modal with text as the rules
 */
export const InfoModal = ({ handleClose, show, children }) => {
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
            <Heading>Rules</Heading>
            <Text p={2}>
              <ol>
                <li>
                  1) All the clues will be hidden in the vicinity of the Map
                  provided. (Inside the campus of MSRIT)
                </li>
                <li>
                  2) You have to complete the treasure hunt within a stipulated
                  time period.
                </li>
                <li>
                  3) The clues will be handed over to the teams by the STARDUST
                  Volunteers.
                </li>
                <li>4) Do not break anything.</li>
                <li>
                  5) Don't jump over compounds or harm plants or property.
                </li>
                <li>
                  6) Teams are not permitted inside any classrooms or staff
                  rooms.
                </li>
                <li>
                  7) Team members should not scream around the campus when
                  classes are in session, as strict disciplinary rules must be
                  maintained.
                </li>
                <li>
                  8) If a team/teams continues to disturb the discipline of the
                  campus even after warning, immediate action will be taken
                  leading to disqualification.
                </li>
                <li>
                  9) Internet access is needed for answering the questions.
                </li>
                <li>
                  10) The website can be accessed by a maximum of 2 users from a
                  team.
                </li>
                <li>
                  11) The winner will be decided based on the team which
                  finishes the hunt first
                </li>
                <li>
                  12) Incase of any dispute, the decision of RIT STARDUST will
                  be final
                </li>
              </ol>
            </Text>
          </Box>
        </div>
      </Center>
    </Modal>
  );
};
