import { PaletteMode } from "@mui/material";
import { blue, grey, lightGreen, orange } from "@mui/material/colors";

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          background: {
            default: "#e3dfdf",
            inputfields: "#FFFFFF",
            rowitems: "#d5d0cf",
            appbar: blue[500],
            drawer: "#e3c6c6",
            listitems: "#FFFFFF",
            listitemshover: grey[200],
            listitemschecked: "#b5b5b5",
          },

          secondary: {
            main: "#ffc65d",
          },

          searchbutton: {
            main: "#FFA500",
          },

          filterbutton: {
            main: grey[400],
          },

          badgedot: {
            main: "#eaff26",
          },

          favicon: {
            main: "#e07eff",
          },

          darkmodetoggle: {
            main: "#000000",
          },

          linktext: {
            main: blue[500],
          },
        }
      : {
          // palette values for dark mode
          background: {
            default: "#116D6E",
            rowitems: "#34665a",
            appbar: "#2D3250",
            drawer: "#3d5858",
            listitems: "#2c7e6b",
            listitemshover: grey[200],
            listitemschecked: "#165445",
          },

          secondary: {
            main: "#9f8b67",
          },

          favicon: {
            main: "#eaff26",
          },

          darkmodetoggle: {
            main: "#eaff26",
          },

          searchbutton: {
            main: "#7077A1",
          },

          filterbutton: {
            main: orange[400],
          },

          badgedot: {
            main: "#ffa726",
          },

          linktext: {
            main: "#FFFF",
          },

          text: {
            secondary: grey[800],
          },
        }),
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "unset",
        },
      },
    },
  },
});
