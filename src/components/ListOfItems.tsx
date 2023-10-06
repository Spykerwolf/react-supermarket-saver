import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";

import "../main.css";
import Box from "@mui/material/Box";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  items: string[];
  headingTitle: string;
  onSelectItem?: (item: string) => void;
  onDeleteItem: (item: string) => void;
}

export function ListOfItems({ items, headingTitle, onDeleteItem }: Props) {
  function GenerateHeadingName() {
    return items[Math.floor(Math.random() * items.length)];
  }

  const [heading, setHeading] = useState(headingTitle);

  return (
    <>
      <h1
        onClick={() => {
          setHeading(GenerateHeadingName);
        }}
        onWheel={() => {
          setHeading(headingTitle);
        }}
      >
        {heading}
      </h1>
      <Box sx={{ width: "100%", maxWidth: 420 }} className="Items">
        {items.length === 0 && <p>No item found</p>}
        {items.map((item) => (
          <nav
            // className={selectedIndex === index ? "Items-active" : "Items"}
            className="Items"
            key={item}
          >
            <ListItemButton>
              <ListItem
                disablePadding
                secondaryAction={
                  <IconButton
                    onClick={() => {
                      onDeleteItem(item);
                    }}
                    edge="end"
                    aria-label="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText primary={item}></ListItemText>
              </ListItem>
            </ListItemButton>
          </nav>
        ))}
      </Box>
    </>
  );
}
