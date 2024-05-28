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

export default function CheckboxList() {
  const {
    addToListItems,
    setAddToListItems,
    setHideSearchComponent,
  }: CheckboxListProps = useOutletContext();
  const [itemsAlreadyOnList, setItemsAlreadyOnList] = useState([]);

  useEffect(() => {
    setHideSearchComponent(true);
  }, []);

  useEffect(() => {
    console.log("addToListItems", addToListItems);
  }, [addToListItems]);

  useEffect(() => {
    console.log("itemsAlreadyOnList", itemsAlreadyOnList);
  }, [itemsAlreadyOnList]);

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
  }

  return (
    <>
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
              const labelId = `checkbox-list-label-${index}`;

              return (
                <ListItem
                  disablePadding
                  sx={{ p: 0 }}
                  key={index}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleProductDelete(item)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemButton
                    style={{
                      backgroundColor:
                        itemsAlreadyOnList.some((prod) =>
                          prod.includes(item)
                        ) && "#c1c1c1",
                    }}
                    dense="true"
                    disableRipple="true"
                    role={undefined}
                  >
                    <ListItemIcon onClick={handleToggle(item)}>
                      <Checkbox
                        edge="start"
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ "aria-labelledby": labelId }}
                        color="info"
                        onChange={handleToggle(item)}
                      />
                    </ListItemIcon>
                    <ListItemText
                      id={labelId}
                      primary={item}
                      style={{
                        textDecoration: itemsAlreadyOnList.some((prod) =>
                          prod.includes(item)
                        )
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
    </>
  );
}
