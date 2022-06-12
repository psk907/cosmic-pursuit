import { Box, Center, IconButton, Image, VStack } from "@chakra-ui/react";
import React from "react";
import { MapInteractionCSS } from "react-map-interaction";
import Modal from "react-modal";
import CloseIcon from "../assets/close_icon.svg";
import Map from "../assets/map.svg";
import Frame from "../assets/Popup_Frame.svg";

Modal.setAppElement("#root");

/**
 * Modal showing the map of the Treasure Hunt
 * 
 * The map can be panned and zoomed within the UI.
 *
 * @param {show} show value for show/hide of the modal
 * @param {handleClose} handleClose action to be performed for closing the modal
 
 * @returns a modal with the SVG Map in an interactive frame
 */
export const MapModal = ({ handleClose, show, children }) => {
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
            zIndex: "2",
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
            <MapInteractionCSS>
              <Image src={Map} fit="cover" />
            </MapInteractionCSS>
          </Box>
        </div>
      </Center>
    </Modal>
  );
};

// src\assets\Popup_Frame.svg
