import EnhancedTable from "./components/Datatable";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { TopBar } from "./components/TopBar.tsx";
import { useThemeContext } from "./components/theme/ThemeContextProvider.tsx";
import ToggleDrawerLeft from "./components/Sidebar.tsx";

function App() {
  const { theme } = useThemeContext();

  return (
    <div>
      <ThemeProvider theme={theme}>
        <ToggleDrawerLeft />
        <TopBar />
        <CssBaseline />
        <EnhancedTable />
      </ThemeProvider>
    </div>
  );
}

export default App;
