import { createTheme, PaletteMode } from "@mui/material";
import React, { useMemo } from "react";
import { getDesignTokens } from "./Theme";

export const useColorTheme = () => {
  const [mode, setMode] = React.useState<PaletteMode>("light");

  const toggleColorMode = () =>
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));

  const modifiedTheme = useMemo(
    () => createTheme(getDesignTokens(mode)),
    [mode]
  );

  return {
    theme: modifiedTheme,
    mode,
    toggleColorMode,
  };
};
