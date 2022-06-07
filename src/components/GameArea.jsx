import {
  Button,
  FormControl,
  HStack,
  Input,
  Spacer,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Background1 from "../assets/Background1.jpg";
import MainPanel from "./MainPanel";
import MainPanelChild from "./MainPanelChild";
import BottomPanel from "../assets/Bottom_Widget.svg";
import { QRScanner } from "./QRScanner";
import { NewScanner } from "./NewScanner";
export const GameArea = () => {
  const [gameState, setgameState] = useState({});
  const [showScanner, setshowScanner] = useState(false);
  const [scannedKey, setScannedKey] = useState();
  const [riddleAns, setriddleAns] = useState();
  const [loading, setloading] = useState(true);
  const [cookies] = useCookies(["uid"]);
  const [refreshCount, setrefreshCount] = useState(0);
  const [clueIndex, setclueIndex] = useState(0);
  const serverUrl = "http://sd-treasure-hunt.azurewebsites.net";

  useEffect(() => {
    let uid = cookies["uid"];
    // if(!uid)
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
          setrefreshCount(refreshCount + 1);
        }
      })
      .catch((e) => {
        alert(e.response.data);
      });
  };
  const answerRiddle = () => {
    var l = gameState["unlockedClues"].length;
    let uid = cookies["uid"];
    // if(!uid)
    axios
      .post(`${serverUrl}/clues/submitRiddleAnswer`, {
        clueId: gameState["unlockedClues"][l - 1].clueId,
        answer: riddleAns,
        uid: uid,
      })
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          alert(response.data);
          setrefreshCount(refreshCount + 1);
        }
      })
      .catch((e) => {
        alert(e.response.data.message);
      });
  };

  const shouldRenderButtonWidget = () => {
    return (
      (!loading &&
        !gameState.unlockedClues[clueIndex].crackedClue &&
        !gameState.unlockedClues[clueIndex].crackedRiddle) ||
      (!loading &&
        gameState.unlockedClues[clueIndex].crackedClue &&
        !gameState.unlockedClues[clueIndex].crackedRiddle)
    );
  };
  const buttonWidget = () => {
    if (
      !loading &&
      !gameState.unlockedClues[clueIndex].crackedClue &&
      !gameState.unlockedClues[clueIndex].crackedRiddle
    ) {
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
    } else if (
      !loading &&
      gameState.unlockedClues[clueIndex].crackedClue &&
      !gameState.unlockedClues[clueIndex].crackedRiddle
    )
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
    if (
      !loading &&
      gameState.unlockedClues[clueIndex].crackedClue &&
      !gameState.unlockedClues[clueIndex].crackedRiddle
    ) {
      return (
        <VStack>
          <form>
            <FormControl
              mt={4}
              onChange={(event) => setriddleAns(event.target.value)}
              value={riddleAns}
              isRequired
            >
              <Input
                placeholder="Enter the answer to the riddle"
                color={"white"}
              />
            </FormControl>
          </form>
        </VStack>
      );
    }
  };

  // if (!cookies["uid"]) return <Navigate to="/" />;
  return (
    <div
      style={{
        height: "100vh",
        alignItems: "center",
        display: "flex",
        VStackDirection: "column",
        justifyContent: "center",
        background: `linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${Background1})`,
        backgroundSize: "cover",
        backgroundPositionX: "20%",
      }}
    >
      <MainPanel>
        <MainPanelChild h="100%">
          {loading ? (
            <Spinner></Spinner>
          ) : (
            <VStack>
              <HStack w="100%" justify="space-between">
                <Button variant="outline" onClick={decrementClueIndex}>
                  {" "}
                  {"<"}
                </Button>
                <h2>{getFocusedClue().title}</h2>
                <Button variant="outline" onClick={incrementClueIndex}>
                  {" "}
                  {">"}
                </Button>
              </HStack>
              <Spacer></Spacer>
              <h1>{getFocusedClue().body}</h1>

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
              bottom: "-7.6%",
              position: "relative",
              backgroundSize: "contain",
              backgroundClip: "border-box",
              backgroundImage: `url(${BottomPanel})`,
              backgroundRepeat: "no-repeat",
            }}
          >
            {buttonWidget()}
          </div>
        ) : (
          <div></div>
        )}
      </MainPanel>
      <NewScanner
        show={showScanner}
        handleClose={() => setshowScanner(false)}
        callback={(val) => {
          setScannedKey(val);
          validateKey(val);
        }}
      ></NewScanner>
    </div>
  );
};
