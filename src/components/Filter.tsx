import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import RemoveIcon from "@mui/icons-material/Remove";
import { FilterProps } from "../types/types";
import ListItem from "@mui/material/ListItem";
import { useState } from "react";

export function Filter(props: FilterProps) {
  const { tags, setTags } = props;
  const [filterSearchText, setFilterSearchText] = useState("");

  function handleFilterCommaOrEnterKey(e: React.KeyboardEvent<HTMLDivElement>) {
    if (
      (e.key === "," || e.key === "Enter") &&
      (e.target as HTMLInputElement).value.length > 0
    ) {
      if (!existingTag) {
        setTags([...tags, filterSearchText]);
        setFilterSearchText("");
        e.preventDefault;
      } else if (existingTag) {
        setFilterSearchText("");
        e.preventDefault;
      }
    }
  }

  function handleFilterButtonClick(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    if (!existingTag) {
      setTags([...tags, filterSearchText]);
      setFilterSearchText("");
      e.preventDefault;
    } else if (existingTag) {
      setFilterSearchText("");
      e.preventDefault;
    }
  }

  function handleSetFilterSearchText(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value !== " ") {
      e.preventDefault;
      e.target.value !== "," &&
        setFilterSearchText(e.target.value.toLowerCase().replace(",", ""));
    }
  }

  const handleDelete = (tagToDelete: string) => () => {
    setTags((tags: string[]) => tags.filter((tag) => tag !== tagToDelete));
  };

  const existingTag = tags.some((tag) => filterSearchText.includes(tag));

  return (
    <>
      <Box justifyContent="center" display={"flex"}>
        <Box>
          <ButtonGroup>
            <TextField
              id="filterInput"
              inputProps={{
                style: {
                  padding: 10,
                },
              }}
              autoComplete="off"
              sx={{ width: "485px", flex: 1 }}
              placeholder="Filter a product"
              value={filterSearchText.replace(",", "")}
              onKeyDown={handleFilterCommaOrEnterKey}
              onChange={handleSetFilterSearchText}
            />
            <Tooltip title="Filter with comma or enter">
              <Button
                id="filterButton"
                variant="contained"
                size="small"
                endIcon={<RemoveIcon />}
                onClick={handleFilterButtonClick}
                type="button"
                sx={{
                  marginBottom: "5px",
                  paddingRight: "20px",
                  height: "42px",
                }}
                aria-label="search"
              >
                Filter
              </Button>
            </Tooltip>
          </ButtonGroup>

          {tags.length > 0 && (
            <Box
              margin={"auto"}
              id="tagsBox"
              sx={{
                padding: 0,
                marginTop: 0,
                marginBottom: 0,
                listStyle: "none",
              }}
              component="ul"
              key={Math.random()}
            >
              <Box display={"flex"}>
                {tags.map((data) => {
                  return (
                    <>
                      <ListItem>
                        <Chip label={data} onDelete={handleDelete(data)} />
                      </ListItem>
                    </>
                  );
                })}
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}
