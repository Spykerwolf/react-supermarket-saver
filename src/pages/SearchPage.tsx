import EnhancedTable from "../components/Datatable.tsx";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { TopBar } from "../components/TopBar.tsx";
import { useThemeContext } from "../components/theme/ThemeContextProvider.tsx";
import Sidebar from "../components/Sidebar.tsx";

export default function SearchPage() {
  const { theme } = useThemeContext();

  return (
    <div>
      <ThemeProvider theme={theme}>
        {/* <Sidebar /> */}
        <TopBar />
        <CssBaseline />
        <EnhancedTable />
      </ThemeProvider>
    </div>
  );
}
