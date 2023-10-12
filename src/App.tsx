import MainLogo from "./components/Logo";
// import { SearchProducts } from "./components/Datatable";
import EnhancedTable from "./components/Datatable";
import { CssBaseline, ThemeProvider } from "@mui/material";
import NightModeToggle from "./components/NightModeToggle";
import { useThemeContext } from "./components/theme/ThemeContextProvider.tsx";

function App() {
  const { theme } = useThemeContext();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NightModeToggle />
      <MainLogo />
      <EnhancedTable />
    </ThemeProvider>
  );
}

export default App;
