import {
  Box,
  Center,
  IconButton,
  Image,
  Button,
  FormControl,
  Input,
} from "@chakra-ui/react";

import React, { useState } from "react";
import Modal from "react-modal";
import { QrReader } from "react-qr-reader";
import CircularWindow from "../assets/Circuar_Window.svg";
import CloseIcon from "../assets/close_icon.svg";

export const AltQrTextBox = ({ show, handleClose, callbackFn }) => {
  const [data, setData] = useState();
  const [password,setpassword] = useState('');
  const [loading,setLoading] = useState(false);
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
            {/* <Heading>QR CODE</Heading> */}
            <FormControl
              mt={4}
              onChange={(event) => setpassword(event.target.value)}
              value={password}
              isRequired
            >
              <h4 color={"white"}>Password</h4>
              <Input
                // type="password"
                placeholder="Enter your code"
                color={"white"}
              />
              <Button
                margin="5% 0%"
                width={"80%"}
                variant="unstyled"
                enabled = {!loading}
                onClick={()=>{
                  if(!password ||password.length==0){
                      alert("Enter password")
                  }
                  else{
                    setLoading(true);
                  return callbackFn(password);}
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
