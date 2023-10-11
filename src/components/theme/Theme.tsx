import { PaletteMode } from "@mui/material";
import { amber, grey } from "@mui/material/colors";

const theme = {
  palette: {
    primary: grey,
  },
};

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: amber,
          divider: amber[200],
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }
      : {
          // palette values for dark mode
          primary: grey,
          divider: grey,
          background: {
            default: grey,
            paper: grey,
          },
          text: {
            primary: "#fff",
            secondary: grey,
          },
        }),
  },
});

export default theme;
