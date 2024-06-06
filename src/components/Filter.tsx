import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import RemoveIcon from "@mui/icons-material/Remove";
import { styled } from "@mui/material/styles";
import { FilterProps } from "../types/types";
import { useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { IconButton } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import CircleIcon from "@mui/icons-material/Circle";
import { db } from "../auth/firebase";
import { setDoc, doc } from "firebase/firestore";

export function Filter(props: FilterProps) {
  const { tags, setTags, searchedItem } = props;
  const [filterSearchText, setFilterSearchText] = useState("");
  const ListItem = styled("li")(({ theme }) => ({
    margin: theme.spacing(0.5),
  }));
  const [filterHelperText, setFilterHelperText] = useState("");
  const [filterTooltipText, setFilterTooltipText] = useState(
    "Save filters for this search"
  );

  useEffect(() => {
    tags.length > 0 && console.log("tags.length", tags.length);
    tags.length > 0 && handleAddFiltersToFirebase(tags);
  }, [tags]);

  async function handleAddFiltersToFirebase(tagsArray: string[]) {
    try {
      await setDoc(
        doc(db, "Filters", searchedItem),
        {
          tags: tagsArray,
        },
        { merge: true }
      );
      console.log("Done");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  function handleFilterCommaOrEnterKey(e: React.KeyboardEvent<HTMLDivElement>) {
    if (
      (e.target as HTMLInputElement).value.length === 0 &&
      (e.key === "," || e.key === "Enter")
    ) {
      setFilterHelperText("Please filter something");
      setTimeout(() => {
        setFilterHelperText("");
      }, 1500);
    } else if (
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
    if (!existingTag && (e.target as HTMLInputElement).value.length > 0) {
      setTags([...tags, filterSearchText]);
      setFilterSearchText("");
      e.preventDefault;
    } else if ((e.target as HTMLInputElement).value.length === 0) {
      setFilterHelperText("Please filter something");
      setTimeout(() => {
        setFilterHelperText("");
      }, 1500);
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
      <Box justifyContent="center" display={"flex"} paddingBottom={"1%"}>
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
              helperText={filterHelperText}
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
              margin="auto"
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
              <Box display="flex" maxWidth={"0px"}>
                {tags.map((data) => {
                  return (
                    <>
                      <ListItem>
                        <Chip label={data} onDelete={handleDelete(data)} />
                      </ListItem>
                    </>
                  );
                })}
                <Tooltip title={filterTooltipText}>
                  <IconButton color="primary">
                    <CheckCircleIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}
