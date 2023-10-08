export async function GetPrices() {
  await fetch("https://jsonplaceholder.typicode.com/users").then((response) => {
    console.log(response.json);
  });
}
