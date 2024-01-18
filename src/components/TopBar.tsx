import { Box, IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useThemeContext } from "./theme/ThemeContextProvider";

export const TopBar = () => {
  const { mode, toggleColorMode } = useThemeContext();

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        paddingLeft={2}
        paddingRight={2}
      >
        <h1>Supermarket Savings</h1>
        <IconButton onClick={toggleColorMode} color="inherit">
          {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Box>
    </>
  );
};
