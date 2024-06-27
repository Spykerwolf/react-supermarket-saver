import { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { useOutletContext } from "react-router-dom";
import { CheckboxListProps } from "../types/types";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Divider from "@mui/material/Divider";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Snackbar from "@mui/material/Snackbar";
import Button from "@mui/material/Button";
import CopyAllIcon from "@mui/icons-material/CopyAll";

import {
  handleAddListToFirebaseNewWorld,
  handleAddListToFirebaseCountdown,
  handleAddListToFirebasePaknSave,
} from "./Table";
import { OpenInNew } from "@mui/icons-material";

export default function CheckboxList() {
  const {
    addToListItemsCountdown,
    addToListItemsPaknSave,
    addToListItemsNewWorld,
    setAddToListItemsCountdown,
    setAddToListItemsPaknSave,
    setAddToListItemsNewWorld,
    setHideSearchComponent,
  }: CheckboxListProps = useOutletContext();

  const [itemsChecked, setItemsChecked] = useState<string[]>([]);
  const [selectedNewWorld, setSelectedNewWorld] = useState<readonly number[]>(
    []
  );

  const [selectedCountdown, setSelectedCountdown] = useState<readonly number[]>(
    []
  );
  const [selectedPaknSave, setSelectedPaknSave] = useState<readonly number[]>(
    []
  );

  const [newworldItemsNameOnly, setNewworldItemsNameOnly] = useState([]);
  const [countdownItemsNameOnly, setCountdownItemsNameOnly] = useState([]);
  const [paknsaveItemsNameOnly, setPaknsaveItemsNameOnly] = useState([]);

  const [prevLengthCountdown, setPrevLengthCountdown] = useState(
    addToListItemsCountdown.length + 1
  );
  const [prevLengthNewWorld, setPrevLengthNewWorld] = useState(
    addToListItemsNewWorld.length + 1
  );
  const [prevLengthPaknSave, setPrevLengthPaknSave] = useState(
    addToListItemsPaknSave.length + 1
  );

  const [openSnack, setOpenSnack] = useState(false);

  useEffect(() => {
    setHideSearchComponent(true);
  }, []);

  useEffect(() => {
    console.log(newworldItemsNameOnly);
  }, [setNewworldItemsNameOnly]);

  useEffect(() => {
    setPrevLengthNewWorld(addToListItemsNewWorld.length + 2);
    handleAddListToFirebaseNewWorld(addToListItemsNewWorld, prevLengthNewWorld);
  }, [addToListItemsNewWorld]);

  useEffect(() => {
    setPrevLengthCountdown(addToListItemsCountdown.length + 2);
    handleAddListToFirebaseCountdown(
      addToListItemsCountdown,
      prevLengthCountdown
    );
  }, [addToListItemsCountdown]);

  useEffect(() => {
    setPrevLengthPaknSave(addToListItemsPaknSave.length + 2);
    handleAddListToFirebasePaknSave(addToListItemsPaknSave, prevLengthPaknSave);
  }, [addToListItemsPaknSave]);

  const handleToggle = (name: string) => () => {
    const productExists = itemsChecked.some((item) => name.includes(item));
    function handleProductDelete(productToDelete: string) {
      setItemsChecked((products: string[]) =>
        products.filter((prod) => prod !== productToDelete)
      );
    }
    productExists
      ? handleProductDelete(name)
      : setItemsChecked([...itemsChecked, name]);
  };

  function handleOpenURL(URL: string) {
    open(URL, "_blank", "noopener,noreferrer");
  }

  function handleProductDelete() {
    setAddToListItemsNewWorld((products: string[]) =>
      products.filter(
        (prod) => !itemsChecked.some((item) => prod.includes(item))
      )
    );
    setAddToListItemsCountdown((products: string[]) =>
      products.filter(
        (prod) => !itemsChecked.some((item) => prod.includes(item))
      )
    );

    setAddToListItemsPaknSave((products: string[]) =>
      products.filter(
        (prod) => !itemsChecked.some((item) => prod.includes(item))
      )
    );

    setItemsChecked([]);
    setSelectedNewWorld([]);
    setSelectedCountdown([]);
    setSelectedPaknSave([]);
  }

  const handleClickNewWorld = (id: number) => {
    const selectedIndex = selectedNewWorld.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedNewWorld, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedNewWorld.slice(1));
    } else if (selectedIndex === selectedNewWorld.length - 1) {
      newSelected = newSelected.concat(selectedNewWorld.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedNewWorld.slice(0, selectedIndex),
        selectedNewWorld.slice(selectedIndex + 1)
      );
    }
    setSelectedNewWorld(newSelected);
  };

  const handleClickCountdown = (id: number) => {
    const selectedIndex = selectedCountdown.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedCountdown, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedCountdown.slice(1));
    } else if (selectedIndex === selectedCountdown.length - 1) {
      newSelected = newSelected.concat(selectedCountdown.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedCountdown.slice(0, selectedIndex),
        selectedCountdown.slice(selectedIndex + 1)
      );
    }
    setSelectedCountdown(newSelected);
  };

  const handleClickPaknSave = (id: number) => {
    const selectedIndex = selectedPaknSave.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedPaknSave, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedPaknSave.slice(1));
    } else if (selectedIndex === selectedPaknSave.length - 1) {
      newSelected = newSelected.concat(selectedPaknSave.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedPaknSave.slice(0, selectedIndex),
        selectedPaknSave.slice(selectedIndex + 1)
      );
    }
    setSelectedPaknSave(newSelected);
  };

  function showAnimation() {
    return (
      <div
        style={{
          justifyContent: "center",
          display: "flex",
          backgroundColor: "background.default",
        }}
      >
        <DotLottieReact
          style={{
            width: "40%",
            height: "40%",
          }}
          src="src\lotties\shoppyLotty.json"
          loop
          autoplay
        />
      </div>
    );
  }

  function handleCopyItemToClipboard(item: string) {
    setOpenSnack(true);
    navigator.clipboard.writeText(item);
  }

  const handleCloseSnack = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };

  let newworldArray: string[] = [];
  let countdownArray: string[] = [];
  let paknsaveArray: string[] = [];

  function handleCopyNewWorldItemsToClipboard() {
    setOpenSnack(true);

    addToListItemsNewWorld.forEach((e) =>
      newworldArray.push(e.split(" /// ").pop())
    );
    navigator.clipboard.writeText(
      "New World\n" + newworldArray.toString().replaceAll(",", "\n")
    );
  }

  function handleCopyCountdownItemsToClipboard() {
    setOpenSnack(true);

    addToListItemsCountdown.forEach((e) =>
      countdownArray.push(e.split(" /// ").pop())
    );

    navigator.clipboard.writeText(
      "Countdown\n" + countdownArray.toString().replaceAll(",", "\n")
    );
  }

  function handleCopyPaknSaveItemsToClipboard() {
    setOpenSnack(true);

    addToListItemsPaknSave.forEach((e) =>
      paknsaveArray.push(e.split(" /// ").pop())
    );
    navigator.clipboard.writeText(
      "Pak n Save\n" + paknsaveArray.toString().replaceAll(",", "\n")
    );
  }

  function handleCopyAllGroceryItemsToClipboard() {
    let newworldArray: string[] = [];
    let countdownArray: string[] = [];
    let paknsaveArray: string[] = [];

    addToListItemsNewWorld.forEach((e) =>
      newworldArray.push(e.split(" /// ").pop())
    );

    addToListItemsCountdown.forEach((e) =>
      countdownArray.push(e.split(" /// ").pop())
    );

    addToListItemsPaknSave.forEach((e) =>
      paknsaveArray.push(e.split(" /// ").pop())
    );
    setOpenSnack(true);
    navigator.clipboard.writeText(
      "New World\n" +
        newworldArray.toString().replaceAll(",", "\n") +
        "\n" +
        "\nCountdown\n" +
        countdownArray.toString().replaceAll(",", "\n") +
        "\n" +
        "\nPak n Save\n" +
        paknsaveArray.toString().replaceAll(",", "\n")
    );
  }
  return (
    <>
      {addToListItemsNewWorld.length === 0 &&
      addToListItemsCountdown.length === 0 &&
      addToListItemsPaknSave.length === 0 ? (
        showAnimation()
      ) : (
        <>
          <Box display="flex" justifyContent="center">
            <Button
              variant="contained"
              size="small"
              color="filterbutton"
              onClick={() => handleCopyAllGroceryItemsToClipboard()}
              sx={{
                height: "40px",
                marginTop: "auto",
                marginBottom: "auto",
                marginRight: "1%",
              }}
              endIcon={<CopyAllIcon />}
            >
              Copy Grocery List
            </Button>
          </Box>
          <Box
            justifyContent="center"
            display="flex"
            id="MainItemsBox"
            paddingTop="1%"
            paddingBottom="1%"
          >
            <Paper
              elevation={3}
              sx={{ width: "40%", backgroundColor: "background.listitems" }}
            >
              {addToListItemsNewWorld.length > 0 && (
                <Box
                  id="NewWorldListItems"
                  sx={{
                    width: "100%",
                    maxWidth: "100%",
                    paddingBottom: "0px",
                  }}
                >
                  <Box
                    marginLeft="1%"
                    display="flex"
                    justifyContent={"space-between"}
                  >
                    <h2>New World</h2>
                    <Button
                      variant="contained"
                      size="small"
                      color="filterbutton"
                      onClick={() => handleCopyNewWorldItemsToClipboard()}
                      sx={{
                        height: "40px",
                        marginTop: "auto",
                        marginBottom: "auto",
                        marginRight: "1%",
                      }}
                      endIcon={<ContentCopyIcon />}
                    >
                      Copy
                    </Button>
                  </Box>

                  <List
                    sx={{
                      width: "100%",
                      maxWidth: "100%",
                    }}
                  >
                    {addToListItemsNewWorld.map((item, index) => {
                      const itemWithURL = item.split(" /// ");
                      const productURL = itemWithURL[0];
                      const productName = itemWithURL[1];
                      const isSelected = (id: number) =>
                        selectedNewWorld.indexOf(id) !== -1;
                      const isItemSelected = isSelected(index);

                      return (
                        <>
                          <ListItem
                            disablePadding
                            sx={{
                              p: 0,
                              "&:hover": {
                                bgcolor: "background.listitemshover",
                              },
                            }}
                            key={index}
                            secondaryAction={
                              isItemSelected ? (
                                <IconButton
                                  edge="end"
                                  aria-label="delete"
                                  onClick={() => handleProductDelete()}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              ) : (
                                <IconButton
                                  edge="end"
                                  onClick={() => handleOpenURL(productURL)}
                                >
                                  <OpenInNew />
                                </IconButton>
                              )
                            }
                          >
                            <ListItemButton
                              dense={true}
                              disableRipple={true}
                              sx={{
                                bgcolor: isItemSelected
                                  ? "background.listitemschecked"
                                  : "background.listitems",
                                "&.MuiButtonBase-root:hover": {
                                  bgcolor:
                                    isItemSelected &&
                                    "background.listitemschecked",
                                },
                              }}
                            >
                              <ListItemIcon onClick={handleToggle(productName)}>
                                <Checkbox
                                  checked={isItemSelected}
                                  edge="start"
                                  tabIndex={-1}
                                  disableRipple
                                  color="info"
                                  onClick={() => handleClickNewWorld(index)}
                                />
                              </ListItemIcon>

                              <ListItemText
                                primary={productName}
                                style={{
                                  textDecoration: isItemSelected
                                    ? "line-through"
                                    : "none",
                                }}
                                onClick={() =>
                                  handleCopyItemToClipboard(productName)
                                }
                              />
                            </ListItemButton>
                          </ListItem>
                          <Snackbar
                            open={openSnack}
                            autoHideDuration={1200}
                            onClose={handleCloseSnack}
                            message="Copied to clipboard"
                          />
                        </>
                      );
                    })}
                  </List>
                  <Divider />
                </Box>
              )}
              {addToListItemsCountdown.length > 0 && (
                <Box
                  id="CountdownListItems"
                  sx={{
                    width: "100%",
                    maxWidth: "100%",
                  }}
                >
                  <Box
                    marginLeft="1%"
                    display="flex"
                    justifyContent={"space-between"}
                  >
                    <h2>Countdown</h2>
                    <Button
                      variant="contained"
                      size="small"
                      color="filterbutton"
                      onClick={() => handleCopyCountdownItemsToClipboard()}
                      sx={{
                        height: "40px",
                        marginTop: "auto",
                        marginBottom: "auto",
                        marginRight: "1%",
                      }}
                      endIcon={<ContentCopyIcon />}
                    >
                      Copy
                    </Button>
                  </Box>
                  <List
                    sx={{
                      width: "100%",
                      maxWidth: "100%",
                    }}
                  >
                    {addToListItemsCountdown.map((item, index) => {
                      const itemWithURL = item.split(" /// ");
                      const productURL = itemWithURL[0];
                      const productName = itemWithURL[1];
                      const isSelected = (id: number) =>
                        selectedCountdown.indexOf(id) !== -1;
                      const isItemSelected = isSelected(index);

                      return (
                        <>
                          <ListItem
                            disablePadding
                            sx={{
                              p: 0,
                              "&:hover": {
                                bgcolor: "background.listitemshover",
                              },
                            }}
                            key={index}
                            secondaryAction={
                              isItemSelected ? (
                                <IconButton
                                  edge="end"
                                  aria-label="delete"
                                  onClick={() => handleProductDelete()}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              ) : (
                                <IconButton
                                  edge="end"
                                  onClick={() => handleOpenURL(productURL)}
                                >
                                  <OpenInNew />
                                </IconButton>
                              )
                            }
                          >
                            <ListItemButton
                              sx={{
                                bgcolor: isItemSelected
                                  ? "background.listitemschecked"
                                  : "background.listitems",
                                "&.MuiButtonBase-root:hover": {
                                  bgcolor:
                                    isItemSelected &&
                                    "background.listitemschecked",
                                },
                              }}
                              dense={true}
                              disableRipple={true}
                              onClick={() =>
                                handleCopyItemToClipboard(productName)
                              }
                            >
                              <ListItemIcon onClick={handleToggle(productName)}>
                                <Checkbox
                                  checked={isItemSelected}
                                  edge="start"
                                  tabIndex={-1}
                                  disableRipple
                                  color="info"
                                  onClick={() => handleClickCountdown(index)}
                                />
                              </ListItemIcon>
                              <ListItemText
                                primary={productName}
                                style={{
                                  textDecoration: isItemSelected
                                    ? "line-through"
                                    : "none",
                                }}
                              />
                            </ListItemButton>
                          </ListItem>
                        </>
                      );
                    })}
                  </List>
                  <Divider />
                </Box>
              )}
              {addToListItemsPaknSave.length > 0 && (
                <Box
                  id="PaknSaveListItems"
                  sx={{
                    width: "100%",
                    maxWidth: "100%",
                    paddingBottom: "0px",
                  }}
                >
                  <Box
                    marginLeft="1%"
                    display="flex"
                    justifyContent={"space-between"}
                  >
                    <h2>Pak n Save</h2>
                    <Button
                      variant="contained"
                      size="small"
                      color="filterbutton"
                      onClick={() => handleCopyPaknSaveItemsToClipboard()}
                      sx={{
                        height: "40px",
                        marginTop: "auto",
                        marginBottom: "auto",
                        marginRight: "1%",
                      }}
                      endIcon={<ContentCopyIcon />}
                    >
                      Copy
                    </Button>
                  </Box>
                  <List
                    sx={{
                      width: "100%",
                      maxWidth: "100%",
                    }}
                  >
                    {addToListItemsPaknSave.map((item, index) => {
                      const itemWithURL = item.split(" /// ");
                      const productURL = itemWithURL[0];
                      const productName = itemWithURL[1];
                      const isSelected = (id: number) =>
                        selectedPaknSave.indexOf(id) !== -1;
                      const isItemSelected = isSelected(index);

                      return (
                        <>
                          <ListItem
                            disablePadding
                            sx={{
                              p: 0,
                              "&:hover": {
                                bgcolor: "background.listitemshover",
                              },
                            }}
                            key={index}
                            secondaryAction={
                              isItemSelected ? (
                                <IconButton
                                  edge="end"
                                  aria-label="delete"
                                  onClick={() => handleProductDelete()}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              ) : (
                                <IconButton
                                  edge="end"
                                  onClick={() => handleOpenURL(productURL)}
                                >
                                  <OpenInNew />
                                </IconButton>
                              )
                            }
                          >
                            <ListItemButton
                              sx={{
                                bgcolor: isItemSelected
                                  ? "background.listitemschecked"
                                  : "background.listitems",
                                "&.MuiButtonBase-root:hover": {
                                  bgcolor:
                                    isItemSelected &&
                                    "background.listitemschecked",
                                },
                              }}
                              dense={true}
                              disableRipple={true}
                            >
                              <ListItemIcon onClick={handleToggle(productName)}>
                                <Checkbox
                                  checked={isItemSelected}
                                  edge="start"
                                  tabIndex={-1}
                                  disableRipple
                                  color="info"
                                  onClick={() => handleClickPaknSave(index)}
                                />
                              </ListItemIcon>
                              <ListItemText
                                primary={productName}
                                style={{
                                  textDecoration: isItemSelected
                                    ? "line-through"
                                    : "none",
                                }}
                              />
                            </ListItemButton>
                          </ListItem>
                        </>
                      );
                    })}
                  </List>
                  <Divider />
                </Box>
              )}
            </Paper>
          </Box>
        </>
      )}
    </>
  );
}
