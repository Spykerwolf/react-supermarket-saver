import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ReceiptLongSharpIcon from "@mui/icons-material/ReceiptLongSharp";
import { NavLink, Outlet } from "react-router-dom";
import SearchPage from "../pages/SearchPage";
import { ThemeProvider } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useEffect, useState } from "react";
import { useThemeContext } from "../theme/ThemeContextProvider";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import { db } from "../auth/firebase";
import { getDoc, doc } from "firebase/firestore";

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
  const { theme } = useThemeContext();
  const [open, setOpen] = useState(false);
  const [hideSearchComponent, setHideSearchComponent] = useState(false);
  const { mode, toggleColorMode } = useThemeContext();

  const [addToListItemsNewWorld, setAddToListItemsNewWorld] = useState<any[]>(
    []
  );
  const [addToListItemsCountdown, setAddToListItemsCountdown] = useState<any[]>(
    []
  );
  const [addToListItemsPaknSave, setAddToListItemsPaknSave] = useState<any[]>(
    []
  );

  async function getExistingListItems() {
    const docListItemsRefPaknSave = doc(db, "List items", "PaknSave");
    const docListItemSnapPaknSave = await getDoc(docListItemsRefPaknSave);
    const docListItemsRefNewWorld = doc(db, "List items", "NewWorld");
    const docListItemSnapNewWorld = await getDoc(docListItemsRefNewWorld);
    const docListItemsRefCountdown = doc(db, "List items", "Countdown");
    const docListItemSnapCountdown = await getDoc(docListItemsRefCountdown);

    setAddToListItemsPaknSave(await docListItemSnapPaknSave.data()?.list);
    setAddToListItemsNewWorld(await docListItemSnapNewWorld.data()?.list);
    setAddToListItemsCountdown(await docListItemSnapCountdown.data()?.list);
  }

  useEffect(() => {
    getExistingListItems();
  }, []);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  function handleLinkToSearch() {
    setHideSearchComponent(false);
    toggleDrawer(false);
  }

  function handleLinkToList() {
    setHideSearchComponent(true);
    toggleDrawer(false);
  }

  return (
    <ThemeProvider theme={theme}>
      <Box id="MainBox">
        <AppBar
          position="static"
          open={open}
          variant="outlined"
          elevation={0}
          sx={{ bgcolor: "background.appbar" }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer(true)}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              {addToListItemsPaknSave.length > 0 ||
              addToListItemsCountdown.length > 0 ||
              addToListItemsNewWorld.length > 0 ? (
                <Badge color="badgedot" variant="dot">
                  <MenuIcon />
                </Badge>
              ) : (
                <MenuIcon />
              )}
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          id="SideBarDrawer"
          onClose={toggleDrawer(false)}
          PaperProps={{
            sx: {
              bgcolor: "background.drawer",
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
          <List>
            <NavLink
              to="/"
              onClick={handleLinkToSearch}
              color="inherit"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItem disablePadding>
                <ListItemButton onClick={toggleDrawer(false)}>
                  <ListItemIcon>
                    <SearchIcon />
                  </ListItemIcon>
                  Search
                </ListItemButton>
              </ListItem>
            </NavLink>
            <NavLink
              to="/list"
              onClick={handleLinkToList}
              color="inherit"
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
              state={[
                addToListItemsNewWorld,
                addToListItemsCountdown,
                addToListItemsPaknSave,
              ]}
            >
              <ListItem disablePadding>
                <ListItemButton onClick={toggleDrawer(false)}>
                  <ListItemIcon>
                    <Badge
                      badgeContent={
                        addToListItemsPaknSave &&
                        addToListItemsCountdown &&
                        addToListItemsNewWorld
                          ? addToListItemsNewWorld.length +
                            addToListItemsCountdown.length +
                            addToListItemsPaknSave.length
                          : 0
                      }
                      color="primary"
                    >
                      <ReceiptLongSharpIcon />
                    </Badge>
                  </ListItemIcon>
                  List
                </ListItemButton>
              </ListItem>
            </NavLink>
          </List>

          {/* <Divider /> */}
        </Drawer>
        <Main open={open}></Main>
        <Box justifyContent="center" display="flex" id="LogoBox">
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
              color="darkmodetoggle"
            >
              {mode === "dark" ? <LightModeIcon /> : <Brightness4Icon />}
            </IconButton>
          </Box>
        </Box>
        <SearchPage
          hideSearchComponent={hideSearchComponent}
          addToListItemsNewWorld={addToListItemsNewWorld}
          setAddToListItemsNewWorld={setAddToListItemsNewWorld}
          addToListItemsCountdown={addToListItemsCountdown}
          setAddToListItemsCountdown={setAddToListItemsCountdown}
          addToListItemsPaknSave={addToListItemsPaknSave}
          setAddToListItemsPaknSave={setAddToListItemsPaknSave}
        />
        <Outlet
          context={{
            addToListItemsNewWorld,
            setAddToListItemsNewWorld,
            addToListItemsCountdown,
            setAddToListItemsCountdown,
            addToListItemsPaknSave,
            setAddToListItemsPaknSave,
            setHideSearchComponent,
          }}
        />
      </Box>
    </ThemeProvider>
  );
}
