import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import RemoveIcon from "@mui/icons-material/Remove";
import { styled } from "@mui/material/styles";
import { FilterProps } from "../types/types";
import { useEffect, useRef, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { IconButton } from "@mui/material";
import { db } from "../auth/firebase";
import { getDoc, setDoc, doc } from "firebase/firestore";
import CircularProgress from "@mui/material/CircularProgress";
import { blue, red } from "@mui/material/colors";

export function Filter(props: FilterProps) {
  const { tags, setTags, searchedItem } = props;
  const [filterSearchText, setFilterSearchText] = useState("");
  const [filterHelperText, setFilterHelperText] = useState("");
  const ListItem = styled("li")(({ theme }) => ({
    margin: theme.spacing(0.5),
  }));

  const [loadingAdd, setLoadingAdd] = useState(false);
  const [successAdd, setSuccessAdd] = useState(false);
  const [loadingRemove, setLoadingRemove] = useState(false);
  const [successRemove, setSuccessRemove] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  async function handleAddFiltersToFirebase(tagsArray: string[]) {
    if (!loadingAdd) {
      setSuccessAdd(false);
      setLoadingAdd(true);
      timer.current = setTimeout(() => {
        setSuccessAdd(true);
        setLoadingAdd(false);
      }, 2000);
      timer.current = setTimeout(() => {
        setSuccessAdd(false);
      }, 4000);
    }
    try {
      await setDoc(
        doc(db, "Filters", searchedItem),
        {
          tags: tagsArray,
        },
        { merge: true }
      );
    } catch (e) {
      console.error("Error fetching filters from Firebase: ", e);
    }
  }

  async function handleRemoveFiltersFromFirestore() {
    const filterdocRef = doc(db, "Filters", searchedItem);
    const filterdocSnap = await getDoc(filterdocRef);
    let existingTags = await filterdocSnap.data()?.tags;
    if (existingTags !== undefined) {
      if (!loadingRemove) {
        setSuccessRemove(false);
        setLoadingRemove(true);
        timer.current = setTimeout(() => {
          setSuccessRemove(true);
          setLoadingRemove(false);
        }, 2000);
        timer.current = setTimeout(() => {
          setSuccessRemove(false);
        }, 4000);
      }
      try {
        await setDoc(
          doc(db, "Filters", searchedItem),
          {
            tags: [],
          },
          { merge: true }
        );
      } catch (e) {
        console.error("Error deleting filters from Firebase: ", e);
      }
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
      <Box
        justifyContent="center"
        display="flex"
        paddingBottom="0.5%"
        id="FilterBox"
      >
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
              sx={{ width: "485px", flex: 1, bgcolor: "white" }}
              placeholder="Filter results with comma or enter"
              value={filterSearchText.replace(",", "")}
              onKeyDown={handleFilterCommaOrEnterKey}
              onChange={handleSetFilterSearchText}
              helperText={filterHelperText}
            />
            <Button
              id="filterButton"
              variant="contained"
              size="small"
              endIcon={<RemoveIcon />}
              onClick={handleFilterButtonClick}
              type="button"
              sx={{
                paddingRight: "20px",
                height: "42px",
                paddingBottom: "1px",
              }}
            >
              Filter
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        paddingBottom="1%"
        id="TagsBox"
      >
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
            <Box display="inline-flex">
              {tags.map((data) => {
                return (
                  <>
                    <ListItem>
                      <Chip
                        label={data}
                        color="info"
                        onDelete={handleDelete(data)}
                      />
                    </ListItem>
                  </>
                );
              })}

              <Tooltip title="Save filters for this search">
                <IconButton
                  color="info"
                  onClick={() => handleAddFiltersToFirebase(tags)}
                >
                  {successAdd ? <CheckCircleIcon /> : <SaveIcon />}
                  {loadingAdd && (
                    <CircularProgress
                      size={34}
                      sx={{
                        color: blue[500],
                        position: "absolute",
                      }}
                    />
                  )}
                  {successAdd && (
                    <CircularProgress
                      variant="determinate"
                      value={100}
                      size={32}
                      sx={{
                        color: blue[500],
                        position: "absolute",
                      }}
                    />
                  )}
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete saved filters for this search">
                <IconButton
                  color="warning"
                  onClick={() => handleRemoveFiltersFromFirestore()}
                >
                  {successRemove ? <CheckCircleIcon /> : <CancelIcon />}
                  {loadingRemove && (
                    <CircularProgress
                      size={34}
                      sx={{
                        color: red[500],
                        position: "absolute",
                      }}
                    />
                  )}
                  {successRemove && (
                    <CircularProgress
                      variant="determinate"
                      value={100}
                      size={32}
                      sx={{
                        color: red[500],
                        position: "absolute",
                      }}
                    />
                  )}
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
}
