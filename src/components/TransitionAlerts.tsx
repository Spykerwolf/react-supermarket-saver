import * as React from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  buttonName: string;
  alertMessage: string;
  buttonType?: "contained" | "outlined" | "text";
}
export default function TransitionAlerts({
  buttonName,
  alertMessage,
  buttonType,
}: Props) {
  const [open, setOpen] = React.useState(false);

  return (
    <Box sx={{ width: "100%" }}>
      <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {alertMessage}
        </Alert>
      </Collapse>
      <Button
        disabled={open}
        variant={buttonType}
        onClick={() => {
          setOpen(true);
        }}
      >
        {buttonName}
      </Button>
    </Box>
  );
}
