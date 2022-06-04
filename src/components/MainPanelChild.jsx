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
        marginTop: "10%",
        marginBottom: "10%",
      }}
    >
      {children}
    </Box>
  );
}
