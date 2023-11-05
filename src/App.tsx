import MainLogo from "./components/Logo";
import EnhancedTable from "./components/Datatable";
import { CssBaseline, ThemeProvider } from "@mui/material";
import NightModeToggle from "./components/NightModeToggle";
import { useThemeContext } from "./components/theme/ThemeContextProvider.tsx";
// import ChipsArray from "./components/Test";
function App() {
  const { theme } = useThemeContext();

  return (
    <ThemeProvider theme={theme}>
      <NightModeToggle />
      <MainLogo />
      <CssBaseline />
      <EnhancedTable />
    </ThemeProvider>
    // <ChipsArray />
  );
}

export default App;
