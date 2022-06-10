import { Box, Center, Heading, IconButton, Image } from "@chakra-ui/react";
import React, { useState } from "react";
import Modal from "react-modal";
import QrReader from "react-qr-scanner";
import CircularWindow from "../assets/Circuar_Window.svg";
import CloseIcon from "../assets/close_icon.svg";

export const NewScanner = ({ show, handleClose, callbackFn }) => {
  const [data, setData] = useState();

  const handleScan = (d) => {
    setData(d);
    console.log(d);
  };
  const handleError = (err) => {
    console.error(err);
  };
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
              delay={100}
              onError={handleError}
              onScan={handleScan}
              style={{ width: "100%" }}
              legacyMode={true}
              facingMode="rear"
            />
          </Box>
          <Heading>{data}</Heading>
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
