import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { getTokenNewWorld, getTokenPakNSave } from "../auth/auth";
import { CapitalizeFirstLetter } from "./functions/sharedFunctions";
import { db } from "../auth/firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
export let rows: any[] = [];
import { SearchProps, TableRowProps } from "../types/types";

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
): TableRowProps {
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
export function Search(props: SearchProps) {
  const {
    searchTerm,
    setSearchTerm,
    searchPlaceholderText,
    setSearchPlaceholderText,
    searchHelperText,
    setSearchHelperText,
    setTags,
    setSelected,
    mycoolrows,
    setMycoolrows,
    favProduct,
  } = props;

  const [countdownresults, setCountdownresults] = useState<any[]>([]);
  const [newworldResults, setnewworldResults] = useState([]);
  const [newworldProductSKUs, setNewworldProductSKUs] = useState([]);
  const [paknsaveResults, setpaknsaveResults] = useState<any[]>([]);
  const [paknsaveProductSKUs, setPaknsaveProductSKUs] = useState([]);
  const productIdTogetherPaknsave: string[] = [];
  const productIdTogetherNewWorld: string[] = [];
  const [searchvalue, setSearchvalue] = useState("");

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

  useEffect(() => {
    if (searchTerm != "") {
      setTags([]);
      GetSupermarketPrices();
      setSearchTerm("");
      setSearchPlaceholderText("Search for a product");
      setSearchvalue("");
    }
  }, [searchTerm]);
  let searchTermArray = searchTerm.split(" ");

  // maybe problem
  async function handleSearchEnterKey(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      if ((e.target as HTMLInputElement).value.length === 0) {
        setSearchHelperText("Please search for something");
        setTimeout(() => {
          setSearchHelperText("");
        }, 1500);
      } else if ((e.target as HTMLInputElement).value.length > 0) {
        setSearchTerm((e.target as HTMLInputElement).value);
      }
    }
  }

  async function handleSearchButton() {
    if (searchvalue === "") {
      setSearchHelperText("Please search for something");
      setTimeout(() => {
        setSearchHelperText("");
      }, 1500);
    } else {
      setSearchTerm(searchvalue);
      setTags([]);
      GetSupermarketPrices();
      setSearchPlaceholderText(searchTerm);
    }
  }

  async function handleSearchInputChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    if (e.target.value === "") {
      console.log("Showing helper text");
      setSearchHelperText("");
    }

    if (e.target.value.length >= 0 || e.target.value === "Enter") {
      setSearchvalue(e.target.value);
    }
  }

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
            autoComplete="on"
            sx={{
              width: "485px",
              flex: 1,
            }}
            variant="outlined"
            value={searchvalue}
            id="outlined-error-helper-text"
            helperText={searchHelperText}
            placeholder={searchPlaceholderText}
            onKeyDown={handleSearchEnterKey}
            onChange={handleSearchInputChange}
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
    </>
  );
}
