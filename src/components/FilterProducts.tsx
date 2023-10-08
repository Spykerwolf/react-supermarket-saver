import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import RemoveIcon from "@mui/icons-material/Remove";

export function SearchProducts() {
  const coffeeArray = [
    {
      label: "Milk",
      exclude:
        "Uht, uht, trim, powder, lactose, lite, fat, a2, A2, lacto, Lacto",
    },
    { label: "Coffee", exclude: "decaf, Decaf" },
  ];

  // const [dropDownValue, setDropDownValue] = useState(coffeeArray);
  const [filterSearchText, setFilterSearchText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <Paper
        className="searchProduct"
        component="form"
        sx={{
          p: "2px 4px",
          m: "0px 0px 5px 0px",
          display: "flex",
          alignItems: "center",
          width: 900,
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search for a product"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />

        <IconButton type="button" sx={{ p: "10px" }}>
          <SearchIcon />
        </IconButton>
      </Paper>

      <Paper
        className="filterProduct"
        component="form"
        sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 900 }}
      >
        <InputBase
          className="filterAProduct"
          sx={{ ml: 1, flex: 1 }}
          placeholder="Filter a product"
          value={filterSearchText}
          onChange={(e) => {
            setFilterSearchText(e.target.value);
          }}
        />

        <IconButton
          onClick={() => setFilterSearchText("")}
          type="button"
          sx={{ p: "10px" }}
          aria-label="search"
        >
          <RemoveIcon />
        </IconButton>
        <Autocomplete
          freeSolo={true}
          disableClearable={true}
          disablePortal
          options={coffeeArray}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Exclude presets" />
          )}
          onInputChange={(event, value) => {
            const index = coffeeArray.findIndex((object) => {
              return object.label === value;
            });
            const coffeeArrayExcludes = coffeeArray[index].exclude;
            setFilterSearchText(coffeeArrayExcludes);
          }}
        />
      </Paper>
    </>
  );
}
