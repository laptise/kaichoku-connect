import { Dialog, DialogActions, DialogContent, DialogTitle, ModalProps } from "@mui/material";
import React from "react";

type AlertDialogProps = {
  openState: State<boolean>;
  isLocked?: boolean;
  title?: string;
  buttons?: React.ReactNode[];
  children?: React.ReactNode;
};

export const AlertDialog: React.FC<AlertDialogProps> = ({ openState, title, buttons, children }) => {
  const [open, setOpen] = openState;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose: ModalProps["onClose"] = (_, reason) => {
    if (reason === "backdropClick") {
    } else {
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      {title && <DialogTitle id="alert-dialog-title">{title}</DialogTitle>}
      <DialogContent>{children}</DialogContent>
      {buttons && buttons.length > 0 && <DialogActions>{buttons.map((button) => button)}</DialogActions>}
    </Dialog>
  );
};
