import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import MainPanel from "./MainPanel";
import MainPanelChild from "./MainPanelChild";
import Background1 from "../assets/Background1.jpg";
import { Navigate } from 'react-router'

export const GameArea = () => {
  
  

  console.log("Here");
  return (
    <div
      style={{
        height: "100vh",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        background: `linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${Background1})`,
        backgroundSize: "cover",
        backgroundPositionX: "20%",
      }}
    >
      <MainPanel>
        <MainPanelChild></MainPanelChild>
      </MainPanel>
    </div>
  );
};
