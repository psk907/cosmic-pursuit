import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  Heading,
  HStack,
  Input,
  Spacer,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import parse from "html-react-parser";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import BottomPanel from "../assets/Bottom_Widget.svg";
import Disqualified from "../assets/DEAD.svg";
import TopPanel from "../assets/Top_Widget.svg";
import { AltQrTextBox } from "./AltQrTextBox";
import MainPanel from "./MainPanel";
import MainPanelChild from "./MainPanelChild";
import PageBackdrop from "./PageBackdrop";
import { ScannerModal } from "./ScannerModal";

export const GameArea = () => {
  const [gameState, setgameState] = useState({});
  const [showScanner, setshowScanner] = useState(false);
  const [showAltQrTextBox, setshowAltQrTextBox] = useState(false);
  const [scannedKey, setScannedKey] = useState();
  const [riddleAns, setriddleAns] = useState();
  const [loading, setloading] = useState(true);
  const [cookies] = useCookies(["uid"]);
  const [refreshCount, setrefreshCount] = useState(0);
  const [clueIndex, setclueIndex] = useState(0);
  const serverUrl = process.env.REACT_APP_SERVER_URL || "";

  useEffect(() => {
    let uid = cookies["uid"];

    axios
      .get(`${serverUrl}/getGameState`, {
        headers: {
          uid: uid,
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          setgameState(response.data);
          initializeClueIndex(response.data);
          setloading(false);
        }
      });
  }, [refreshCount]);

  const isQrStage = () => {
    return (
      !loading &&
      !gameState.unlockedClues[clueIndex].crackedClue &&
      !gameState.unlockedClues[clueIndex].crackedRiddle
    );
  };

  const isRiddleStage = () => {
    return (
      !loading &&
      gameState.unlockedClues[clueIndex].crackedClue &&
      !gameState.unlockedClues[clueIndex].crackedRiddle
    );
  };

  const initializeClueIndex = (data) => {
    let l = data["unlockedClues"].length;
    setclueIndex(l - 1);
  };

  const getFocusedClue = () => {
    return gameState["unlockedClues"][clueIndex];
  };

  const decrementClueIndex = () => {
    if (clueIndex === 0) return;
    setclueIndex(clueIndex - 1);
  };

  const incrementClueIndex = () => {
    if (clueIndex + 1 === gameState["unlockedClues"].length) return;
    setclueIndex(clueIndex + 1);
  };

  const validateKey = (val) => {
    var l = gameState["unlockedClues"].length;
    let uid = cookies["uid"];
    console.log(val);
    if (val) {
      val = val.toLowerCase();
    }
    axios
      .post(`${serverUrl}/clues/validateQRKey`, {
        clueId: gameState["unlockedClues"][l - 1].clueId,
        scanKey: val,
        uid: uid,
      })
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          alert(response.data);
          setshowAltQrTextBox(false);
          setrefreshCount(refreshCount + 1);
        }
      })
      .catch((e) => {
        alert("Invalid code. Please use the QR on the puzzle sheet only.");
        // alert(e.response.data);
      });
  };
  const answerRiddle = () => {
    var l = gameState["unlockedClues"].length;
    let uid = cookies["uid"];
    if (!riddleAns) {
      alert("Please type the answer to the puzzle handed over to you.");
      return;
    }
    axios
      .post(`${serverUrl}/clues/submitRiddleAnswer`, {
        clueId: gameState["unlockedClues"][l - 1].clueId,
        answer: riddleAns.toUpperCase(),
        uid: uid,
      })
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          alert(response.data.message);
          setrefreshCount(refreshCount + 1);
        }
      })
      .catch((e) => {
        alert(e.response.data.message);
      });
  };

  const shouldRenderButtonWidget = () => {
    return isQrStage() || isRiddleStage();
  };

  const buttonWidget = () => {
    if (isQrStage()) {
      return (
        <Button
          margin="5% 0%"
          width={"80%"}
          variant="unstyled"
          onClick={() => setshowScanner(true)}
        >
          Scan QR
        </Button>
      );
    } else if (isRiddleStage())
      return (
        <Button
          margin="5% 0%"
          width={"80%"}
          variant="unstyled"
          onClick={answerRiddle}
        >
          Submit
        </Button>
      );
  };

  const bottomWidget = () => {
    if (isRiddleStage()) {
      return (
        <VStack>
          <form>
            <h3 style={{ fontSize: "11px", fontWeight: "lighter" }}>
              Solve the puzzle and enter your answer here
            </h3>
            <FormControl
              mt={4}
              onChange={(event) => setriddleAns(event.target.value)}
              value={riddleAns}
              onSubmit={answerRiddle}
              isRequired
            >
              <Input placeholder="Enter the puzzle's answer" color="white" />
            </FormControl>
          </form>
        </VStack>
      );
    } else if (isQrStage()) {
      return (
        <>
          <h3 style={{ fontSize: "12px", fontWeight: "lighter" }}>
            {getFocusedClue().level === 0
              ? "Scan the QR code on the puzzle-sheet handed over to you"
              : "Once you reach the location, scan the QR code on the puzzle-sheet handed over to you"}
          </h3>
          <h4
            style={{
              fontSize: "12px",
              fontWeight: "lighter",
              textDecoration: "underline",
            }}
          >
            Unable to scan? &nbsp;
            <button
              style={{ textDecoration: "underline" }}
              onClick={() => setshowAltQrTextBox(true)}
            >
              {" "}
              Click here
            </button>
          </h4>
        </>
      );
    }
  };

  // if (!cookies["uid"]) return <Navigate to="/" />;
  return (
    <PageBackdrop>
      {!loading && gameState.isEliminated === true ? (
        <div
          style={{
            width: "85%",
            maxWidth: "600px",
            position: "absolute",
            textAlign: "center",
            aspectRatio: 5.28,
            position: "relative",
            backgroundSize: "contain",
            backgroundClip: "border-box",
            backgroundImage: `url(${Disqualified})`,
            backgroundRepeat: "no-repeat",
            padding: "20% 14%",
          }}
        >
          <Heading size="l">YOU ARE ELIMINATED !!</Heading>
          <br />
          <p>
            The top 10 teams would be advancing to the next level.
            <br />
            <br />
            Thank you for your participation !!
          </p>
          <div
            style={{
              width: "47%",
              aspectRatio: 2.87,
              bottom: "-2%",
              position: "relative",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          ></div>
        </div>
      ) : (
        <MainPanel>
          <div
            style={{
              width: "64.92%",
              textAlign: "center",
              aspectRatio: 5.28,
              top: "-10.5%",
              position: "relative",
              backgroundSize: "contain",
              backgroundClip: "border-box",
              backgroundImage: `url(${TopPanel})`,
              backgroundRepeat: "no-repeat",
            }}
          >
            <HStack width="full" justify="space-between" px="22%">
              <Button variant="unstyled" onClick={decrementClueIndex}>
                <ChevronLeftIcon />
              </Button>
              <Text style={{ fontSize: "10", fontWeight: "bold" }}>
                {!loading ? getFocusedClue().title : ""}
              </Text>
              <Button
                variant="unstyled"
                onClick={incrementClueIndex}
                p="0"
                m="0"
              >
                <ChevronRightIcon />
              </Button>
            </HStack>
          </div>
          <MainPanelChild>
            {loading ? (
              <VStack justify="center" width="90%">
                <Spinner color="white" marginBottom="2rem"></Spinner>

                <Heading size="l">Loading...</Heading>
              </VStack>
            ) : (
              <VStack px="4%">
                <h3 style={{ fontSize: "15", fontWeight: "bold" }}>
                  {getFocusedClue().level === 0
                    ? "Instructions:"
                    : isQrStage()
                    ? "Use this 4-liner to figure out the next location:"
                    : "Congrats you've reached the right location !"}
                </h3>
                <div
                  style={{
                    fontSize: 14,
                    paddingTop: "12",
                    overflowY: "scroll",
                    fontStyle: "italic",
                  }}
                >
                  {'"'}
                  {parse(getFocusedClue().body)}
                  {'"'}
                </div>
                <Spacer></Spacer>
                {bottomWidget()}
              </VStack>
            )}
          </MainPanelChild>
          {shouldRenderButtonWidget() ? (
            <div
              style={{
                width: "47%",
                textAlign: "center",
                aspectRatio: 2.87,
                bottom: "-2%",
                position: "relative",
                backgroundSize: "contain",
                backgroundClip: "border-box",
                backgroundImage: `url(${BottomPanel})`,
                backgroundRepeat: "no-repeat",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {buttonWidget()}
            </div>
          ) : (
            <div
              style={{
                width: "47%",
                aspectRatio: 2.87,
                bottom: "-2%",
                position: "relative",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
              }}
            ></div>
          )}
        </MainPanel>
      )}
      <ScannerModal
        show={showScanner}
        handleClose={setshowScanner}
        callbackFn={validateKey}
      ></ScannerModal>
      <AltQrTextBox
        show={showAltQrTextBox}
        handleClose={setshowAltQrTextBox}
        callbackFn={validateKey}
      ></AltQrTextBox>
    </PageBackdrop>
  );
};
