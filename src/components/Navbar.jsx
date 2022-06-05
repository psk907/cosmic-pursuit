import { Button, Text, Flex, IconButton, Image } from "@chakra-ui/react";
import { useState } from "react";
import HelpIcon from "../assets/help_icon.svg";
import LeaderBoardIcon from "../assets/leaderboard_icon.svg";
import MapIcon from "../assets/map_icon.svg";
import { ClueModal } from "./Modal";
import eventLogo from "../assets/cosmic_pursuit.png";
import { useCookies } from "react-cookie";

export const Navbar = () => {
    const [cookies, setCookie, removeCookie] = useCookies(["uid"]);
  const [show, setshow] = useState(false);
  const showModal = (event) => {
    setshow(true);
  };

  const hideModal = (event) => {
    setshow(false);
  };
  return (
    <Flex w="100%" pos="fixed" zIndex="100" px="2">
      <Image
        src={eventLogo}
        ml="3"
        mt="1"
        height="5vh"
        alignSelf="center"
      ></Image>
      <Flex
        position="relative"
        pr={3}
        mt={2}
        align="center"
        // bgColor={["none","none","blue.50"]}
        w="100%"
        justify="flex-end"
      >
        <Flex position="relative" pr={3} justify="flex-end">
          <IconButton
            isDisabled= {cookies["uid"]? false: true}
            colorScheme="whiteAlpha"
            isRound="true"
            onClick={showModal}
          >
            <Image height="5vh" src={HelpIcon}></Image>
          </IconButton>
        </Flex>

        <Flex position="relative" pr={3} justify="flex-end">
          <IconButton
          isDisabled= {cookies["uid"]? false: true}
            colorScheme="whiteAlpha"
            isRound="true"
            onClick={showModal}
          >
            <Image height="5vh" src={MapIcon}></Image>
          </IconButton>
        </Flex>

        <Flex position="relative" justify="flex-end">
          <IconButton
          isDisabled= {cookies["uid"]? false: true}
            colorScheme="whiteAlpha"
            isRound="true"
            onClick={showModal}
          >
            <Image height="5vh" src={LeaderBoardIcon}></Image>
          </IconButton>
        </Flex>

        <ClueModal show={show} handleClose={hideModal}></ClueModal>
      </Flex>
    </Flex>
  );
};
