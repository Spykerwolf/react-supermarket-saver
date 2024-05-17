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

export default function CheckboxList() {
  const { addToListItems, setHideSearchComponent }: CheckboxListProps =
    useOutletContext();
  // const [checked, setChecked] = useState([0]);
  useEffect(() => {
    setHideSearchComponent(true);
  }, []);

  // const handleToggle = (value: number) => () => {
  //   const currentIndex = checked.indexOf(value);
  //   const newChecked = [...checked];

  //   if (currentIndex === -1) {
  //     newChecked.push(value);
  //   } else {
  //     newChecked.splice(currentIndex, 1);
  //   }

  //   setChecked(newChecked);
  // };

  // function handleChecked(name: string) {
  //   console.log(name);
  // }

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
            {addToListItems.map((item) => {
              const labelId = `checkbox-list-label-${item}`;

              return (
                <ListItem disablePadding sx={{ p: 0 }}>
                  <ListItemButton
                    dense="true"
                    disableRipple="true"
                    role={undefined}
                    // onClick={handleToggle()}
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        // checked={checked.indexOf() !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ "aria-labelledby": labelId }}
                        color="info"
                        onChange={() => handleChecked(item)}
                      />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={item} />
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
