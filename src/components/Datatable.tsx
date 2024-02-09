import * as React from "react";
import { styled } from "@mui/material/styles";
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
import { useEffect, useState } from "react";
import Chip from "@mui/material/Chip";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import RemoveIcon from "@mui/icons-material/Remove";
import { Button, ButtonGroup } from "@mui/material";

interface Data {
  index: number;
  name: string;
  price: string;
  ratio: string;
  productPackage: string;
  store: string;
  URL: string;
}

export function createData(
  index: number,
  name: string,
  price: string,
  ratio: string,
  productPackage: string,
  store: string,
  URL: string
): Data {
  return {
    index,
    name,
    price,
    ratio,
    productPackage,
    store,
    URL,
  };
}

function CapitalizeFirstLetter(name: string) {
  const word = name;
  const firstLetter = word?.charAt(0);
  const firstLetterCap = firstLetter?.toUpperCase();
  const remainingLetters = word?.slice(1);
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
    id: "ratio",
    numeric: false,
    disablePadding: false,
    label: "Ratio",
  },
  {
    id: "productPackage",
    numeric: false,
    disablePadding: false,
    label: "Packaging",
  },
  {
    id: "store",
    numeric: false,
    disablePadding: false,
    label: "Store",
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
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
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

export default function EnhancedTable() {
  let rows: any = [];

  const [newworldSecret, setnewworldSecret] = useState(
    "Bearer eyJhbGciOiJSUzI1NiJ9.eyJqdGkiOiJmMjc1NTNhMi1lMjdmLTRmMmUtYTBiYy1mMTBlMjIwZDdiYWQiLCJpc3MiOiJvbmxpbmUtY3VzdG9tZXIiLCJzZXNzaW9uSWQiOiI0MDk5OGNkOC1lN2E2LTRmMmUtODYyNi03MDBiOWZlNTgzZDEiLCJiYW5uZXIiOiJNTlciLCJmaXJzdE5hbWUiOiJhbm9ueW1vdXMiLCJlbWFpbCI6ImFub255bW91cyIsInJvbGVzIjpbIkFOT05ZTU9VUyJdLCJleHAiOjE3MDc0NDgyOTV9.gb-Kqr26Wxfb49mmvwtcDmfiSk-S7sxr1rREJoG1LDocOv2HrW9KqXjcPcNy5s8Vw7E5N-I2iiYvgkMW2J3sNHZYbDzsG9DuUhJ1PDZsrm-uW7I8XZNcjjwMkUn23Hj8hHHW4S0fitSrgZ-19vPQ3FB_KoKX8N_aVOkqPQBzmQvrTcwYfZieJgKG3HlDC3Y7jYvqVVwNjEMHJ0kS8Umbmtn2SEd44rbNp0Sm3H_T9v6zOstu9vl3K5-Cm_RO5O1TMWZXTU1xcquGi8U7cE6mQOguQSzVHlEFPtqYlzC9GmB_c75zLMz1OPKpy3s1IjwQ3fqSvZTxFwLTkgDmT5FUGw"
  );
  const [paknsaveSecret, setpaknsaveSecret] = useState(
    "Bearer eyJhbGciOiJSUzI1NiJ9.eyJqdGkiOiJhYWQ3NzY3Mi02MDFiLTQ1YTAtYmNkYy03MmVmYzVlZDRkN2IiLCJpc3MiOiJvbmxpbmUtY3VzdG9tZXIiLCJzZXNzaW9uSWQiOiI2MDk5OWJmNy02YzIzLTQ1Y2YtOGE1ZC04YWYzMDk2OGQyYTEiLCJiYW5uZXIiOiJQTlMiLCJmaXJzdE5hbWUiOiJhbm9ueW1vdXMiLCJlbWFpbCI6ImFub255bW91cyIsInJvbGVzIjpbIkFOT05ZTU9VUyJdLCJleHAiOjE3MDc0NDgzNTB9.tFPZKhYSqUiT3otwx4Ul6AQY4_SNkWitRO-7Rk54Z33i_uMAohmQPC5IwHzTDMSDl-iUCkOW3BmajDLI8tH7kFpPSmuEP8jaCG8vY_exL4AWAqaQ9u9zQnuGLG9KEXp2R9QseyvFXXsbTUT-L02c6ZM0x8ycLfH60Em8Y55xzIkllGVftqWPE6L11dbuJjOfIP2v_QBeeZTvwmxflvrb0B_NLkuCnRKPwkGcVbCEhuTREgRICr_bj8QDGZW40_XZYQKZdHjF6S9kRGJOmwHmNqmtqCVJWg44iHtlhdNNtNsBdEyG8Ww7d7vzkk63uCidGZsYn5JpiCeUKCAPZtODUQ"
  );
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("ratio");
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(-1);
  const [countdownResults, setcountdownResults] = useState([]);
  const [newworldResults, setnewworldResults] = useState([]);
  const [paknsaveResults, setpaknsaveResults] = useState([]);
  const [filterSearchText, setFilterSearchText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchPlaceholderText, setSearchPlaceholderText] = useState(
    "Search for a product"
  );
  const [searchHelperText, setSearchHelperText] = useState("");
  const [chipData, setChipData] = React.useState([]);
  useEffect(() => {}, [countdownResults]);
  useEffect(() => {}, [newworldResults]);
  useEffect(() => {}, [paknsaveResults]);
  useEffect(() => {
    {
      chipData.length != 0 &&
        console.log(chipData.map((e) => e.label).at(chipData.length - 1));
    }
  }, [chipData]);

  const GetData = () => {
    console.log("Start - Countdown");
    fetch(
      `http://localhost:8585/https://www.countdown.co.nz/api/v1/products?target=search&search=${searchTerm}&inStockProductsOnly=true`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setcountdownResults(data.products.items);
        countdownResults != "" && console.log(countdownResults);
        console.log("Done - Countdown");
      });

    console.log("Start - New World");
    const newworldStoreId = "0f82d3fe-acd0-4e98-b3e7-fbabbf8b8ef5"; // Orewa
    fetch(
      `http://localhost:8585/https://www.newworld.co.nz/next/api/products/search?q=${searchTerm}&s=popularity&pg=1&storeId=${newworldStoreId}&publish=true&ps=100`,
      {
        method: "get",
        headers: new Headers({
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
          Authorization: newworldSecret,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data.products);
        setnewworldResults(data.data.products);
        newworldResults != "" && console.log(newworldResults);
        console.log("Done - New World");
      });
    console.log("Start - Pak n Save");
    const paknsaveStoreId = "64eab5b1-8d79-45f4-94f1-02b8cf8b6202"; // Silverdale
    fetch(
      `http://localhost:8585/https://www.paknsave.co.nz/next/api/products/search?q=${searchTerm}&s=popularity&pg=1&storeId=${paknsaveStoreId}&publish=true&ps=100`,
      {
        method: "get",
        headers: new Headers({
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
          Authorization: paknsaveSecret,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data.products);
        setpaknsaveResults(data.data.products);
        paknsaveResults != "" && console.log(paknsaveResults);
        console.log("Done - Pak n Save");
      });
  };

  countdownResults.forEach((product, countdownIndex) => {
    if (product["type"] === "Product") {
      const productName = CapitalizeFirstLetter(product["name"]);
      const store = "Countdown";
      const productPrice = product["price"]["salePrice"].toLocaleString("en", {
        minimumFractionDigits: 2,
      });
      const productSku = product["sku"];
      const ratio = `$${product["size"]["cupPrice"].toLocaleString("en", {
        minimumFractionDigits: 2,
      })} / ${product["size"]["cupMeasure"]?.replace("mL", "ml")}`;
      const productPackage = `${product["size"]["volumeSize"]?.replace(
        "mL",
        "ml"
      )} ${
        product["size"]["packageType"] != null
          ? product["size"]["packageType"]
          : ""
      }`;
      const URL = `https://www.countdown.co.nz/shop/productdetails?stockcode=${productSku}`;
      rows.push(
        createData(
          countdownIndex,
          productName,
          productPrice,
          ratio,
          productPackage,
          store,
          URL
        )
      );
    }
  });

  newworldResults.forEach((product, countdownIndex) => {
    const productName =
      CapitalizeFirstLetter(product["brand"]) +
      " " +
      CapitalizeFirstLetter(product["name"]);
    const store = "New World";
    const productPrice = (product["price"] / 100).toFixed(2);
    const productSku = product["productId"];
    const ratio = `$${(product["comparativePricePerUnit"] / 100).toFixed(
      2
    )} / ${product["comparativeUnitQuantity"]}${product[
      "comparativeUnitQuantityUoM"
    ]
      ?.replace("l", "L")
      ?.replace("mL", "ml")}`;
    const productPackage = `${product["displayName"]
      ?.replace("l", "L")
      ?.replace("mL", "ml")}`;
    const URL = `https://www.newworld.co.nz/shop/product/${productSku?.replace(
      "-",
      "_"
    )}`;
    rows.push(
      createData(
        countdownIndex,
        productName,
        productPrice,
        ratio,
        productPackage,
        store,
        URL
      )
    );
  });

  paknsaveResults.forEach((product, countdownIndex) => {
    const productName =
      CapitalizeFirstLetter(product["brand"]) +
      " " +
      CapitalizeFirstLetter(product["name"]);
    const store = "Pak n Save";
    const productPrice = (product["price"] / 100).toFixed(2);
    const productSku = product["productId"];
    const ratio = `$${(product["comparativePricePerUnit"] / 100).toFixed(
      2
    )} / ${product["comparativeUnitQuantity"]}${product[
      "comparativeUnitQuantityUoM"
    ]
      ?.replace("l", "L")
      ?.replace("mL", "ml")}`;
    const productPackage = `${product["displayName"]
      ?.replace("l", "L")
      ?.replace("mL", "ml")}`;
    const URL = `https://www.paknsave.co.nz/shop/product/${productSku?.replace(
      "-",
      "_"
    )}`;
    rows.push(
      createData(
        countdownIndex,
        productName,
        productPrice,
        ratio,
        productPackage,
        store,
        URL
      )
    );
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

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, countdownResults, newworldResults]
  );

  interface ChipData {
    key: number;
    label: string;
  }

  const ListItem = styled("li")(({ theme }) => ({
    margin: theme.spacing(0.5),
  }));

  const handleDelete = (chipToDelete: ChipData) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  const handleSearch = () => {
    setSearchHelperText("Please search for something");
  };
  return (
    <>
      <Box>
        <ButtonGroup>
          <TextField
            autoComplete="off"
            sx={{ ml: 1, mb: 0.5, width: "485px", flex: 1 }}
            className="searchProduct"
            variant="outlined"
            id="outlined-error-helper-text"
            helperText={searchHelperText}
            placeholder={searchPlaceholderText}
            value={searchTerm}
            onChange={(e) => {
              if (e.target.value === "") {
                setSearchHelperText("");
              }
              setSearchTerm(e.target.value);
              setSearchHelperText("");
              console.log(searchTerm);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                if ((e.target as HTMLInputElement).value === "") {
                  setSearchHelperText("Please search for something");
                } else {
                  e.preventDefault();
                  GetData();
                  setSearchPlaceholderText("Search for a product");
                  setSearchHelperText("");
                  setSearchTerm("");
                }
              }
            }}
          />
          <Button
            variant="contained"
            color="warning"
            size="small"
            endIcon={<SearchIcon />}
            onClick={() => {
              if (searchTerm === "") {
                setSearchHelperText("Please search for something");
              } else {
                GetData();
                setSearchPlaceholderText(searchTerm);
                setSearchHelperText("");
                setSearchTerm("");
              }
            }}
            type="button"
            sx={{ p: "10px" }}
          >
            Search
          </Button>
        </ButtonGroup>
      </Box>
      <Box>
        <ButtonGroup>
          <TextField
            value={filterSearchText}
            autoComplete="off"
            className="filterAProduct"
            sx={{ ml: 1, mb: 0.5, width: "485px", flex: 1 }}
            placeholder="Filter a product"
            onKeyDown={(e) => {
              if (
                e.key === "," &&
                (e.target as HTMLInputElement).value !== ""
              ) {
                setChipData([
                  ...chipData,
                  {
                    key: Math.random(),
                    label: filterSearchText,
                  },
                ]);
                setFilterSearchText("");
                e.preventDefault;
              }
            }}
            onChange={(e) => {
              if (e.target.value !== " ") {
                e.preventDefault;
                e.target.value !== "," &&
                  setFilterSearchText(e.target.value.toLowerCase());
              }
            }}
          />

          <Button
            variant="contained"
            size="small"
            endIcon={<RemoveIcon />}
            onClick={() => setFilterSearchText("")}
            type="button"
            sx={{
              p: "10px",
            }}
            aria-label="search"
          >
            Filter
          </Button>
        </ButtonGroup>
        <Box>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              listStyle: "none",
              p: 0.5,
              m: 0,
            }}
            component="ul"
            variant="string"
            key={Math.random()}
          >
            {chipData.map((data) => {
              return (
                <>
                  <ListItem key={data.key}>
                    <Chip label={data.label} onDelete={handleDelete(data)} />
                  </ListItem>
                </>
              );
            })}
          </Box>
        </Box>
      </Box>

      <Box sx={{ width: "60%" }}>
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
              {visibleRows
                .filter((row) => {
                  return chipData.length === 0
                    ? row
                    : !row.name
                        .toLowerCase()
                        .includes(
                          chipData.map((e) => e.label).at(chipData.length - 1)
                        );
                })
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={Math.random()}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell padding="none"></TableCell>

                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        key={row.index}
                        align="left"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="left">${row.price}</TableCell>
                      <TableCell align="left">{row.ratio}</TableCell>
                      <TableCell align="left">{row.productPackage}</TableCell>
                      <TableCell align="left">{row.store}</TableCell>

                      <TableCell align="left">
                        <IconButton
                          onClick={() => {
                            open(row.URL, "_blank", "noopener,noreferrer");
                          }}
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
      </Box>
    </>
  );
}
