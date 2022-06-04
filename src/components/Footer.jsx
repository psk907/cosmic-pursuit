import {
    Box,
    chakra,
    Container,
    Stack,
    Flex,
    Image,
    Center,
} from '@chakra-ui/react';
import Logo from "../assets/stardust_logo_white.png"

export const Footer = () => {
    return (
        <Flex w="100%" pos="fixed" zIndex="100" bottom={0}>
            <Center>
                <Flex w="50%" mb={4}>
                    <Image src={Logo}>
                    </Image>
                </Flex>
            </Center>
        </Flex>
    );
}