import { Box, IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useThemeContext } from "./theme/ThemeContextProvider";

export const TopBar = () => {
  const { mode, toggleColorMode } = useThemeContext();

  return (
    <>
      <Box justifyContent="center" display={"flex"}>
        <Box display="inline-flex" justifyContent="center">
          <h1>Supermarket Savings </h1>
        </Box>
        <Box display="inline-flex" justifyContent="center">
          <IconButton
            sx={{
              marginLeft: 2,
              margin: "auto",
            }}
            onClick={toggleColorMode}
            color="inherit"
          >
            {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
      </Box>
    </>
  );
};
