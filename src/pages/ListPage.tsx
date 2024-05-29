import CheckboxList from "../components/List.tsx";
import { useThemeContext } from "../theme/ThemeContextProvider.tsx";
import { ThemeProvider } from "@mui/material";

export default function ListPage() {
  const { theme } = useThemeContext();

  return (
    <ThemeProvider theme={theme}>
      <CheckboxList />
    </ThemeProvider>
  );
}
