import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

export function ListOfCoffees() {
  const coffees = [
    "Cappuchino",
    "Flat White",
    "Mochachino",
    "Latte",
    "Ice Coffee",
    "Long Black",
  ];

  return (
    <>
      <h1>Types of Coffees</h1>
      {coffees.length === 0 && <p>No item found</p>}
      {coffees.map((coffee) => (
        <nav>
          <ListItemButton>
            <ListItemText primary={coffee} />
          </ListItemButton>
        </nav>
      ))}
    </>
  );
}
