import { ListOfItems } from "./components/ListOfItems";
import Alert from "./components/Alert";

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
      <Alert>
        This is a <span>mudafuga</span> alert!!
      </Alert>
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
