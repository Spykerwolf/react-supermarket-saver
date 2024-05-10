import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export function CapitalizeFirstLetter(name: string) {
  const word = name;
  const firstLetter = word?.charAt(0);
  const firstLetterCap = firstLetter?.toUpperCase();
  const remainingLetters = word?.slice(1);
  const capitalizedWord = firstLetterCap + remainingLetters;
  return capitalizedWord;
}
