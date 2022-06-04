import React from "react";
import Background1 from "../assets/Background1.jpg";
import { LoginArea } from "../components/LoginForm";
const LoginPage = () => {
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
      <LoginArea />
    </div>
  );
};

export default LoginPage;
