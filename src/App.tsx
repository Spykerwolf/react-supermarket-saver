import { ListOfItems } from "./components/ListOfItems";
import TransitionAlerts from "./components/TransitionAlerts";

function App() {
  const items = [
    "Cappuchino",
    "Flat White",
    "Mochachino",
    "Latte",
    "Ice Coffee",
    "Long Black",
  ];

  const cities = [
    "Auckland",
    "Sydney",
    "New York",
    "San Francisco",
    "Cape Town",
    "Invercargill",
  ];

  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  return (
    <div>
      <TransitionAlerts
        buttonName="Generate alert"
        alertMessage="Fugggma"
        buttonType="contained"
      ></TransitionAlerts>
      <ListOfItems
        items={items}
        headingTitle="Types of Coffees"
        onSelectItem={handleSelectItem}
      />

      <ListOfItems
        items={cities}
        headingTitle="Types of Cities"
        onSelectItem={handleSelectItem}
      />
    </div>
  );
}

export default App;
