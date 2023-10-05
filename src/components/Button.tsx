import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  color?: "text" | "contained" | "outlined";
  onClick: () => void;
}
export default function BasicButton({ children, color, onClick }: Props) {
  return (
    <Stack spacing={2} direction="row">
      <Button variant={color} onClick={onClick}>
        {children}
      </Button>
    </Stack>
  );
}
