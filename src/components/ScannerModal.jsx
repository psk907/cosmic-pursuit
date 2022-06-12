import { Box, Center, IconButton, Image } from "@chakra-ui/react";
import React, { useState } from "react";
import Modal from "react-modal";
import { QrReader } from "react-qr-reader";
import CircularWindow from "../assets/Circuar_Window.svg";
import CloseIcon from "../assets/close_icon.svg";

/**
 * Modal with a QR Code Scanner
 * 
 * Uses the 'react-qr-reader' package, which has some limitations on Mobile devices.
 * The modal closes and the callbackFn is called once a QR code is scanned.
 *
 * @param {show} show value for show/hide of the modal
 * @param {handleClose} handleClose action to be performed for closing the modal
 * @param {callbackFn} callbackFn Function to be called on pressing 'Submit'
 
 */
export const ScannerModal = ({ show, handleClose, callbackFn }) => {
  const [data, setData] = useState();

  return (
    <Modal
      isOpen={show}
      onRequestClose={() => handleClose(false)}
      className="ReactModal__Overlay"
      overlayClassName="ReactModal__Overlay"
    >
      <Center>
        <div
          style={{
            width: "90vw",
            maxWidth: "500px",
            textAlign: "center",
            aspectRatio: "1",
            backgroundSize: "contain",
            backgroundClip: "border-box",
            backgroundImage: `url(${CircularWindow})`,
            backgroundRepeat: "no-repeat",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "6%",
            position: "absolute",
            top: "25%",
          }}
        >
          <Box
            borderRadius="50%"
            id="qr-reader"
            style={{
              height: "100%",
              width: "100%",
              aspectRatio: 1,
              margin: "0",
              objectFit: "cover",
              padding: "0",
              alignContent: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              overflow: "clip",
            }}
          >
            <QrReader
              constraints={{
                facingMode: "environment",
                aspectRatio: 1,
              }}
              onResult={(result, error) => {
                if (!!result && !data) {
                  console.log(result);

                  setData(result?.text);
                  handleClose(false);
                  return callbackFn(result.text);
                }

                if (!!error) {
                  console.info(error);
                }
              }}
              style={{ width: "100%" }}
            />
          </Box>
        </div>
      </Center>
      <IconButton
        colorScheme="BlackAlpha"
        isRound="true"
        onClick={() => {
          handleClose();
        }}
        style={{
          position: "absolute",
          top: "22%",
          right: 15,
        }}
      >
        <Image height="5vh" src={CloseIcon}></Image>
      </IconButton>
    </Modal>
  );
};
