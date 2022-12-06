import React, { useRef } from "react";
import {
  Alert,
  IconButton,
  Typography,
  AlertTitle,
  Divider,
} from "@mui/material";

// Icons
import CloseIcon from "@mui/icons-material/Close";

// Interfaces
import { INotification } from "../../../interfaces";

// Redux
import { useAppDispatch } from "../../../hooks";
import { removeNotification } from "../../../reducers";

const Notification = ({ id, message, severity, title }: INotification) => {
  const alertDom = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(removeNotification(id));
  };

  return (
    <Alert
      ref={alertDom}
      className="notification__alert animate__animated animate__bounceInRight"
      variant="filled"
      severity={severity}
      action={
        <IconButton aria-label="close" size="small" onClick={handleClose}>
          <CloseIcon fontSize="inherit" />
        </IconButton>
      }
    >
      <AlertTitle>{title}</AlertTitle>
      <Divider />
      <Typography
        sx={{
          width: '100%',
          fontSize: '100%',
          textAlign: 'justify',
          textOverflow: "ellipsis",
          overflow: 'hidden',
          textTransform: 'inherit',
        }}
        variant="body1"
      >
        {message}
      </Typography>
    </Alert>
  );
};

export { Notification };
