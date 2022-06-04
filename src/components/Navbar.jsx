import React, { useState } from "react";
import Modal from "react-modal";
import {
    Flex,
    IconButton,
    Image,
    Center,
    Button
} from "@chakra-ui/react";
import HelpIcon from "../assets/help_icon.svg";
import MapIcon from "../assets/map_icon.svg";
import LeaderBoardIcon from "../assets/leaderboard_icon.svg";
import CloseIcon from "../assets/close_icon.svg";

import MainPanel from "./MainPanel";
import MainPanelChild from "./MainPanelChild";
import { ClueModal } from './Modal'


class Navbar extends React.Component {
    constructor() {
        super()
        this.state = {
            show: false
        }
        this.showModal = this.showModal.bind(this)
        this.hideModal = this.hideModal.bind(this)
    }

    showModal = () => {
        this.setState({ show: true })
    }

    hideModal = () => {
        this.setState({ show: false })
    }

    render() {
        return (
            <Flex w="100%" pos="fixed" zIndex="100" px="2">

                <Button colorScheme={'yellow'} variant='solid' mt={2} mx={2}>
                    {this.props.name}
                </Button>
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
                            colorScheme="whiteAlpha"
                            isRound="true"
                            onClick={this.showModal}
                        >
                            <Image height="5vh" src={HelpIcon}></Image>
                        </IconButton>
                    </Flex>

                    <Flex position="relative" pr={3} justify="flex-end">
                        <IconButton
                            colorScheme="whiteAlpha"
                            isRound="true"
                            onClick={this.showModal}
                        >
                            <Image height="5vh" src={MapIcon}></Image>
                        </IconButton>
                    </Flex>

                    <Flex position="relative" justify="flex-end">
                        <IconButton
                            colorScheme="whiteAlpha"
                            isRound="true"
                            onClick={this.showModal}
                        >
                            <Image height="5vh" src={LeaderBoardIcon}></Image>
                        </IconButton>
                    </Flex>

                    <ClueModal show={this.state.show} handleClose={this.hideModal}></ClueModal>
                </Flex>
            </Flex>
        )

    }
}

export default Navbar;
