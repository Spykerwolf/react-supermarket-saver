import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function BasicAlerts({ children }: Props) {
  return (
    <Stack sx={{ width: "100%" }} spacing={1}>
      <Alert severity="info">{children}</Alert>
    </Stack>
  );
}
