import MainWindow from "../assets/MainWindowBg.svg";

/**
 * Renders the Panel Graphic with appropriate scaling and layout
 */
const MainPanel = ({ children }) => {
  return (
    <div
      style={{
        width: "90vw",
        maxWidth: "500px",
        textAlign: "left",
        aspectRatio: 0.912,
        backgroundSize: "contain",
        backgroundClip: "border-box",
        backgroundImage: `url(${MainWindow})`,
        backgroundRepeat: "no-repeat",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {children}
    </div>
  );
};

export default MainPanel;
