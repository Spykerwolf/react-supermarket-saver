import * as React from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useEffect, useState } from "react";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import RemoveIcon from "@mui/icons-material/Remove";

interface Data {
  index: number;
  name: string;
  price: string;
  cupsize: string;
  measure: string;
  size: string;
  URL: string;
  image: string;
}

export function createData(
  index: number,
  name: string,
  price: string,
  cupsize: string,
  measure: string,
  size: string,
  URL: string,
  image: string
): Data {
  return {
    index,
    name,
    price,
    cupsize,
    measure,
    size,
    URL,
    image,
  };
}

function CapitalizeFirstLetter(name: string) {
  const word = name;
  const firstLetter = word.charAt(0);
  const firstLetterCap = firstLetter.toUpperCase();
  const remainingLetters = word.slice(1);
  const capitalizedWord = firstLetterCap + remainingLetters;
  return capitalizedWord;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    id: "price",
    numeric: false,
    disablePadding: false,
    label: "Price",
  },
  {
    id: "cupsize",
    numeric: false,
    disablePadding: false,
    label: "Cupsize",
  },
  {
    id: "measure",
    numeric: false,
    disablePadding: false,
    label: "Measure",
  },
  {
    id: "size",
    numeric: false,
    disablePadding: false,
    label: "Size",
  },
  {
    id: "URL",
    numeric: false,
    disablePadding: false,
    label: "URL",
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={Math.random()}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
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
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
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
        <Typography
          sx={{ flex: "1 1 100%" }}
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
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

export default function EnhancedTable() {
  const excludes = [
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

  const rows = [];

  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("price");
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [countdownFetch, setCountdownFetch] = useState([]);
  const [filterSearchText, setFilterSearchText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {}, [countdownFetch]);

  const GetData = () => {
    console.log("Getting data");
    fetch(
      `http://localhost:8585/https://www.countdown.co.nz/api/v1/products?target=search&search=${searchTerm}&inStockProductsOnly=true`
    )
      .then((response) => response.json())
      .then((data) => {
        setCountdownFetch(data.products.items);
        console.log(countdownFetch);
      });
  };

  countdownFetch.forEach((product, countdownIndex) => {
    try {
      const productName = CapitalizeFirstLetter(product["name"]);
      const productPrice = product["price"]["salePrice"];
      const productSku = product["sku"];
      const cupsize = product["size"]["cupPrice"];
      const measure = product["size"]["cupMeasure"];
      const size = product["size"]["volumeSize"];
      const URL = `https://www.countdown.co.nz/shop/productdetails?stockcode=${productSku}`;
      const image = product["images"]["big"];
      rows.push(
        createData(
          countdownIndex,
          productName,
          productPrice,
          cupsize,
          measure,
          size,
          URL,
          image
        )
      );
    } catch (error) {
      const productName = "N/A";
      const productPrice = "N/A";
      const productSku = "N/A";
      const cupsize = "N/A";
      const measure = "N/A";
      const size = "N/A";
      const URL = `https://www.countdown.co.nz/shop/productdetails?stockcode=${productSku}`;
      const image = product["images"]["big"];

      rows.push(
        createData(
          countdownIndex,
          productName,
          productPrice,
          cupsize,
          measure,
          size,
          URL,
          image
        )
      );
    }
  });

  const handleRequestSort = (
    _event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.index);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (_event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
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

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, countdownFetch]
    // [(order, orderBy, page, rowsPerPage, countdownFetch)]
  );

  return (
    <>
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
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search for a product"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              GetData();
            }
          }}
        />

        <IconButton
          onClick={() => {
            GetData();
          }}
          type="button"
          sx={{ p: "10px" }}
        >
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
          selectOnFocus
          disablePortal
          disableClearable
          options={suburbs}
          sx={{ width: 166 }}
          renderInput={({ inputProps, ...params }) => (
            <TextField
              {...params}
              label="Suburb"
              inputProps={{ ...inputProps, readOnly: true }}
            />
          )}
          onInputChange={(_event, value) => {
            const index = suburbs.findIndex((object) => {
              return object.label === value;
            });
            const setSuburb = suburbs[index].id;
            setSearchTerm(setSuburb);
          }}
        />
        <Autocomplete
          className="dropdownExcludes"
          disablePortal
          disableClearable
          options={excludes}
          sx={{ width: 166 }}
          renderInput={({ inputProps, ...params }) => (
            <TextField
              {...params}
              label="Exclude"
              inputProps={{ ...inputProps, readOnly: true }}
            />
          )}
          onInputChange={(_event, value) => {
            const index = excludes.findIndex((object) => {
              return object.label === value;
            });
            const coffeeArrayExcludes = excludes[index].exclude;
            setFilterSearchText(coffeeArrayExcludes);
          }}
        />
        <Autocomplete
          className="dropdownDepartments"
          disablePortal
          disableClearable
          options={departments}
          sx={{ width: 166 }}
          renderInput={({ inputProps, ...params }) => (
            <TextField
              {...params}
              label="Department"
              inputProps={{ ...inputProps, readOnly: true }}
            />
          )}
          onInputChange={(_event, value) => {
            const index = departments.findIndex((object) => {
              return object.label === value;
            });
            const setDepartment = departments[index].id;
            setSearchTerm(setDepartment);
          }}
        />
      </Paper>

      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "60%", mb: 2 }}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={"small"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {visibleRows.map((row, index) => {
                  const isItemSelected = isSelected(row.index);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.index)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={Math.random()}
                      selected={isItemSelected}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        key={row.index}
                        align="left"
                        onMouseOver={() => {
                          console.log(row.image);
                        }}
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="left">${row.price}</TableCell>
                      <TableCell align="left">{row.cupsize}</TableCell>
                      <TableCell align="left">{row.measure}</TableCell>
                      <TableCell align="left">{row.size}</TableCell>
                      <TableCell align="left">
                        <IconButton
                          onClick={() =>
                            open(row.URL, "_blank", "noopener,noreferrer")
                          }
                          onMouseDown={(e) => {
                            if (e.button === 1) {
                              open(row.URL, "_blank", "noopener,noreferrer");
                            }
                          }}
                        >
                          <ShoppingCartIcon />
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
          <TablePagination
            rowsPerPageOptions={[10, 25, { value: -1, label: "All" }]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </>
  );
}
