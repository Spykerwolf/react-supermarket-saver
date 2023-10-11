import { useState } from "react";

export const Getprices = () => {
  const [countdownFetch, setCountdownFetch] = useState("");

  setCountdownFetch("Hello!");
  return console.log(countdownFetch);
};

// export async function Getprices() {
//   console.log("Fetching data...");
//   // console.log(countdownFetch);
//   let myarray = [{}];

//   await fetch(
//     "http://localhost:8585/https://www.countdown.co.nz/api/v1/products?target=search&search=milk&inStockProductsOnly=true"
//   )
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       myarray = data;
//     });

//   console.log("Done!");
//   console.log(myarray);
// }

// const MainLogo = () => {
//   // const { mode, toggleColorMode } = useThemeContext();

//   return (
//     <>
//       <h1>Supermarket Savings</h1>
//       {/* <IconButton onClick={toggleColorMode} color="inherit">
//         {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
//       </IconButton> */}
//       <br></br>
//       <img src="logo.png" />
//       <br></br>
//     </>
//   );
// };

// export default MainLogo;
