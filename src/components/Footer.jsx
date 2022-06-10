import { Center, Flex, Image } from "@chakra-ui/react";
import Logo from "../assets/stardust_logo_white.png";

export const Footer = () => {
  return (
    <Flex
      w="100vw"
      alignItems="center"
      justifyContent="center"
      pos="absolute"
      zIndex="100"
      bottom={0}
    >
      <Center>
        <Image mb={4} w="40%" maxW="400px" src={Logo}></Image>
      </Center>
    </Flex>
  );
};
