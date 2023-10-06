import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { ReactNode } from "react";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";

interface Props {
  children: ReactNode;
  onClose?: () => void;
}

export function BasicAlert({ children }: Props) {
  return (
    <Stack sx={{ width: "100%" }} spacing={1}>
      <Alert severity="info">{children}</Alert>
    </Stack>
  );
}

export default function AdvancedAlert({ children, onClose }: Props) {
  return (
    <Box sx={{ width: "100%" }}>
      <Alert
        action={
          <IconButton aria-label="close" color="inherit" size="small">
            <CancelPresentationIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ mb: 2 }}
        onClick={onClose}
      >
        {children}
      </Alert>
    </Box>
  );
}
