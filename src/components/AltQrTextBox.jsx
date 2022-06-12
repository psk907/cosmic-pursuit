import {
  Box,
  Button,
  Center,
  FormControl,
  IconButton,
  Image,
  Input,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Modal from "react-modal";
import CircularWindow from "../assets/Circuar_Window.svg";
import CloseIcon from "../assets/close_icon.svg";

/**
 * UI to input the QR Key in case the scanner doesn't work
 *
 * @param {show} show value for show/hide of the modal
 * @param {handleClose} handleClose action to be performed for closing the modal
 * @param {callbackFn} callbackFn Function to be called on pressing 'Submit'
 * @returns a modal with a textbox to input the QrKey
 */
export const AltQrTextBox = ({ show, handleClose, callbackFn }) => {
  const [qrKey, setQrKey] = useState("");
  const [loading, setLoading] = useState(false);
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
              padding: "4% 10%",
              alignContent: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              overflow: "clip",
            }}
          >
            {/* <Heading>QR CODE</Heading> */}
            <FormControl
              mt={4}
              onChange={(event) => setQrKey(event.target.value)}
              value={qrKey}
              isRequired
            >
              <h4 color={"white"}>Scan the QR and enter the code embedded</h4>
              <Input
                // type="password"
                placeholder="Enter your code"
                color={"white"}
              />
              <br></br>
              <h4
                color={"white"}
                style={{ fontSize: "12px", fontWeight: "lighter" }}
              >
                You may use any camera app of your choice
              </h4>
              <Button
                margin="5% 0%"
                width={"80%"}
                variant="outlined"
                colorScheme="white"
                enabled={!loading}
                onClick={() => {
                  if (!qrKey || qrKey.length == 0) {
                    alert("Please enter the code");
                  } else {
                    setLoading(true);
                    return callbackFn(qrKey);
                  }
                }}
              >
                Submit
              </Button>
            </FormControl>
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
