import { PaletteMode } from "@mui/material";

const theme = {};

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          background: {
            default: "#e3dfdf",
          },
          // primary: amber,
          // divider: amber[200],
          // text: {
          //   primary: grey[500],
          //   secondary: grey[500],
          // },
        }
      : {
          // palette values for dark mode
          // primary: grey,
          // divider: grey,
          background: {
            default: "#116D6E",
          },
          // text: {
          //   primary: "#fff",
          //   secondary: grey,
          // },
        }),
  },
});

export default theme;
