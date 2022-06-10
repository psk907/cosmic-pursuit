import Background1 from "../assets/backgroundvector.svg";

export default function PageBackdrop({ children }) {
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
        backgroundRepeat: "no-repeat",
        backgroundColor: "#00002C",
        backgroundPositionX: "20%",
      }}
    >
      {children}
    </div>
  );
}
