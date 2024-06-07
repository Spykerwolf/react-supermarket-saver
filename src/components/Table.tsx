import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import IconButton from "@mui/material/IconButton";
import { visuallyHidden } from "@mui/utils";
import { useEffect, useState } from "react";
import { rows } from "./Search";
import { getComparator, stableSort } from "../functions/sortTable";
import SellIcon from "@mui/icons-material/Sell";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Checkbox from "@mui/material/Checkbox";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import StarsIcon from "@mui/icons-material/Stars";
import Tooltip from "@mui/material/Tooltip";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { db } from "../auth/firebase";
import { setDoc, doc } from "firebase/firestore";

import {
  TableRowProps,
  HeadCell,
  Order,
  EnhancedTableProps,
  EnhancedTableHeadProps,
} from "../types/types";

const headCells: readonly HeadCell[] = [
  {
    id: "isFavourite",
    numeric: false,
    label: "",
  },
  {
    id: "name",
    numeric: false,
    label: "Name",
  },

  {
    id: "onSpecial",
    numeric: false,
    label: "",
  },

  {
    id: "price",
    numeric: false,
    label: "Price",
  },

  {
    id: "historicalIcon",
    numeric: false,
    label: "",
  },
  {
    id: "historicalLow",
    numeric: false,
    label: "Historical Low",
  },

  {
    id: "productPackage",
    numeric: false,
    label: "Packaging",
  },
  {
    id: "ratio",
    numeric: false,
    label: "Ratio",
  },
  {
    id: "store",
    numeric: false,
    label: "Store",
  },
  {
    id: "productURL",
    numeric: false,
    label: "URL",
  },
];

export function EnhancedTableHead(props: EnhancedTableHeadProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof TableRowProps) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <>
      <TableHead sx={{ margin: 1 }}>
        <TableRow sx={{ bgcolor: "lightgrey" }}>
          <TableCell padding="checkbox"></TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={Math.random()}
              align={headCell.numeric ? "right" : "left"}
              padding={"normal"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    </>
  );
}

export async function handleAddListToFirebaseNewWorld(listArray: string[]) {
  try {
    await setDoc(
      doc(db, "List items", "NewWorld"),
      {
        list: listArray,
      },
      { merge: true }
    );
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function handleAddListToFirebaseCountdown(listArray: string[]) {
  try {
    await setDoc(
      doc(db, "List items", "Countdown"),
      {
        list: listArray,
      },
      { merge: true }
    );
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function handleAddListToFirebasePaknSave(listArray: string[]) {
  try {
    await setDoc(
      doc(db, "List items", "PaknSave"),
      {
        list: listArray,
      },
      { merge: true }
    );
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export function EnhancedTable(props: EnhancedTableProps) {
  const {
    favProduct,
    setFavProduct,
    selected,
    setSelected,
    mycoolrows,
    tags,
    addToListItemsCountdown,
    addToListItemsPaknSave,
    addToListItemsNewWorld,
    setAddToListItemsCountdown,
    setAddToListItemsPaknSave,
    setAddToListItemsNewWorld,
  } = props;
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof TableRowProps>("ratio");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(-1);
  const [rowCount, setRowCount] = useState(0);

  useEffect(() => {
    addToListItemsNewWorld.length > 0 &&
      handleAddListToFirebaseNewWorld(addToListItemsNewWorld);
    console.log("addToListItemsNewWorld", addToListItemsNewWorld);
  }, [addToListItemsNewWorld]);

  // useEffect(() => {
  //   addToListItemsCountdown.length > 0 &&
  //     handleAddListToFirebaseCountdown(addToListItemsCountdown);
  //   console.log("addToListItemsCountdown", addToListItemsCountdown);
  // }, [addToListItemsCountdown]);

  // useEffect(() => {
  //   addToListItemsPaknSave.length > 0 &&
  //     handleAddListToFirebasePaknSave(addToListItemsPaknSave);
  //   console.log("addToListItemsPaknSave", addToListItemsPaknSave);
  // }, [addToListItemsPaknSave]);

  const handleRequestSort = (
    _event: React.MouseEvent<unknown>,
    property: keyof TableRowProps
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows: any[] = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, mycoolrows, favProduct]
  );

  const filteredVisibleRows = visibleRows.filter((row) => {
    const tagInRowName = tags.some((item) =>
      row.name.toLowerCase().includes(item.toLowerCase())
    );
    if (tags.length === 0) {
      return row;
    } else if (!tagInRowName) {
      return row;
    }
    return row;
  }).length;

  React.useMemo(() => setRowCount(filteredVisibleRows), [filteredVisibleRows]);

  function handleOpenURL(URL: string) {
    open(URL, "_blank", "noopener,noreferrer");
  }

  return (
    <>
      <Box
        justifyContent="center"
        display={"flex"}
        width={"100%"}
        paddingTop={"0.5%"}
      >
        <TableContainer>
          <Table
            sx={{ minWidth: "250" }}
            aria-labelledby="tableTitle"
            size={"small"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />

            <TableBody>
              {visibleRows
                .filter((row) => {
                  const tagInRowName = tags.some((item) =>
                    row.name.toLowerCase().includes(item.toLowerCase())
                  );
                  if (tags.length === 0) {
                    return row;
                  } else if (!tagInRowName) {
                    return row;
                  }
                })

                .map((row) => {
                  const product = `${row.store} - ${row.name} ${row.productPackage} - $${row.price}`;
                  const productExistsNewWorld = addToListItemsNewWorld.some(
                    (item) => product.includes(item)
                  );
                  const productExistsCountdown = addToListItemsCountdown.some(
                    (item) => product.includes(item)
                  );
                  const productExistsPaknSave = addToListItemsPaknSave.some(
                    (item) => product.includes(item)
                  );

                  function handleAddFavourite(sku: string, name: string) {
                    if (localStorage.getItem(sku)) {
                      localStorage.removeItem(sku);
                    } else {
                      localStorage.setItem(sku, name);
                    }
                    setFavProduct(!favProduct);
                  }

                  function handleAddToList() {
                    if (row.store === "New World") {
                      setAddToListItemsNewWorld([
                        ...addToListItemsNewWorld,
                        product,
                      ]);
                    }

                    if (row.store === "Countdown") {
                      setAddToListItemsCountdown([
                        ...addToListItemsCountdown,
                        product,
                      ]);
                    }

                    if (row.store === "Pak n Save") {
                      setAddToListItemsPaknSave([
                        ...addToListItemsPaknSave,
                        product,
                      ]);
                    }
                    setSelected([]);
                  }

                  function handleDeleteFromList() {
                    function handleProductDelete(productToDelete: string) {
                      if (row.store === "New World") {
                        setAddToListItemsNewWorld((products: string[]) =>
                          products.filter((prod) => prod !== productToDelete)
                        );
                      }
                      if (row.store === "Countdown") {
                        setAddToListItemsCountdown((products: string[]) =>
                          products.filter((prod) => prod !== productToDelete)
                        );
                      }
                      if (row.store === "Pak n Save") {
                        setAddToListItemsPaknSave((products: string[]) =>
                          products.filter((prod) => prod !== productToDelete)
                        );
                      }
                    }

                    (productExistsNewWorld ||
                      productExistsCountdown ||
                      productExistsPaknSave) &&
                      handleProductDelete(product);
                  }

                  return (
                    <TableRow
                      key={row.id}
                      id={row.id}
                      style={{
                        height: 33 * emptyRows,
                      }}
                      hover
                      tabIndex={-1}
                      sx={{
                        cursor: "pointer",
                        backgroundColor: "#00000008",
                        paddingBottom: 0,
                      }}
                    >
                      <TableCell padding="none">
                        <Tooltip
                          title={
                            (productExistsNewWorld ||
                              productExistsCountdown ||
                              productExistsPaknSave) &&
                            "Remove from list"
                          }
                          placement="left"
                        >
                          <IconButton
                            id="addtolist"
                            color={
                              productExistsNewWorld ||
                              productExistsCountdown ||
                              productExistsPaknSave
                                ? "warning"
                                : "default"
                            }
                            size="medium"
                            onClick={() =>
                              productExistsNewWorld ||
                              productExistsCountdown ||
                              productExistsPaknSave
                                ? handleDeleteFromList()
                                : handleAddToList()
                            }
                          >
                            {productExistsNewWorld ||
                            productExistsCountdown ||
                            productExistsPaknSave ? (
                              <ShoppingCartOutlinedIcon />
                            ) : (
                              <AddOutlinedIcon />
                            )}
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                      <TableCell padding="none" align="left">
                        <Tooltip
                          title={
                            localStorage.getItem(row.sku) &&
                            "Remove from Favourites"
                          }
                          placement="right"
                        >
                          <Checkbox
                            id="favouriteCheckbox"
                            icon={<StarBorderIcon />}
                            checkedIcon={<StarIcon />}
                            color="secondary"
                            checked={
                              localStorage.getItem(row.sku) ? true : false
                            }
                            key={row.sku}
                            onChange={() =>
                              handleAddFavourite(row.sku, row.name)
                            }
                          />
                        </Tooltip>
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        key={row.store}
                        align="left"
                        color="white"
                      >
                        {row.name}
                      </TableCell>

                      <TableCell align="right">
                        {row.onSpecial && (
                          <Tooltip
                            title={row.onSpecialTooltip}
                            placement="left"
                          >
                            <IconButton>
                              <SellIcon color={row.onSpecialMultipleIcon} />
                            </IconButton>
                          </Tooltip>
                        )}
                      </TableCell>

                      <TableCell align="left">{`$${row.price}`}</TableCell>
                      <TableCell align="right">
                        {row.historicalLow < row.price && (
                          <Tooltip
                            title="Historical price is lower"
                            placement="left"
                          >
                            <IconButton>
                              <StarsIcon color="info" />
                            </IconButton>
                          </Tooltip>
                        )}
                      </TableCell>

                      <TableCell align="left">{`$${row.historicalLow}`}</TableCell>
                      <TableCell align="left">{row.productPackage}</TableCell>
                      <TableCell align="left">{row.ratio}</TableCell>
                      <TableCell align="left">{row.store}</TableCell>
                      <TableCell align="left">
                        <IconButton
                          onClick={() => {
                            handleOpenURL(row.productURL);
                          }}
                          onMouseDown={() => {
                            handleOpenURL(row.productURL);
                          }}
                        >
                          <OpenInNewIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 33 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box paddingLeft={"5%"} paddingRight={"5%"}>
        <TablePagination
          rowsPerPageOptions={[5, 25, 50, 75, { value: -1, label: "All" }]}
          component="div"
          count={rowCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </>
  );
}
