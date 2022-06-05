import { Spinner } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Background1 from "../assets/Background1.jpg";
import MainPanel from "./MainPanel";
import MainPanelChild from "./MainPanelChild";
import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
export const GameArea = () => {
  const [gameState, setgameState] = useState({});
  const [cookies] = useCookies(["uid"]);

  const serverUrl = process.env.SERVER_URL || "http://localhost:5000";

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
        console.log(response.status);
        if (response.status === 200) {
          setgameState(response.data);
        }
      });
  }, []);
  console.log("Here");
  // if (!cookies["uid"]) return <Navigate to="/" />;
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
        <MainPanelChild>
          {gameState === {} ? <Spinner></Spinner> : <p>{gameState.teamName}</p>}
        </MainPanelChild>
      </MainPanel>
    </div>
  );
};
