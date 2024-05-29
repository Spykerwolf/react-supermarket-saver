import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import ReceiptLongSharpIcon from "@mui/icons-material/ReceiptLongSharp";
import { NavLink, Outlet } from "react-router-dom";
import SearchPage from "../pages/SearchPage";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useState } from "react";
import { useThemeContext } from "../theme/ThemeContextProvider";
import SearchIcon from "@mui/icons-material/Search";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 0,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Sidebar() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [hideSearchComponent, setHideSearchComponent] = useState(false);
  const { mode, toggleColorMode } = useThemeContext();
  const [addToListItems, setAddToListItems] = useState<any[]>([]);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  function handleLinkToSearch() {
    setHideSearchComponent(false);
  }

  function handleLinkToList() {
    setHideSearchComponent(true);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>
        <AppBar
          position="static"
          open={open}
          variant="outlined"
          color="info"
          elevation={0}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer(true)}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          onClose={toggleDrawer(false)}
          PaperProps={{
            sx: {
              backgroundColor: "#fdd8d8",
            },
          }}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="temporary"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={toggleDrawer(false)}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={toggleDrawer(false)}>
                <ListItemIcon>
                  <SearchIcon />
                </ListItemIcon>
                <NavLink to="/" onClick={handleLinkToSearch}>
                  Search
                </NavLink>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={toggleDrawer(false)}>
                <ListItemIcon>
                  <ReceiptLongSharpIcon />
                </ListItemIcon>
                <NavLink
                  to="/list"
                  onClick={handleLinkToList}
                  state={addToListItems}
                >
                  List
                </NavLink>
              </ListItemButton>
            </ListItem>
          </List>

          <Divider />
        </Drawer>
        <Main open={open}></Main>
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
        <SearchPage
          hideSearchComponent={hideSearchComponent}
          addToListItems={addToListItems}
          setAddToListItems={setAddToListItems}
        />
        <Outlet
          context={{
            addToListItems,
            setAddToListItems,
            setHideSearchComponent,
          }}
        />
      </Box>
    </ThemeProvider>
  );
}
