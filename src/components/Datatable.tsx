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
import CapitalizeFirstLetter from "./functions/capitalizeFirstLetter";
import { getComparator, stableSort } from "./functions/sortTable";
import { newworldSecretToken, paknsaveSecretToken } from "../secrets";
import SellIcon from "@mui/icons-material/Sell";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Checkbox from "@mui/material/Checkbox";

let rows: any[] = [];

interface Data {
  index: number;
  name: string;
  onSpecial: boolean;
  specialPrice: string;
  standardPrice: string;
  productPackage: string;
  ratio: string;
  store: string;
  URL: string;
}

export function createData(
  index: number,
  name: string,
  onSpecial: boolean,
  specialPrice: string,
  standardPrice: string,
  productPackage: string,
  ratio: string,
  store: string,
  URL: string
): Data {
  return {
    index,
    name,
    onSpecial,
    specialPrice,
    standardPrice,
    productPackage,
    ratio,
    store,
    URL,
  };
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
    id: "onSpecial",
    numeric: false,
    disablePadding: true,
    label: "",
  },
  {
    id: "specialPrice",
    numeric: false,
    disablePadding: false,
    label: "Price",
  },
  {
    id: "standardPrice",
    numeric: false,
    disablePadding: false,
    label: "",
  },

  {
    id: "productPackage",
    numeric: false,
    disablePadding: false,
    label: "Packaging",
  },
  {
    id: "ratio",
    numeric: false,
    disablePadding: false,
    label: "Ratio",
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

type Order = "asc" | "desc";

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;

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
      <TableRow sx={{ bgcolor: "lightgrey" }}>
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
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("name");
  // const [orderBy, setOrderBy] = useState<keyof Data>("ratio");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [countdownresults, setCountdownresults] = useState<any[]>([]);
  const [countdownAPIStatus, setCountdownAPIStatus] = useState("");
  const [newworldResults, setnewworldResults] = useState([]);
  const [newworldAPIStatus, setNewworldAPIStatus] = useState("");
  const [newworldProductSKUs, setNewworldProductSKUs] = useState([]);
  const [paknsaveResults, setpaknsaveResults] = useState<any[]>([]);
  const [paknsaveAPIStatus, setPaknsaveAPIStatus] = useState("");
  const [filterSearchText, setFilterSearchText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchPlaceholderText, setSearchPlaceholderText] = useState(
    "Search for a product"
  );
  const [searchHelperText, setSearchHelperText] = useState("");
  const [chipData, setChipData] = useState<any[]>([]);
  const [mycoolrows, setMycoolrows] = useState([] as any);
  const productIdTogether: string[] = [];

  // useEffect(() => {
  //   async function extractSKUs() {
  //     newworldProductSKUs.forEach((product) => {
  //       productIdTogether.push(product["productID"]);
  //     });
  //   }

  //   newworldProductSKUs !== undefined && extractSKUs();
  // }, [newworldProductSKUs]);

  useEffect(() => {
    rows.length > 0 && console.log("rows", rows);
  }, [rows]);
  // useEffect(() => {
  //   async function getData() {
  //     const combineNewworldSKUsWithProducts: Response = await fetch(
  //       `https://api-prod.newworld.co.nz/v1/edge/store/0f82d3fe-acd0-4e98-b3e7-fbabbf8b8ef5/decorateProducts`,
  //       {
  //         method: "post",
  //         headers: new Headers({
  //           "User-Agent":
  //             "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
  //           Authorization: newworldSecretToken,
  //           "Content-Type": "application/json",
  //         }),
  //         body: JSON.stringify({ productIds: productIdTogether }),
  //       }
  //     );
  //     const newworldSKUsJSON = await combineNewworldSKUsWithProducts.json();
  //     setnewworldResults(newworldSKUsJSON.products);
  //   }

  //   productIdTogether.length && getData();
  // }, [productIdTogether]);

  // useEffect(() => {
  //   // newworldResults?.length && console.log("newworldResults", newworldResults);
  //   async function displayResults() {
  //     if (newworldResults !== undefined) {
  //       let searchTermArray = searchTerm.split(" ");
  //       newworldResults.forEach((product, index) => {
  //         const productName: string = product["brand"]
  //           ? `${product["brand"]} ${product["name"]}`
  //           : product["name"];
  //         if (
  //           searchTermArray.some((e) =>
  //             productName.toLowerCase().replace("-", " ").includes(e)
  //           )
  //         ) {
  //           const store = "New World";
  //           const productStandardPrice = (
  //             product["singlePrice"]["price"] / 100
  //           ).toFixed(2);

  //           const productSpecialPrice = product["promotions"]
  //             ? (product["promotions"][0]["rewardValue"] / 100).toFixed(2)
  //             : productStandardPrice;
  //           const productSku: string = product["productId"];

  //           const productCupPrice: any = product["singlePrice"][
  //             "comparativePrice"
  //           ]
  //             ? product["singlePrice"]["comparativePrice"]["pricePerUnit"]
  //             : "";

  //           const productCupUnit = product["singlePrice"]["comparativePrice"]
  //             ? product["singlePrice"]["comparativePrice"]["unitQuantity"]
  //             : "";
  //           const productCupMeasure: string = product["singlePrice"][
  //             "comparativePrice"
  //           ]
  //             ? product["singlePrice"]["comparativePrice"]["unitQuantityUom"]
  //             : "";

  //           const ratio =
  //             productCupMeasure &&
  //             `$${(productCupPrice / 100).toFixed(
  //               2
  //             )} / ${productCupUnit} ${productCupMeasure
  //               ?.replace("l", "L")
  //               ?.replace("mL", "ml")}`;
  //           const displayName: string = product["displayName"];
  //           const productPackage: string = `${displayName
  //             ?.replace("l", "L")
  //             ?.replace("mL", "ml")}`;
  //           const URL: string = `https://www.newworld.co.nz/shop/product/${productSku?.replace(
  //             "-",
  //             "_"
  //           )}`;
  //           const onSpecial = product["promotions"] && true;

  //           rows.push(
  //             createData(
  //               index,
  //               CapitalizeFirstLetter(productName),
  //               onSpecial,
  //               productSpecialPrice,
  //               productStandardPrice,
  //               productPackage,
  //               ratio,
  //               store,
  //               URL
  //             )
  //           );
  //         }
  //       });
  //       setMycoolrows([rows]);
  //     }
  //   }
  //   displayResults();
  // }, [newworldResults]);

  useEffect(() => {
    if (countdownresults.length !== 0) {
      console.log("countdownresults", countdownresults);
      countdownresults.forEach((product, countdownIndex) => {
        if (product["type"] === "Product") {
          const productName: string = product["name"];
          // console.log("productName", productName);
          // if (productName.toLowerCase().includes(searchTerm.toLowerCase())) {
          if (
            searchTermArray.some((e) => productName.toLowerCase().includes(e))
          ) {
            const store = "Countdown";
            const productStandardPrice = product["price"][
              "originalPrice"
            ].toLocaleString("en", {
              minimumFractionDigits: 2,
            });
            const productSku = product["sku"];
            const productCupPrice = product["size"]["cupPrice"];
            const productCup: string = product["size"]["cupMeasure"];
            const productCupMeasure: string = productCup
              ? productCup.replace("mL", "ml")
              : "";
            const ratio = productCupMeasure
              ? `$${productCupPrice} / ${productCupMeasure}`
              : "*";
            const productVolumeSize: string = product["size"]["volumeSize"];
            const productPackage = `${productVolumeSize?.replace("mL", "ml")} ${
              product["size"]["packageType"] != null
                ? product["size"]["packageType"]
                : ""
            }`;
            const URL = `https://www.countdown.co.nz/shop/productdetails?stockcode=${productSku}`;
            const onSpecial = product["price"]["isSpecial"] && true;

            const productSpecialPrice: string = onSpecial
              ? product["price"]["salePrice"].toLocaleString("en", {
                  minimumFractionDigits: 2,
                })
              : productStandardPrice;

            rows.push(
              createData(
                countdownIndex,
                CapitalizeFirstLetter(productName),
                onSpecial,
                productSpecialPrice,
                productStandardPrice,
                productPackage,
                ratio,
                store,
                URL
              )
            );
          }
        }
      });
      setMycoolrows(rows);
    }
  }, [countdownresults]);

  useEffect(() => {
    if (mycoolrows.length !== 0) {
      console.log("mycoolrows", mycoolrows);
    }
  }, [mycoolrows]);

  // useEffect(() => {}, [paknsaveResults]);
  // useEffect(() => {
  //   {
  //     chipData.length != 0 &&
  //       console.log(chipData.map((e) => e.label).at(chipData.length - 1));
  //   }
  // }, [chipData]);

  async function GetSupermarketPrices() {
    rows = [];
    console.log("rows inside GetSupermarketPrices", rows);
    // newworld();
    countdown();
    // paknsave();

    async function newworld() {
      const storeID: string = "0f82d3fe-acd0-4e98-b3e7-fbabbf8b8ef5"; // Orewa
      getSKUs();
      async function getSKUs() {
        const fetchNewWorldSkus: Response = await fetch(
          `https://api-prod.newworld.co.nz/v1/edge/search/products/query/index/products-index-popularity-asc`,
          {
            method: "post",
            headers: new Headers({
              "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
              Authorization: newworldSecretToken,
              "Content-Type": "application/json",
            }),
            body: JSON.stringify({
              algoliaQuery: {
                attributesToRetrieve: ["productID", "Type", "sponsored"],
                filters: `stores:${storeID}`,
                query: searchTerm,
              },
            }),
          }
        );

        !fetchNewWorldSkus.ok
          ? setNewworldAPIStatus("API key needs refreshing")
          : setNewworldAPIStatus("");
        const newworldResponse = await fetchNewWorldSkus.json();
        setNewworldProductSKUs(newworldResponse.hits);
      }
    }

    async function countdown() {
      const fetchCountDownData = await fetch(
        `http://localhost:8585/https://www.countdown.co.nz/api/v1/products?target=search&search=${searchTerm}&inStockProductsOnly=true`
      );
      !fetchCountDownData.ok
        ? setCountdownAPIStatus("API key needs refreshing")
        : setCountdownAPIStatus("");
      const countdownResponse = await fetchCountDownData.json();
      // console.log("countdownResponse", countdownResponse.products.items);
      setCountdownresults(countdownResponse.products.items);
    }

    async function paknsave() {
      const paknsaveStoreId = "64eab5b1-8d79-45f4-94f1-02b8cf8b6202"; // Silverdale
      const fetchPaknSaveData = await fetch(
        `http://localhost:8585/https://www.paknsave.co.nz/next/api/products/search?q=${searchTerm}&s=popularity&pg=1&storeId=${paknsaveStoreId}&publish=true&ps=50`,
        {
          method: "get",
          headers: new Headers({
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
            Authorization: paknsaveSecretToken,
          }),
        }
      );
      !fetchPaknSaveData.ok
        ? setPaknsaveAPIStatus("API key needs refreshing")
        : setPaknsaveAPIStatus("");
      const paknsaveResponse = await fetchPaknSaveData.json();
      setpaknsaveResults(paknsaveResponse.data.products);
    }
  }

  let searchTermArray = searchTerm.split(" ");

  paknsaveResults.forEach((product, countdownIndex) => {
    const productName = product["brand"]
      ? `${product["brand"]} ${product["name"]}`
      : product["name"];
    if (productName.toLowerCase().includes(searchTerm.toLowerCase())) {
      const store = "Pak n Save";
      const productStandardPrice = (product["price"] / 100).toFixed(2);

      const productSku = product["productId"];

      const productCupPrice: any = product["comparativePricePerUnit"]
        ? product["comparativePricePerUnit"]
        : "";
      const productCupUnit = product["comparativeUnitQuantity"]
        ? product["comparativeUnitQuantity"]
        : "";
      const productCupMeasure = product["comparativeUnitQuantityUoM"]
        ? product["comparativeUnitQuantityUoM"]
        : "";
      const ratio = productCupMeasure
        ? `$${(productCupPrice / 100).toFixed(
            2
          )} / ${productCupUnit} ${productCupMeasure
            ?.replace("l", "L")
            ?.replace("mL", "ml")}`
        : "*";

      const productPackage = `${product["displayName"]
        ?.replace("l", "L")
        ?.replace("mL", "ml")}`;
      const URL = `https://www.paknsave.co.nz/shop/product/${productSku?.replace(
        "-",
        "_"
      )}`;
      const onSpecial = product["promotions"] && true;

      rows.push(
        createData(
          countdownIndex,
          CapitalizeFirstLetter(productName),
          onSpecial,
          productStandardPrice,
          productStandardPrice,
          productPackage,
          ratio,
          store,
          URL
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
    [order, orderBy, page, rowsPerPage, GetSupermarketPrices]
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

  return (
    <>
      <Box
        sx={{
          ml: 2,
          mb: 0,
          width: "485px",
          flex: 1,
        }}
      >
        {newworldAPIStatus !== "" && `New World: ${newworldAPIStatus}~`}
        {paknsaveAPIStatus !== "" && `Pak n Save: ${paknsaveAPIStatus}~`}
        {countdownAPIStatus !== "" && `Countdown: ${countdownAPIStatus}~`}
      </Box>

      <Box>
        <ButtonGroup>
          <TextField
            inputProps={{
              style: {
                padding: 10,
              },
            }}
            multiline={false}
            autoComplete="off"
            sx={{
              ml: 1,
              mb: 0.5,
              width: "485px",
              flex: 1,
            }}
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
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                if ((e.target as HTMLInputElement).value === "") {
                  setSearchHelperText("Please search for something");
                } else {
                  e.preventDefault();
                  searchTerm != "" && GetSupermarketPrices();
                  setSearchPlaceholderText("Search for a product");
                  setSearchHelperText("");
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
                GetSupermarketPrices();
                setSearchPlaceholderText(searchTerm);
                setSearchHelperText("");
              }
            }}
            type="button"
            sx={{
              marginBottom: "5px",
            }}
          >
            Search
          </Button>
        </ButtonGroup>
      </Box>
      <Box>
        <ButtonGroup>
          <TextField
            inputProps={{
              style: {
                padding: 10,
              },
            }}
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
              marginBottom: "5px",
              paddingRight: "20px",
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
              // numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows
                .filter((row) => {
                  let lowerCaseValue: string = row.name;
                  return chipData.length === 0
                    ? row
                    : !lowerCaseValue
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
                      sx={{
                        cursor: "pointer",
                        backgroundColor: "#00000008",
                      }}
                    >
                      <TableCell padding="none">
                        <Checkbox
                          icon={<StarBorderIcon />}
                          checkedIcon={<StarIcon />}
                          color="warning"
                        />
                      </TableCell>

                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        key={row.index}
                        align="left"
                        color="white"
                      >
                        {row.name}
                      </TableCell>

                      <TableCell align="right">
                        {row.onSpecial && (
                          <IconButton>
                            <SellIcon color="info" />
                          </IconButton>
                        )}
                      </TableCell>
                      <TableCell align="left">${row.specialPrice}</TableCell>
                      <TableCell align="left">
                        {row.onSpecial && `$${row.standardPrice}`}
                      </TableCell>
                      <TableCell align="left">{row.productPackage}</TableCell>

                      <TableCell align="left">{row.ratio}</TableCell>
                      <TableCell align="left">{row.store}</TableCell>
                      <TableCell align="left">
                        <IconButton
                          color="warning"
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
          rowsPerPageOptions={[5, 25, 50, 75, { value: -1, label: "All" }]}
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
