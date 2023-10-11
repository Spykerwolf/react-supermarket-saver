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

  const suburbs = [
    { label: "Orewa", id: "3034" },
    { label: "Albany", id: "6" },
    { label: "Silverdale", id: "3315" },
    { label: "Glenfield", id: "38" },
  ];

  const departments = [
    { label: "All Departments", id: "" },
    {
      label: "Fridge & Deli",
      id: "&dasFilter=Department;4;Fridge%20%26%20Deli;false;Department",
    },
    { label: "Frozen", id: "&dasFilter=Department;6;Frozen;false;Department" },
    { label: "Pantry", id: "&dasFilter=Department;7;Pantry;false;Department" },
    { label: "Drinks", id: "&dasFilter=Department;9;Drinks;false;Department" },
    {
      label: "Health & Body",
      id: "&dasFilter=Department;10;Health&20%26%20Body;false;Department",
    },
    {
      label: "Meat & Poultry",
      id: "&dasFilter=Department;2;Meat&20%26%20Poultry;false;Department",
    },
    { label: "Bakery", id: "&dasFilter=Department;5;Bakery;false;Department" },
    {
      label: "Household",
      id: "&dasFilter=Department;11;Household;false;Department",
    },
    {
      label: "Baby & Child",
      id: "&dasFilter=Department;12;Baby%20Child;false;Department",
    },
    { label: "Pet", id: "&dasFilter=Department;13;Pet;false;Department" },
  ];

  const [filterSearchText, setFilterSearchText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <Paper
        className="searchProduct"
        component="form"
        sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 500 }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search for a product"
          value={searchTerm}
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
        sx={{
          p: "2px 4px",
          m: "1px 0px 0px 0px",
          display: "flex",
          alignItems: "center",
          width: 500,
        }}
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
      </Paper>
      <Paper
        className="dropdownLists"
        component="form"
        sx={{
          p: "0px 4px",
          display: "flex",
          alignItems: "center",
          width: 500,
        }}
      >
        <Autocomplete
          className="dropdownSuburbs"
          freeSolo={true}
          disableClearable={true}
          disablePortal
          options={suburbs}
          sx={{ width: 166 }}
          renderInput={(params) => <TextField {...params} label="Suburb" />}
          onInputChange={(_event, value) => {
            const index = suburbs.findIndex((object) => {
              return object.label === value;
            });
            const suburbsExcludes = suburbs[index].id;
            setSearchTerm(suburbsExcludes);
          }}
        />
        <Autocomplete
          className="dropdownExcludes"
          freeSolo={true}
          disableClearable={true}
          disablePortal
          options={coffeeArray}
          sx={{ width: 166 }}
          renderInput={(params) => <TextField {...params} label="Exclude" />}
          onInputChange={(_event, value) => {
            const index = coffeeArray.findIndex((object) => {
              return object.label === value;
            });
            const coffeeArrayExcludes = coffeeArray[index].exclude;
            setFilterSearchText(coffeeArrayExcludes);
          }}
        />
        <Autocomplete
          className="dropdownDepartments"
          freeSolo={true}
          disableClearable={true}
          disablePortal
          options={departments}
          sx={{ width: 166 }}
          renderInput={(params) => (
            <TextField {...params} label="Departments" />
          )}
          onInputChange={(_event, value) => {
            const index = suburbs.findIndex((object) => {
              return object.label === value;
            });
            const suburbsExcludes = suburbs[index].id;
            setSearchTerm(suburbsExcludes);
          }}
        />
      </Paper>
      <br></br>
    </>
  );
}
