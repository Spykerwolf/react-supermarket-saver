import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import "../main.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import BasicButton from "./Button";
import { Alert } from "@mui/material";

interface Props {
  items: string[];
  headingTitle: string;
  onSelectItem: (item: string) => void;
}

export function SearchField() {
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="standard-basic"
        label="Search for something"
        variant="standard"
        className="searchBar"
      />
      <BasicButton
        color="contained"
        onClick={() => {
          <Alert>Such alert!</Alert>;
          console.log("Creating another alert");
        }}
      >
        Search
      </BasicButton>
    </Box>
  );
}

export function ListOfItems({ items, headingTitle, onSelectItem }: Props) {
  function GenerateHeadingName() {
    return items[Math.floor(Math.random() * items.length)];
  }

  const [selectedIndex, setSelectedIndex] = useState(-1);
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
      <SearchField />
      <br></br>
      <Box sx={{ width: "100%", maxWidth: 140 }} className="Items">
        {items.length === 0 && <p>No item found</p>}
        {items.map((item, index) => (
          <nav
            className={selectedIndex === index ? "Items-active" : "Items"}
            key={item}
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(item);
            }}
          >
            <ListItemButton>
              <ListItemText primary={item} />
            </ListItemButton>
          </nav>
        ))}
      </Box>
    </>
  );
}
