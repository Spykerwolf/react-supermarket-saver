import EnhancedTable from "../components/Table.tsx";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useThemeContext } from "../theme/ThemeContextProvider.tsx";
import { Search } from "../components/Search.tsx";
import { useState } from "react";
import { Filter } from "../components/Filter.tsx";
import { SearchPageProps } from "../types/types.ts";

export default function SearchPage(props: SearchPageProps) {
  const { theme } = useThemeContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchPlaceholderText, setSearchPlaceholderText] = useState(
    "Search for a product"
  );
  const [searchHelperText, setSearchHelperText] = useState("");
  const [tags, setTags] = useState<any[]>([]);
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [favProduct, setFavProduct] = useState(false);
  const [mycoolrows, setMycoolrows] = useState([] as any);
  const hideSearchComponent = props.hideSearchComponent;
  const [addToListItems, setAddToListItems] = useState<any[]>([]);

  return (
    hideSearchComponent === false && (
      <div>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Search
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            searchPlaceholderText={searchPlaceholderText}
            setSearchPlaceholderText={setSearchPlaceholderText}
            searchHelperText={searchHelperText}
            setSearchHelperText={setSearchHelperText}
            setTags={setTags}
            tags={tags}
            selected={selected}
            setSelected={setSelected}
            favProduct={favProduct}
            setFavProduct={setFavProduct}
            mycoolrows={mycoolrows}
            setMycoolrows={setMycoolrows}
          />
          <Filter setTags={setTags} tags={tags} />
          <EnhancedTable
            selected={selected}
            setSelected={setSelected}
            favProduct={favProduct}
            setFavProduct={setFavProduct}
            mycoolrows={mycoolrows}
            setMycoolrows={setMycoolrows}
            setTags={setTags}
            tags={tags}
            addToListItems={addToListItems}
            setAddToListItems={setAddToListItems}
          />
        </ThemeProvider>
      </div>
    )
  );
}
