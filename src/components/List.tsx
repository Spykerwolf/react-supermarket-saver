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

export default function CheckboxList() {
  const {
    addToListItems,
    setAddToListItems,
    setHideSearchComponent,
  }: CheckboxListProps = useOutletContext();

  const [itemsAlreadyOnList, setItemsAlreadyOnList] = useState<string[]>([]);
  const [selected, setSelected] = useState<readonly number[]>([]);

  useEffect(() => {
    itemsAlreadyOnList.length > 0 &&
      console.log("itemsAlreadyOnList.length", itemsAlreadyOnList.length);
  }, [itemsAlreadyOnList]);

  useEffect(() => {
    selected.length > 0 && console.log("selected", selected);
  }, [selected]);
  useEffect(() => {
    setHideSearchComponent(true);
  }, []);

  const handleToggle = (name: string) => () => {
    const productExists = itemsAlreadyOnList.some((item) =>
      name.includes(item)
    );
    function handleProductDelete(productToDelete: string) {
      setItemsAlreadyOnList((products: string[]) =>
        products.filter((prod) => prod !== productToDelete)
      );
    }
    productExists
      ? handleProductDelete(name)
      : setItemsAlreadyOnList([...itemsAlreadyOnList, name]);
  };

  function handleProductDelete(productToDelete: string) {
    setAddToListItems((products: string[]) =>
      products.filter((prod) => prod !== productToDelete)
    );
    setSelected([]);
  }

  const handleClick = (id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
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
      {addToListItems.length === 0 ? (
        showAnimation()
      ) : (
        <Box justifyContent={"center"} display={"flex"}>
          <Paper elevation={3} sx={{ width: "80%", height: "50%" }}>
            <List
              sx={{
                width: "100%",
                maxWidth: "100%",
                bgcolor: "background.paper",
              }}
            >
              {addToListItems.map((item, index) => {
                const isSelected = (id: number) => selected.indexOf(id) !== -1;
                const isItemSelected = isSelected(index);

                return (
                  <ListItem
                    disablePadding
                    sx={{ p: 0 }}
                    key={index}
                    secondaryAction={
                      isItemSelected && (
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => handleProductDelete(item)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      )
                    }
                  >
                    <ListItemButton
                      style={{
                        backgroundColor: isItemSelected ? "#c1c1c1" : "white",
                      }}
                      dense={true}
                      disableRipple={true}
                      role={undefined}
                    >
                      <ListItemIcon onClick={handleToggle(item)}>
                        <Checkbox
                          checked={isItemSelected}
                          edge="start"
                          tabIndex={-1}
                          disableRipple
                          color="info"
                          onClick={() => handleClick(index)}
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
                );
              })}
            </List>
          </Paper>
        </Box>
      )}
    </>
  );
}
