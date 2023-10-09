export async function GetPrices() {
  await fetch(
    "http://localhost:8585/https://www.countdown.co.nz/api/v1/products?target=search&search=milk&inStockProductsOnly=true"
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    });
}
