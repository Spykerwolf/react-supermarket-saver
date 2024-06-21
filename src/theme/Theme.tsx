import { PaletteMode } from "@mui/material";
import { amber, grey, orange } from "@mui/material/colors";

const theme = {
  palette: {
    primary: grey,
    background: {
      default: "#e3dfdf",
      orange: "#ffd17d",
    },
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
            primary: grey[500],
            secondary: grey[500],
          },
        }
      : {
          // palette values for dark mode
          primary: grey,
          divider: grey,
          background: {
            default: orange,
            paper: orange,
          },
          text: {
            primary: "#fff",
            secondary: grey,
          },
        }),
  },
});

export default theme;
