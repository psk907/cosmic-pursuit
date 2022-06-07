// To use Html5QrcodeScanner (more info below)
import { Box, Center, IconButton, Image } from "@chakra-ui/react";
// To use Html5Qrcode (more info below)
import { Html5Qrcode } from "html5-qrcode";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import CircularWindow from "../assets/Circuar_Window.svg";
import CloseIcon from "../assets/close_icon.svg";

Modal.setAppElement("#root");
export const QRScanner = ({ handleClose, show, children, callback }) => {
  const qrCodeSuccessCallback = (decodedText, decodedResult) => {
    console.log(decodedText);
    if (showVf) {
      stopScan();
      setshowVf(false);
      console.log("Ho" + decodedText);
      // console.log(decodedResult);
      // callback(decodedText);
      return handleClose();
    }
  };
  const config = { fps: 10, qrbox: { height: 512, width: 512 } };
  const [html5QrCode, sethtml5QrCode] = useState();
  const [showVf, setshowVf] = useState(false);

  useEffect(() => {
    console.log(html5QrCode);
    if (show && !showVf) {
      handleClose();
      stopScan();
    }
    if (showVf && show) {
      var x = new Html5Qrcode("qr-reader");
      sethtml5QrCode(x);
      x.start({ facingMode: "environment" }, config, qrCodeSuccessCallback);
      // setshowVf(true);
    }
  }, [showVf]);
  const stopScan = () => {
    try {
      html5QrCode.stop();
    } catch (e) {
      console.log(e);
    }
  };
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
          ></Box>
        </div>
      </Center>
      <IconButton
        colorScheme="BlackAlpha"
        isRound="true"
        onClick={() => {
          setshowVf(!showVf);
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 15,
        }}
      >
        <h1>S</h1>
      </IconButton>
      <IconButton
        colorScheme="BlackAlpha"
        isRound="true"
        onClick={() => {
          stopScan();
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
};
