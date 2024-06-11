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
import {
  handleAddListToFirebaseNewWorld,
  handleAddListToFirebaseCountdown,
  handleAddListToFirebasePaknSave,
} from "./Table";

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

  useEffect(() => {
    console.log(itemsChecked);
  }, [itemsChecked]);
  useEffect(() => {
    setHideSearchComponent(true);
  }, []);

  useEffect(() => {
    handleAddListToFirebaseNewWorld(addToListItemsNewWorld);
  }, [addToListItemsNewWorld]);

  useEffect(() => {
    handleAddListToFirebaseCountdown(addToListItemsCountdown);
  }, [addToListItemsCountdown]);

  useEffect(() => {
    handleAddListToFirebasePaknSave(addToListItemsPaknSave);
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
      <div style={{ justifyContent: "center", display: "flex" }}>
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

  return (
    <>
      {addToListItemsNewWorld.length === 0 &&
      addToListItemsCountdown.length === 0 &&
      addToListItemsPaknSave.length === 0 ? (
        showAnimation()
      ) : (
        <Box justifyContent={"center"} display={"flex"}>
          <Paper elevation={3} sx={{ width: "80%", height: "50%" }}>
            {addToListItemsNewWorld.length > 0 && (
              <Box
                id={"NewWorldListItems"}
                justifyContent={"center"}
                display={"flex-inline"}
                sx={{
                  width: "100%",
                  maxWidth: "100%",
                  bgcolor: "background.paper",
                  paddingBottom: "0px",
                }}
              >
                <h2>New World</h2>
                <List
                  sx={{
                    width: "100%",
                    maxWidth: "100%",
                    bgcolor: "background.paper",
                  }}
                >
                  {addToListItemsNewWorld.map((item, index) => {
                    const isSelected = (id: number) =>
                      selectedNewWorld.indexOf(id) !== -1;
                    const isItemSelected = isSelected(index);

                    return (
                      <>
                        <ListItem
                          disablePadding
                          sx={{ p: 0 }}
                          key={index}
                          secondaryAction={
                            isItemSelected && (
                              <IconButton
                                edge="end"
                                aria-label="delete"
                                onClick={() => handleProductDelete()}
                              >
                                <DeleteIcon />
                              </IconButton>
                            )
                          }
                        >
                          <ListItemButton
                            style={{
                              backgroundColor: isItemSelected
                                ? "#c1c1c1"
                                : "white",
                            }}
                            dense={true}
                            disableRipple={true}
                          >
                            <ListItemIcon onClick={handleToggle(item)}>
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
                              primary={item}
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
              </Box>
            )}
            {addToListItemsCountdown.length > 0 && (
              <Box
                id={"CountdownListItems"}
                justifyContent={"center"}
                display={"flex-inline"}
                sx={{
                  width: "100%",
                  maxWidth: "100%",
                  bgcolor: "background.paper",
                  paddingBottom: "0px",
                }}
              >
                <h2>Countdown</h2>
                <List
                  sx={{
                    width: "100%",
                    maxWidth: "100%",
                    bgcolor: "background.paper",
                  }}
                >
                  {addToListItemsCountdown.map((item, index) => {
                    const isSelected = (id: number) =>
                      selectedCountdown.indexOf(id) !== -1;
                    const isItemSelected = isSelected(index);

                    return (
                      <>
                        <ListItem
                          disablePadding
                          sx={{ p: 0 }}
                          key={index}
                          secondaryAction={
                            isItemSelected && (
                              <IconButton
                                edge="end"
                                aria-label="delete"
                                onClick={() => handleProductDelete()}
                              >
                                <DeleteIcon />
                              </IconButton>
                            )
                          }
                        >
                          <ListItemButton
                            style={{
                              backgroundColor: isItemSelected
                                ? "#c1c1c1"
                                : "white",
                            }}
                            dense={true}
                            disableRipple={true}
                          >
                            <ListItemIcon onClick={handleToggle(item)}>
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
                              primary={item}
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
              </Box>
            )}
            {addToListItemsPaknSave.length > 0 && (
              <Box
                id={"PaknSaveListItems"}
                justifyContent={"center"}
                display={"flex-inline"}
                sx={{
                  width: "100%",
                  maxWidth: "100%",
                  bgcolor: "background.paper",
                  paddingBottom: "0px",
                }}
              >
                <h2>Pak n Save</h2>
                <List
                  sx={{
                    width: "100%",
                    maxWidth: "100%",
                    bgcolor: "background.paper",
                  }}
                >
                  {addToListItemsPaknSave.map((item, index) => {
                    const isSelected = (id: number) =>
                      selectedPaknSave.indexOf(id) !== -1;
                    const isItemSelected = isSelected(index);

                    return (
                      <>
                        <ListItem
                          disablePadding
                          sx={{ p: 0 }}
                          key={index}
                          secondaryAction={
                            isItemSelected && (
                              <IconButton
                                edge="end"
                                aria-label="delete"
                                onClick={() => handleProductDelete()}
                              >
                                <DeleteIcon />
                              </IconButton>
                            )
                          }
                        >
                          <ListItemButton
                            style={{
                              backgroundColor: isItemSelected
                                ? "#c1c1c1"
                                : "white",
                            }}
                            dense={true}
                            disableRipple={true}
                          >
                            <ListItemIcon onClick={handleToggle(item)}>
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
                              primary={item}
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
              </Box>
            )}
          </Paper>
        </Box>
      )}
    </>
  );
}
