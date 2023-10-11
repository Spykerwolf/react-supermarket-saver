import "../../public/logo.png";
// import { IconButton } from "@mui/material";
// import Brightness4Icon from "@mui/icons-material/Brightness4";
// import Brightness7Icon from "@mui/icons-material/Brightness7";
// import { useThemeContext } from "./theme/ThemeContextProvider";

const MainLogo = () => {
  // const { mode, toggleColorMode } = useThemeContext();

  return (
    <>
      <h1>Supermarket Savings</h1>
      {/* <IconButton onClick={toggleColorMode} color="inherit">
        {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton> */}
      <br></br>
      <img src="logo.png" />
      <br></br>
    </>
  );
};

export default MainLogo;
