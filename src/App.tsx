import EnhancedTable from "./components/Datatable";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { TopBar } from "./components/TopBar.tsx";
import { useThemeContext } from "./components/theme/ThemeContextProvider.tsx";
// import ChipsArray from "./components/Test";

function App() {
  const { theme } = useThemeContext();

  return (
    <div>
      <ThemeProvider theme={theme}>
        <TopBar />
        <CssBaseline />
        <EnhancedTable />
        {/* <ChipsArray /> */}
      </ThemeProvider>
    </div>
  );
}

export default App;
