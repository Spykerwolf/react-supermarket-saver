import MainLogo from "./components/Logo";
import { SearchProducts } from "./components/FilterProducts";
import { GetPrices } from "./components/Prices";

function App() {
  GetPrices();
  return (
    <div>
      <MainLogo />
      <SearchProducts />
    </div>
  );
}

export default App;
