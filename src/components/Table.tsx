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
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useState } from "react";
import { rows } from "./Search";
import { Button } from "@mui/material";
import { getComparator, stableSort } from "./functions/sortTable";
import SellIcon from "@mui/icons-material/Sell";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Checkbox from "@mui/material/Checkbox";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ArticleIcon from "@mui/icons-material/Article";
import StarsIcon from "@mui/icons-material/Stars";
import Tooltip from "@mui/material/Tooltip";
import {
  TableRowProps,
  HeadCell,
  Order,
  EnhancedTableProps,
  EnhancedTableHeadProps,
  EnhancedTableToolbarProps,
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

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected } = props;

  return (
    <>
      <Box justifyContent="center" display={"flex"}>
        <Toolbar
          id="mainToolbar"
          sx={{
            width: "100%",
            display: "flex",
            height: "60px",
            padding: 0,
            ...(numSelected > 0 && {
              bgcolor: (theme) =>
                alpha(
                  theme.palette.primary.main,
                  theme.palette.action.activatedOpacity
                ),
            }),
          }}
        >
          {numSelected > 0 ? (
            <Button
              variant="contained"
              color="error"
              size="small"
              endIcon={<ShoppingCartIcon />}
              type="button"
              sx={{
                minHeight: "40px",
                minWidth: "128px",
                width: "fit-content",
              }}
            >
              Add to list
            </Button>
          ) : (
            <Button
              disabled
              variant="contained"
              color="error"
              size="small"
              endIcon={<ShoppingCartIcon />}
              type="button"
              sx={{
                minHeight: "40px",
                minWidth: "128px",
                width: "fit-content",
              }}
            >
              Add to list
            </Button>
          )}
          {numSelected > 0 ? (
            <Typography
              sx={{ flex: "1 1 100%", paddingLeft: 3 }}
              color="inherit"
              variant="subtitle1"
              component="div"
            >
              {numSelected} selected
            </Typography>
          ) : (
            <Typography
              sx={{ flex: "1 1 100%" }}
              variant="h6"
              id="tableTitle"
              component="div"
            ></Typography>
          )}
          {numSelected > 0 ? (
            <Button
              onClick={() => {
                open(
                  "https://ticktick.com/webapp/#p/662f1f0c7bb4f9d1f9520059/tasks",
                  "_blank",
                  "noopener,noreferrer"
                );
              }}
              onMouseDown={(e) => {
                if (e.button === 1) {
                  open(
                    "https://ticktick.com/webapp/#p/662f1f0c7bb4f9d1f9520059/tasks",
                    "_blank",
                    "noopener,noreferrer"
                  );
                }
              }}
              variant="contained"
              color="warning"
              size="small"
              endIcon={<ArticleIcon />}
              type="button"
              sx={{
                minHeight: "40px",
                minWidth: "128px",
                width: "fit-content",
              }}
            >
              Open List
            </Button>
          ) : (
            <Button
              disabled
              variant="contained"
              color="warning"
              size="small"
              endIcon={<ArticleIcon />}
              type="button"
              sx={{
                minHeight: "40px",
                minWidth: "128px",
                width: "fit-content",
              }}
            >
              Open List
            </Button>
          )}
        </Toolbar>
      </Box>
    </>
  );
}
export default function EnhancedTable(props: EnhancedTableProps) {
  const { favProduct, setFavProduct, selected, setSelected, mycoolrows, tags } =
    props;
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof TableRowProps>("ratio");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(-1);
  const [rowCount, setRowCount] = useState(0);
  const handleRequestSort = (
    _event: React.MouseEvent<unknown>,
    property: keyof TableRowProps
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClick = (sku: number) => {
    const selectedIndex = selected.indexOf(sku);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, sku);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
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

  const isSelected = (sku: number) => selected.indexOf(sku) !== -1;

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
      <Box>
        <EnhancedTableToolbar numSelected={selected.length} />
      </Box>
      <Box justifyContent="center" display={"flex"} width={"100%"}>
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

                .map((row, index) => {
                  const isItemSelected = isSelected(row.sku);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  function handleAddFavourite(sku: string, name: string) {
                    if (localStorage.getItem(sku)) {
                      localStorage.removeItem(sku);
                    } else {
                      localStorage.setItem(sku, name);
                    }
                    setFavProduct(!favProduct);
                  }

                  return (
                    <TableRow
                      id="tableRow"
                      style={{
                        height: 33 * emptyRows,
                      }}
                      hover
                      tabIndex={-1}
                      key={Math.random()}
                      sx={{
                        cursor: "pointer",
                        backgroundColor: "#00000008",
                        paddingBottom: 0,
                      }}
                    >
                      <TableCell padding="none">
                        <Checkbox
                          id="addtolistCheckbox"
                          sx={{ paddingRight: 1 }}
                          color="info"
                          size="small"
                          onClick={() => handleClick(row.sku)}
                          key={row.sku}
                          checked={isItemSelected}
                        />
                      </TableCell>
                      <TableCell padding="none" align="left">
                        <Checkbox
                          id="favouriteCheckbox"
                          icon={<StarBorderIcon />}
                          checkedIcon={<StarIcon />}
                          color="secondary"
                          checked={localStorage.getItem(row.sku) ? true : false}
                          key={row.sku}
                          onChange={() => handleAddFavourite(row.sku, row.name)}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        key={row.index}
                        align="left"
                        color="white"
                      >
                        {row.name}
                      </TableCell>

                      <TableCell align="right">
                        {row.onSpecial && (
                          <Tooltip title="On Special" placement="left">
                            <IconButton>
                              <SellIcon color="info" />
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