import { Box, TextField, Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";

const DateForm = () => {
  const [date, setDate] = useState<String>(
    new Date(Date.now()).toISOString().slice(0, 16)
  );

  console.log(date);

  const handleDateChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDate((event.target as HTMLInputElement).value);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        Ajuste de fecha
      </Typography>
      <TextField
        id="filled-basic"
        variant="filled"
        label={"Fecha"}
        type={"datetime-local"}
        value={date}
        onChange={(e) => handleDateChange(e)}
        InputLabelProps={{ shrink: true }}
      />
    </Box>
  );
};

export { DateForm };

// "es-Es", {
//     year: "numeric",
//     month: "2-digit",
//     day: "2-digit",
//     hour: "2-digit",
//     minute: "2-digit",
//     second: "2-digit",
//   }
