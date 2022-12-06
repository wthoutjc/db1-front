import {
  Box,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";

// Redux
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { toggleSidebar, setRole, setLogged } from "../../../reducers";
import { useState } from "react";

const List = () => {
  const dispatch = useAppDispatch();
  const { role } = useAppSelector((state) => state.info);

  const [dateType, setDateType] = useState<string>("auto");

  const handleDateTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDateType((event.target as HTMLInputElement).value);
  };

  const handleRoleChange = (e: SelectChangeEvent<string>) => {
    dispatch(
      setLogged({
        logged: false,
      })
    );

    dispatch(
      setRole({
        role: e.target.value as string,
      })
    );
  };

  const handleClick = () => {
    // dispatch(toggleSidebar());
    console.log("handleClick");
  };

  return (
    <Box
      sx={{ width: 300 }}
      role="presentation"
      onClick={handleClick}
      onKeyDown={() => dispatch(toggleSidebar())}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Selecciona un cargo
        </Typography>
        <FormControl variant="filled" sx={{ minWidth: 270 }}>
          <InputLabel id="demo-simple-select-filled-label">Cargo</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={role}
            onChange={handleRoleChange}
          >
            <MenuItem value={"auxiliar"}>Auxiliar</MenuItem>
            <MenuItem value={"ddeportivo"}>Director deportivo</MenuItem>
          </Select>
          <FormHelperText>Este campo es obligatorio</FormHelperText>
        </FormControl>
      </Box>
      <Divider />
    </Box>
  );
};

export { List };
