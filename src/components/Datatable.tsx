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
import SellIcon from "@mui/icons-material/Sell";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Checkbox from "@mui/material/Checkbox";
import { db } from "../auth/firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { getTokenNewWorld, getTokenPakNSave } from "../auth/auth";
import ArticleIcon from "@mui/icons-material/Article";
import StarsIcon from "@mui/icons-material/Stars";
import Tooltip from "@mui/material/Tooltip";

let rows: any[] = [];

interface Data {
  index: number;
  sku: string | number;
  name: string;
  onSpecial: boolean;
  isFavourite: boolean;
  price: number;
  historicalIcon: string;
  historicalLow: number;
  productPackage: string;
  ratio: string;
  store: string;
  productURL: string;
}

export function createData(
  index: number,
  sku: string | number,
  name: string,
  onSpecial: boolean,
  isFavourite: boolean,
  price: number,
  historicalIcon: string,
  historicalLow: number,
  productPackage: string,
  ratio: string,
  store: string,
  productURL: string
): Data {
  return {
    index,
    sku,
    name,
    onSpecial,
    isFavourite,
    price,
    historicalIcon,
    historicalLow,
    productPackage,
    ratio,
    store,
    productURL,
  };
}

interface HeadCell {
  id: keyof Data;
  label: string;
  numeric: boolean;
}

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

type Order = "asc" | "desc";

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;

  order: Order;
  orderBy: string;
  numSelected: number;
}

export function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
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

interface EnhancedTableToolbarProps {
  numSelected: number;
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
export default function EnhancedTable() {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("ratio");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(-1);
  const [countdownresults, setCountdownresults] = useState<any[]>([]);
  const [newworldResults, setnewworldResults] = useState([]);

  const [newworldProductSKUs, setNewworldProductSKUs] = useState([]);
  const [paknsaveResults, setpaknsaveResults] = useState<any[]>([]);
  const [paknsaveProductSKUs, setPaknsaveProductSKUs] = useState([]);

  const [filterSearchText, setFilterSearchText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchPlaceholderText, setSearchPlaceholderText] = useState(
    "Search for a product"
  );
  const [searchHelperText, setSearchHelperText] = useState("");
  const [tags, setTags] = useState<any[]>([]);
  const [mycoolrows, setMycoolrows] = useState([] as any);
  const productIdTogetherNewWorld: string[] = [];
  const [favProduct, setFavProduct] = useState(false);
  const productIdTogetherPaknsave: string[] = [];

  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [rowCount, setRowCount] = useState(0);

  useEffect(() => {
    getTokenNewWorld();
    getTokenPakNSave();
  }, []);

  useEffect(() => {
    async function extractSKUsNewWorld() {
      newworldProductSKUs.forEach((product) => {
        productIdTogetherNewWorld.push(product["productID"]);
      });
    }

    newworldProductSKUs !== undefined && extractSKUsNewWorld();
  }, [newworldProductSKUs]);

  useEffect(() => {
    async function extractSKUsPaknSave() {
      paknsaveProductSKUs.forEach((product) => {
        productIdTogetherPaknsave.push(product["productID"]);
      });
    }

    paknsaveProductSKUs !== undefined && extractSKUsPaknSave();
  }, [paknsaveProductSKUs]);

  useEffect(() => {
    async function getDataNewWorld() {
      const combineNewworldSKUsWithProducts: Response = await fetch(
        `https://api-prod.newworld.co.nz/v1/edge/store/0f82d3fe-acd0-4e98-b3e7-fbabbf8b8ef5/decorateProducts`,
        {
          method: "post",
          headers: new Headers({
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
            Authorization: localStorage.getItem("NEW_WORLD_SECRET") as string,
            "Content-Type": "application/json",
          }),
          body: JSON.stringify({ productIds: productIdTogetherNewWorld }),
        }
      );
      const newworldSKUsJSON = await combineNewworldSKUsWithProducts.json();
      setnewworldResults(newworldSKUsJSON.products);
    }

    productIdTogetherNewWorld.length !== 0 && getDataNewWorld();
  }, [productIdTogetherNewWorld]);

  useEffect(() => {
    async function getDataPaknSave() {
      const combinePaknSaveSKUsWithProducts: Response = await fetch(
        `https://api-prod.newworld.co.nz/v1/edge/store/64eab5b1-8d79-45f4-94f1-02b8cf8b6202/decorateProducts`,
        {
          method: "post",
          headers: new Headers({
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
            Authorization: localStorage.getItem("PAK_N_SAVE_SECRET") as string,
            "Content-Type": "application/json",
          }),
          body: JSON.stringify({ productIds: productIdTogetherPaknsave }),
        }
      );
      const paknsaveSKUsJSON = await combinePaknSaveSKUsWithProducts.json();
      setpaknsaveResults(paknsaveSKUsJSON.products);
    }

    productIdTogetherPaknsave.length !== 0 && getDataPaknSave();
  }, [productIdTogetherPaknsave]);

  useEffect(() => {
    async function displayResultsNewWorld() {
      if (newworldResults !== undefined) {
        let searchTermArray = searchTerm.split(" ");
        newworldResults.forEach((product, index) => {
          const productName: string = product["brand"]
            ? `${CapitalizeFirstLetter(product["brand"])} ${product["name"]}`
            : CapitalizeFirstLetter(product["name"]);
          if (
            searchTermArray.some((e) =>
              productName.toLowerCase().replace("-", " ").includes(e)
            )
          ) {
            const store = "New World";
            const productPrice: any = (
              product["singlePrice"]["price"] / 100
            ).toFixed(2);

            const productSpecialPrice: number = product["promotions"]
              ? (product["promotions"][0]["rewardValue"] / 100).toFixed(2)
              : productPrice;
            const productSku: string = product["productId"];

            const productCupPrice: any = product["singlePrice"][
              "comparativePrice"
            ]
              ? product["singlePrice"]["comparativePrice"]["pricePerUnit"]
              : "";

            const productCupUnit = product["singlePrice"]["comparativePrice"]
              ? product["singlePrice"]["comparativePrice"]["unitQuantity"]
              : "";
            const productCupMeasure: string = product["singlePrice"][
              "comparativePrice"
            ]
              ? product["singlePrice"]["comparativePrice"]["unitQuantityUom"]
              : "";

            const ratio =
              productCupMeasure &&
              `$${(productCupPrice / 100).toFixed(
                2
              )} / ${productCupUnit} ${productCupMeasure
                ?.replace("l", "L")
                ?.replace("mL", "ml")}`;
            const displayName: string = product["displayName"];
            const productPackage: string = `${displayName
              ?.replace("l", "L")
              ?.replace("mL", "ml")}`;
            const productURL: string = `https://www.newworld.co.nz/shop/product/${productSku?.replace(
              "-",
              "_"
            )}`;
            const onSpecial = product["promotions"] ? true : false;

            handleHistoricalLow();

            async function handleHistoricalLow() {
              const docRef = doc(db, store, productSku);
              const docSnap = await getDoc(docRef);
              let existingHistoricalLow = await docSnap.data()?.historicalLow;

              if (!existingHistoricalLow) {
                try {
                  await setDoc(
                    doc(db, store, productSku),
                    {
                      name: productName,
                      onSpecial: onSpecial,
                      price: productSpecialPrice,
                      historicalLow: productSpecialPrice,
                      productPackage: productPackage,
                      ratio: ratio,
                      store: store,
                      URL: productURL,
                    },
                    { merge: true }
                  );

                  console.log("SKU added: ", productSku);
                } catch (e) {
                  console.error("Error adding document: ", e);
                }
                existingHistoricalLow = productSpecialPrice;
              } else if (productSpecialPrice < existingHistoricalLow) {
                console.log("New Special Price!");
                try {
                  const docRef: any = await setDoc(
                    doc(db, store, productSku),
                    {
                      historicalLow: productSpecialPrice,
                    },
                    { merge: true }
                  );
                  existingHistoricalLow = productSpecialPrice;
                  console.log("Document written with ID: ", docRef?.id);
                } catch (e) {
                  console.error("Error adding document: ", e);
                }
              }
              rows.push(
                createData(
                  index,
                  productSku,
                  productName,
                  onSpecial,
                  favProduct,
                  productSpecialPrice,
                  "",
                  existingHistoricalLow,
                  productPackage,
                  ratio,
                  store,
                  productURL
                )
              );
              setMycoolrows([...mycoolrows, rows]);
            }
          }
        });
      }
    }
    displayResultsNewWorld();
  }, [newworldResults]);

  useEffect(() => {
    async function displayResultsPaknSave() {
      if (paknsaveResults !== undefined) {
        let searchTermArray = searchTerm.split(" ");
        paknsaveResults.forEach((product, index) => {
          const productName: string = product["brand"]
            ? `${CapitalizeFirstLetter(product["brand"])} ${product["name"]}`
            : CapitalizeFirstLetter(product["name"]);
          if (
            searchTermArray.some((e) =>
              productName.toLowerCase().replace("-", " ").includes(e)
            )
          ) {
            const store = "Pak n Save";
            const productPrice: any = (
              product["singlePrice"]["price"] / 100
            ).toFixed(2);

            const productSpecialPrice: number = product["promotions"]
              ? (product["promotions"][0]["rewardValue"] / 100).toFixed(2)
              : productPrice;
            const productSku: string = product["productId"];

            const productCupPrice: any = product["singlePrice"][
              "comparativePrice"
            ]
              ? product["singlePrice"]["comparativePrice"]["pricePerUnit"]
              : "";

            const productCupUnit = product["singlePrice"]["comparativePrice"]
              ? product["singlePrice"]["comparativePrice"]["unitQuantity"]
              : "";
            const productCupMeasure: string = product["singlePrice"][
              "comparativePrice"
            ]
              ? product["singlePrice"]["comparativePrice"]["unitQuantityUom"]
              : "";

            const ratio =
              productCupMeasure &&
              `$${(productCupPrice / 100).toFixed(
                2
              )} / ${productCupUnit} ${productCupMeasure
                ?.replace("l", "L")
                ?.replace("mL", "ml")}`;
            const displayName: string = product["displayName"];
            const productPackage: string = `${displayName
              ?.replace("l", "L")
              ?.replace("mL", "ml")}`;
            const productURL: string = `https://www.paknsave.co.nz/shop/product/${productSku?.replace(
              "-",
              "_"
            )}`;
            const onSpecial = product["promotions"] ? true : false;

            handleHistoricalLow();

            async function handleHistoricalLow() {
              const docRef = doc(db, store, productSku);
              const docSnap = await getDoc(docRef);
              let existingHistoricalLow = await docSnap.data()?.historicalLow;

              if (!existingHistoricalLow) {
                try {
                  await setDoc(
                    doc(db, store, productSku),
                    {
                      name: productName,
                      onSpecial: onSpecial,
                      price: productSpecialPrice,
                      historicalLow: productSpecialPrice,
                      productPackage: productPackage,
                      ratio: ratio,
                      store: store,
                      URL: productURL,
                    },
                    { merge: true }
                  );

                  console.log("SKU added: ", productSku);
                } catch (e) {
                  console.error("Error adding document: ", e);
                }
                existingHistoricalLow = productSpecialPrice;
              } else if (productSpecialPrice < existingHistoricalLow) {
                console.log("New Special Price!");
                try {
                  const docRef: any = await setDoc(
                    doc(db, store, productSku),
                    {
                      historicalLow: productSpecialPrice,
                    },
                    { merge: true }
                  );
                  existingHistoricalLow = productSpecialPrice;
                  console.log("Document written with ID: ", docRef?.id);
                } catch (e) {
                  console.error("Error adding document: ", e);
                }
              }
              rows.push(
                createData(
                  index,
                  productSku,
                  productName,
                  onSpecial,
                  favProduct,
                  productSpecialPrice,
                  "",
                  existingHistoricalLow,
                  productPackage,
                  ratio,
                  store,
                  productURL
                )
              );
              setMycoolrows([...mycoolrows, rows]);
            }
          }
        });
      }
    }
    displayResultsPaknSave();
  }, [paknsaveResults]);
  useEffect(() => {
    if (countdownresults.length !== 0) {
      countdownresults.forEach((product, index) => {
        if (product["type"] === "Product") {
          const productName: string = CapitalizeFirstLetter(product["name"]);
          if (
            searchTermArray.some((e) => productName.toLowerCase().includes(e))
          ) {
            const store = "Countdown";
            const productPrice: number = product["price"][
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
              : "";
            const productVolumeSize: string =
              product["size"]["volumeSize"] != null
                ? product["size"]["volumeSize"]
                : "";
            const productPackage = `${productVolumeSize?.replace("mL", "ml")} ${
              product["size"]["packageType"] !== null
                ? product["size"]["packageType"]
                : ""
            }`;
            const productURL = `https://www.countdown.co.nz/shop/productdetails?stockcode=${productSku}`;
            const onSpecial = product["price"]["isSpecial"] ? true : false;

            const productSpecialPrice: number = onSpecial
              ? product["price"]["salePrice"].toLocaleString("en", {
                  minimumFractionDigits: 2,
                })
              : productPrice;

            handleHistoricalLow();

            async function handleHistoricalLow() {
              const docRef = doc(db, store, productSku);
              const docSnap = await getDoc(docRef);
              let existingHistoricalLow = await docSnap.data()?.historicalLow;

              if (!existingHistoricalLow) {
                try {
                  await setDoc(
                    doc(db, store, productSku),
                    {
                      name: productName,
                      onSpecial: onSpecial,
                      price: productSpecialPrice,
                      historicalLow: productSpecialPrice,
                      productPackage: productPackage,
                      ratio: ratio,
                      store: store,
                      URL: productURL,
                    },
                    { merge: true }
                  );

                  console.log("SKU added: ", productSku);
                } catch (e) {
                  console.error("Error adding document: ", e);
                }
                existingHistoricalLow = productSpecialPrice;
              } else if (productSpecialPrice < existingHistoricalLow) {
                console.log("New Special Price!");
                try {
                  const docRef: any = await setDoc(
                    doc(db, store, productSku),
                    {
                      historicalLow: productSpecialPrice,
                    },
                    { merge: true }
                  );
                  existingHistoricalLow = productSpecialPrice;
                  console.log(rows);
                  rows.forEach((e) => {
                    console.log(e.historicalLow);
                  });
                  console.log("Document written with ID: ", docRef?.id);
                } catch (e) {
                  console.error("Error adding document: ", e);
                }
              }
              rows.push(
                createData(
                  index,
                  productSku,
                  productName,
                  onSpecial,
                  favProduct,
                  productSpecialPrice,
                  "",
                  existingHistoricalLow,
                  productPackage,
                  ratio,
                  store,
                  productURL
                )
              );
              setMycoolrows([...mycoolrows, rows]);
            }
          }
        }
      });
    }
  }, [countdownresults]);

  async function GetSupermarketPrices() {
    setSelected([]);
    rows = [];
    countdown();
    newworld();
    paknsave();

    async function newworld() {
      const storeID: string = "0f82d3fe-acd0-4e98-b3e7-fbabbf8b8ef5"; // Orewa
      getSKUsNewWorld();
      async function getSKUsNewWorld() {
        const fetchNewWorldSkus: Response = await fetch(
          `https://api-prod.newworld.co.nz/v1/edge/search/products/query/index/products-index-popularity-asc`,
          {
            method: "post",
            headers: new Headers({
              "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
              Authorization: localStorage.getItem("NEW_WORLD_SECRET") as string,
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

        const newworldResponse = await fetchNewWorldSkus.json();
        setNewworldProductSKUs(newworldResponse.hits);
      }
    }

    async function countdown() {
      const fetchCountDownData = await fetch(
        `http://localhost:8585/https://www.countdown.co.nz/api/v1/products?target=search&search=${searchTerm}&inStockProductsOnly=true`
      );
      const countdownResponse = await fetchCountDownData.json();
      setCountdownresults(countdownResponse.products.items);
    }

    async function paknsave() {
      const storeID: string = "64eab5b1-8d79-45f4-94f1-02b8cf8b6202"; // Silverdale
      getSKUsPaknSave();
      async function getSKUsPaknSave() {
        const fetchPaknSaveDataSkus: Response = await fetch(
          `https://api-prod.newworld.co.nz/v1/edge/search/products/query/index/products-index-popularity-asc`,
          {
            method: "post",
            headers: new Headers({
              "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
              Authorization: localStorage.getItem(
                "PAK_N_SAVE_SECRET"
              ) as string,
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

        const paknsaveResponse = await fetchPaknSaveDataSkus.json();
        setPaknsaveProductSKUs(paknsaveResponse.hits);
      }
    }
  }

  let searchTermArray = searchTerm.split(" ");

  const handleRequestSort = (
    _event: React.MouseEvent<unknown>,
    property: keyof Data
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

  const ListItem = styled("li")(({ theme }) => ({
    margin: theme.spacing(0.5),
  }));

  const handleDelete = (tagToDelete: string) => () => {
    setTags((tags) => tags.filter((tag) => tag !== tagToDelete));
  };

  const existingTag = tags.some((tag) => filterSearchText.includes(tag));

  const filteredVisibleRows = visibleRows.filter((row) => {
    const tagInRowName = tags.some((item) =>
      row.name.toLowerCase().includes(item.toLowerCase())
    );
    if (tags.length === 0) {
      return row;
    } else if (!tagInRowName) {
      return row;
    }
  }).length;

  React.useMemo(() => setRowCount(filteredVisibleRows), [filteredVisibleRows]);

  function handleSearchInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value === "") {
      setSearchHelperText("");
    }

    if (e.target.value.length >= 0) {
      setSearchTerm(e.target.value);
      setSearchHelperText("");
    }
  }

  function handleSearchEnterKey(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      if ((e.target as HTMLInputElement).value === "") {
        setSearchHelperText("Please search for something");
        setTimeout(() => {
          setSearchHelperText("");
        }, 1500);
      } else {
        e.preventDefault();
        setTags([]);
        searchTerm != "" && GetSupermarketPrices();
        setSearchTerm("");
        setSearchPlaceholderText("Search for a product");
        setSearchHelperText("");
      }
    }
  }

  function handleSearchButton() {
    if (searchTerm === "") {
      setSearchHelperText("Please search for something");
    } else {
      setTags([]);
      GetSupermarketPrices();
      setSearchPlaceholderText(searchTerm);
      setSearchHelperText("");
    }
  }

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

  function handleFilter(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value !== " ") {
      e.preventDefault;
      e.target.value !== "," &&
        setFilterSearchText(e.target.value.toLowerCase().replace(",", ""));
    }
  }

  return (
    <>
      <Box justifyContent="center" display={"flex"}>
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
              width: "485px",
              flex: 1,
            }}
            variant="outlined"
            id="outlined-error-helper-text"
            helperText={searchHelperText}
            placeholder={searchPlaceholderText}
            value={searchTerm}
            onChange={handleSearchInputChange}
            onKeyDown={handleSearchEnterKey}
          />
          <Button
            variant="contained"
            color="warning"
            size="small"
            endIcon={<SearchIcon />}
            onClick={handleSearchButton}
            type="button"
            sx={{
              marginBottom: "5px",
              height: "42px",
            }}
          >
            Search
          </Button>
        </ButtonGroup>
      </Box>
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
              onChange={handleFilter}
            />
            <Button
              id="filterButton"
              variant="contained"
              size="small"
              endIcon={<RemoveIcon />}
              onClick={() => setFilterSearchText("")}
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

                  return (
                    <TableRow
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
                          onClick={() => {
                            handleClick(row.sku);
                          }}
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
                          onChange={() => {
                            if (localStorage.getItem(row.sku)) {
                              localStorage.removeItem(row.sku);
                            } else {
                              localStorage.setItem(row.sku, row.name);
                            }
                            setFavProduct(!favProduct);
                          }}
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
                            open(
                              row.productURL,
                              "_blank",
                              "noopener,noreferrer"
                            );
                          }}
                          onMouseDown={(e) => {
                            if (e.button === 1) {
                              open(
                                row.productURL,
                                "_blank",
                                "noopener,noreferrer"
                              );
                            }
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
