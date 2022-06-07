// To use Html5QrcodeScanner (more info below)
import { Box, Center, IconButton, Image } from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import Modal from "react-modal";
import { QrReader } from "react-qr-reader";
import CircularWindow from "../assets/Circuar_Window.svg";
import CloseIcon from "../assets/close_icon.svg";

export const NewScanner = ({ show, handleClose, callback }) => {
  const [data, setData] = useState();

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
            padding: "8.5%",
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
              }}
              onResult={(result, error) => {
                if (!!result) {
                  console.log(result);

                  setData(result?.text);
                  handleClose();
                  callback(result.text);
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
          top: 0,
          right: 15,
        }}
      >
        <Image height="5vh" src={CloseIcon}></Image>
      </IconButton>
    </Modal>
  );

  return (
    <>
      <p>{data}</p>
    </>
  );
};
