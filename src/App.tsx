import { ListOfItems } from "./components/ListOfItems";
import { useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

function App() {
  const coffeeArray = [
    "Cappuchino",
    "Flat White",
    "Mochachino",
    "Latte",
    "Ice Coffee",
    "Long Black",
  ];

  const [items, setItems] = useState(coffeeArray);

  function AddItems() {
    const [searchTerm, setSearchterm] = useState("");

    function addItemsToArray() {
      {
        searchTerm != "" && setItems([...items, searchTerm]);
      }
    }

    return (
      <Paper
        component="form"
        sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Add an item"
          inputProps={{ "aria-label": "add item" }}
          onChange={(e) => {
            setSearchterm(e.target.value);
          }}
        />
        <IconButton
          type="button"
          sx={{ p: "10px" }}
          aria-label="search"
          onClick={addItemsToArray}
        >
          <AddIcon />
        </IconButton>
      </Paper>
    );
  }

  function FilterItems() {
    const [filterTerm, setFilterTerm] = useState("");

    const FilterArrayItems = (item: string) => {
      setItems(items.filter((a) => a === item));
    };

    return (
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          m: "1px 0px 0px 0px",
          display: "flex",
          alignItems: "center",
          width: 400,
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Filter an item"
          inputProps={{ "aria-label": "filter item" }}
          onChange={(e) => {
            setFilterTerm(e.target.value);
          }}
        />
        <IconButton
          type="button"
          sx={{ p: "10px" }}
          aria-label="search"
          onClick={() => {
            FilterArrayItems;
          }}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    );
  }

  const handleDeleteItem = (item: string) => {
    setItems(items.filter((a) => a !== item));
  };

  return (
    <div>
      <h1>Types of Coffees</h1>
      <AddItems />
      <FilterItems />
      <ListOfItems
        items={items}
        headingTitle=""
        onDeleteItem={handleDeleteItem}
      />
    </div>
  );
}

export default App;
