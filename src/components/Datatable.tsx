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
import Autocomplete from "@mui/material/Autocomplete";

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
  numSelected: number;
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
  let rows: any = [];

  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("ratio");
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState("75");
  const [countdownResults, setcountdownResults] = useState([]);
  const [countdownAPIStatus, setCountdownAPIStatus] = useState("");
  const [newworldResults, setnewworldResults] = useState([]);
  const [newworldAPIStatus, setNewworldAPIStatus] = useState("");
  const [newworldProductIDs, setNewworldProductIDs] = useState([]);
  const [paknsaveResults, setpaknsaveResults] = useState([]);
  const [paknsaveAPIStatus, setPaknsaveAPIStatus] = useState("");
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

  async function GetData() {
    const newworldStoreId: string = "0f82d3fe-acd0-4e98-b3e7-fbabbf8b8ef5"; // Orewa

    const fetchNewWorldSkus: Response = await fetch(
      `http://localhost:8585/https://api-prod.newworld.co.nz/v1/edge/search/products/query/index/products-index-popularity-asc`,
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
            attributesToHighlight: [],
            attributesToRetrieve: ["productID", "Type", "sponsored"],
            facetFilters: [["tobacco:false"]],
            facets: [
              "brand",
              "category2NI",
              "onPromotion",
              "productFacets",
              "tobacco",
            ],
            filters: `stores:${newworldStoreId}`,
            highlightPostTag: "__/ais-highlight__",
            highlightPreTag: "__ais-highlight__",
            hitsPerPage: 50,
            maxValuesPerFacet: 100,
            page: 0,
            query: searchTerm,
          },
          adDomain: "SEARCH_PAGE",
          disableAds: false,
          publishImpressionEvent: true,
        }),
      }
    );

    !fetchNewWorldSkus.ok
      ? setNewworldAPIStatus("API key needs refreshing")
      : setNewworldAPIStatus("");
    const newworldResponse = await fetchNewWorldSkus.json();
    console.log(newworldResponse.hits);

    setNewworldProductIDs(newworldResponse.hits);

    let productIdTogether: string[] = [];
    newworldProductIDs !== undefined &&
      newworldProductIDs.forEach((product) => {
        productIdTogether.push(product["productID"]);
      });

    // Send skus to get products

    const combineNewworldSKUsWithProducts: Response = await fetch(
      `https://api-prod.newworld.co.nz/v1/edge/store/0f82d3fe-acd0-4e98-b3e7-fbabbf8b8ef5/decorateProducts`,
      {
        method: "post",
        headers: new Headers({
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
          Authorization: newworldSecretToken,
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({ productIds: productIdTogether }),
      }
    );
    const newworldSKUsJSON = await combineNewworldSKUsWithProducts.json();
    newworldSKUsJSON;
    console.log(newworldSKUsJSON.products);
    setnewworldResults(newworldSKUsJSON.products);
  }

  newworldResults !== undefined &&
    newworldResults.forEach((product, countdownIndex) => {
      // console.log(product);
      const productName = product["brand"]
        ? `${product["brand"]} ${product["name"]}`
        : product["name"];
      if (
        productName
          .toLowerCase()
          .replace("-", " ")
          .includes(searchTerm.toLowerCase())
      ) {
        const store = "New World";
        const productStandardPrice = (
          product["singlePrice"]["price"] / 100
        ).toFixed(2);

        const productSpecialPrice = product["promotions"]
          ? (product["promotions"][0]["rewardValue"] / 100).toFixed(2)
          : productStandardPrice;
        const productSku = product["productId"];

        const productCupPrice = product["singlePrice"]["comparativePrice"]
          ? product["singlePrice"]["comparativePrice"]["pricePerUnit"]
          : "";

        const productCupUnit = product["singlePrice"]["comparativePrice"]
          ? product["singlePrice"]["comparativePrice"]["unitQuantity"]
          : "";
        const productCupMeasure = product["singlePrice"]["comparativePrice"]
          ? product["singlePrice"]["comparativePrice"]["unitQuantityUom"]
          : "";

        const ratio =
          productCupMeasure &&
          `$${(productCupPrice / 100).toFixed(
            2
          )} / ${productCupUnit} ${productCupMeasure
            ?.replace("l", "L")
            ?.replace("mL", "ml")}`;

        const productPackage = `${product["displayName"]
          ?.replace("l", "L")
          ?.replace("mL", "ml")}`;
        const URL = `https://www.newworld.co.nz/shop/product/${productSku?.replace(
          "-",
          "_"
        )}`;
        const onSpecial = product["promotions"] && true;
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
      console.log(productName.toLowerCase());
      console.log(searchTerm.toLowerCase());
      console.log(rows);
    });

  //   // const paknsaveStoreId = "64eab5b1-8d79-45f4-94f1-02b8cf8b6202"; // Silverdale
  //   // const fetchPaknSaveData = fetch(
  //   //   `http://localhost:8585/https://www.paknsave.co.nz/next/api/products/search?q=${searchTerm}&s=popularity&pg=1&storeId=${paknsaveStoreId}&publish=true&ps=100`,
  //   //   {
  //   //     method: "get",
  //   //     headers: new Headers({
  //   //       "User-Agent":
  //   //         "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
  //   //       Authorization: paknsaveSecretToken,
  //   //     }),
  //   //   }
  //   // );
  //   // fetchPaknSaveData
  //   //   .then((response) => response.json())
  //   //   .then((data) => {
  //   //     setpaknsaveResults(data.data.products);
  //   //   });
  // };

  // console.log(newworldProductIDs);

  // countdownResults.forEach((product, countdownIndex) => {
  //   if (product["type"] === "Product") {
  //     const productName: string = product["name"];
  //     if (productName.toLowerCase().includes(searchTerm.toLowerCase())) {
  //       const store = "Countdown";
  //       const productPrice = product["price"]["salePrice"].toLocaleString(
  //         "en",
  //         {
  //           minimumFractionDigits: 2,
  //         }
  //       );
  //       const productSku = product["sku"];
  //       const productCupPrice = product["size"]["cupPrice"].toLocaleString(
  //         "en",
  //         {
  //           minimumFractionDigits: 2,
  //         }
  //       );
  //       const productCupMeasure = product["size"]["cupMeasure"]
  //         ? product["size"]["cupMeasure"].replace("mL", "ml")
  //         : "";
  //       const ratio = productCupMeasure
  //         ? `$${productCupPrice} / ${productCupMeasure}`
  //         : "*";
  //       const productPackage = `${product["size"]["volumeSize"]?.replace(
  //         "mL",
  //         "ml"
  //       )} ${
  //         product["size"]["packageType"] != null
  //           ? product["size"]["packageType"]
  //           : ""
  //       }`;
  //       const URL = `https://www.countdown.co.nz/shop/productdetails?stockcode=${productSku}`;
  //       rows.push(
  //         createData(
  //           countdownIndex,
  //           CapitalizeFirstLetter(productName),
  //           productPrice,
  //           ratio,
  //           productPackage,
  //           store,
  //           URL
  //         )
  //       );
  //     }
  //   }
  // });

  // paknsaveResults.forEach((product, countdownIndex) => {
  //   const productName = product["brand"]
  //     ? `${product["brand"]} ${product["name"]}`
  //     : product["name"];
  //   if (productName.toLowerCase().includes(searchTerm.toLowerCase())) {
  //     const store = "Pak n Save";
  //     const productPrice = (product["price"] / 100).toFixed(2);
  //     const productSku = product["productId"];
  //     const productCupPrice = product["comparativePricePerUnit"]
  //       ? product["comparativePricePerUnit"]
  //       : "";
  //     const productCupUnit = product["comparativeUnitQuantity"]
  //       ? product["comparativeUnitQuantity"]
  //       : "";
  //     const productCupMeasure = product["comparativeUnitQuantityUoM"]
  //       ? product["comparativeUnitQuantityUoM"]
  //       : "";
  //     const ratio = productCupMeasure
  //       ? `$${(productCupPrice / 100).toFixed(
  //           2
  //         )} / ${productCupUnit} ${productCupMeasure
  //           ?.replace("l", "L")
  //           ?.replace("mL", "ml")}`
  //       : "*";

  //     const productPackage = `${product["displayName"]
  //       ?.replace("l", "L")
  //       ?.replace("mL", "ml")}`;
  //     const URL = `https://www.paknsave.co.nz/shop/product/${productSku?.replace(
  //       "-",
  //       "_"
  //     )}`;
  //     rows.push(
  //       createData(
  //         countdownIndex,
  //         CapitalizeFirstLetter(productName),
  //         productPrice,
  //         ratio,
  //         productPackage,
  //         store,
  //         URL
  //       )
  //     );
  //   }
  // });

  // console.log(rows.at(0).name);

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
    [
      order,
      orderBy,
      page,
      rowsPerPage,
      countdownResults,
      newworldResults,
      paknsaveResults,
    ]
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

  const top100Films = [
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 },
    { title: "The Godfather: Part II", year: 1974 },
    { title: "The Dark Knight", year: 2008 },
    { title: "12 Angry Men", year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: "Pulp Fiction", year: 1994 },
    {
      title: "The Lord of the Rings: The Return of the King",
      year: 2003,
    },
    { title: "The Good, the Bad and the Ugly", year: 1966 },
    { title: "Fight Club", year: 1999 },
    {
      title: "The Lord of the Rings: The Fellowship of the Ring",
      year: 2001,
    },
    {
      title: "Star Wars: Episode V - The Empire Strikes Back",
      year: 1980,
    },
    { title: "Forrest Gump", year: 1994 },
    { title: "Inception", year: 2010 },
    {
      title: "The Lord of the Rings: The Two Towers",
      year: 2002,
    },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: "Goodfellas", year: 1990 },
    { title: "The Matrix", year: 1999 },
    { title: "Seven Samurai", year: 1954 },
    {
      title: "Star Wars: Episode IV - A New Hope",
      year: 1977,
    },
    { title: "City of God", year: 2002 },
    { title: "Se7en", year: 1995 },
    { title: "The Silence of the Lambs", year: 1991 },
    { title: "It's a Wonderful Life", year: 1946 },
    { title: "Life Is Beautiful", year: 1997 },
    { title: "The Usual Suspects", year: 1995 },
    { title: "Léon: The Professional", year: 1994 },
    { title: "Spirited Away", year: 2001 },
    { title: "Saving Private Ryan", year: 1998 },
    { title: "Once Upon a Time in the West", year: 1968 },
    { title: "American History X", year: 1998 },
    { title: "Interstellar", year: 2014 },
    { title: "Casablanca", year: 1942 },
    { title: "City Lights", year: 1931 },
    { title: "Psycho", year: 1960 },
    { title: "The Green Mile", year: 1999 },
    { title: "The Intouchables", year: 2011 },
    { title: "Modern Times", year: 1936 },
    { title: "Raiders of the Lost Ark", year: 1981 },
    { title: "Rear Window", year: 1954 },
    { title: "The Pianist", year: 2002 },
    { title: "The Departed", year: 2006 },
    { title: "Terminator 2: Judgment Day", year: 1991 },
    { title: "Back to the Future", year: 1985 },
    { title: "Whiplash", year: 2014 },
    { title: "Gladiator", year: 2000 },
    { title: "Memento", year: 2000 },
    { title: "The Prestige", year: 2006 },
    { title: "The Lion King", year: 1994 },
    { title: "Apocalypse Now", year: 1979 },
    { title: "Alien", year: 1979 },
    { title: "Sunset Boulevard", year: 1950 },
    {
      title:
        "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
      year: 1964,
    },
    { title: "The Great Dictator", year: 1940 },
    { title: "Cinema Paradiso", year: 1988 },
    { title: "The Lives of Others", year: 2006 },
    { title: "Grave of the Fireflies", year: 1988 },
    { title: "Paths of Glory", year: 1957 },
    { title: "Django Unchained", year: 2012 },
    { title: "The Shining", year: 1980 },
    { title: "WALL·E", year: 2008 },
    { title: "American Beauty", year: 1999 },
    { title: "The Dark Knight Rises", year: 2012 },
    { title: "Princess Mononoke", year: 1997 },
    { title: "Aliens", year: 1986 },
    { title: "Oldboy", year: 2003 },
    { title: "Once Upon a Time in America", year: 1984 },
    { title: "Witness for the Prosecution", year: 1957 },
    { title: "Das Boot", year: 1981 },
    { title: "Citizen Kane", year: 1941 },
    { title: "North by Northwest", year: 1959 },
    { title: "Vertigo", year: 1958 },
    {
      title: "Star Wars: Episode VI - Return of the Jedi",
      year: 1983,
    },
    { title: "Reservoir Dogs", year: 1992 },
    { title: "Braveheart", year: 1995 },
    { title: "M", year: 1931 },
    { title: "Requiem for a Dream", year: 2000 },
    { title: "Amélie", year: 2001 },
    { title: "A Clockwork Orange", year: 1971 },
    { title: "Like Stars on Earth", year: 2007 },
    { title: "Taxi Driver", year: 1976 },
    { title: "Lawrence of Arabia", year: 1962 },
    { title: "Double Indemnity", year: 1944 },
    {
      title: "Eternal Sunshine of the Spotless Mind",
      year: 2004,
    },
    { title: "Amadeus", year: 1984 },
    { title: "To Kill a Mockingbird", year: 1962 },
    { title: "Toy Story 3", year: 2010 },
    { title: "Logan", year: 2017 },
    { title: "Full Metal Jacket", year: 1987 },
    { title: "Dangal", year: 2016 },
    { title: "The Sting", year: 1973 },
    { title: "2001: A Space Odyssey", year: 1968 },
    { title: "Singin' in the Rain", year: 1952 },
    { title: "Toy Story", year: 1995 },
    { title: "Bicycle Thieves", year: 1948 },
    { title: "The Kid", year: 1921 },
    { title: "Inglourious Basterds", year: 2009 },
    { title: "Snatch", year: 2000 },
    { title: "3 Idiots", year: 2009 },
    { title: "Monty Python and the Holy Grail", year: 1975 },
  ];
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
        {newworldAPIStatus !== "" && `New World: ${newworldAPIStatus}`}
        {/* Countdown: {countdownAPIStatus} <br /> */}
        {/* Pak n Save: {paknsaveAPIStatus} <br /> */}
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
                  searchTerm != "" && GetData();
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
                GetData();
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
          rowsPerPageOptions={[25, 50, 75, { value: -1, label: "All" }]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
      {/* {console.log(`${sortedName[0]} - ${sortedPrice[0]} - ${sortedRatio[0]}`)} */}
    </>
  );
}
