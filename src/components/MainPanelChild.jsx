import { Box } from "@chakra-ui/react";
/**
 * Wrap the children in the MainPanel with this to ensure correct margins are applied
 */
export default function MainPanelChild({ children }) {
  return (
    <Box
      style={{
        marginRight: "22%",
        marginLeft: "22%",
        // paddingTop: "2%",
        paddingBottom: "10%",
        display: "flex",
        height: "85%",
        width: "64%",
      }}
    >
      {children}
    </Box>
  );
}
