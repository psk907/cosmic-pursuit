import { Box } from "@chakra-ui/react";
/**
 * Wrap the children in the MainPanel with this to ensure correct margins are applied
 */
export default function MainPanelChild({ children }) {
  return (
    <Box
      style={{
        marginRight: "20%",
        marginLeft: "20%",
        paddingTop: "10%",
        // paddingBottom: "10%",
        display: "flex",
        height: "85%",
      }}
    >
      {children}
    </Box>
  );
}
