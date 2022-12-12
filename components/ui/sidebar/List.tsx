import {
  Box,
  Divider,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";

// Redux
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { toggleSidebar, setRole, setLogged } from "../../../reducers";

const List = () => {
  const dispatch = useAppDispatch();
  const { role } = useAppSelector((state) => state.info);

  const handleRoleChange = (e: SelectChangeEvent<string>) => {
    dispatch(
      setLogged({
        logged: false,
      })
    );

    dispatch(
      setRole({
        role: e.target.value as string,
        data: null,
      })
    );
  };

  return (
    <Box
      sx={{ width: 300 }}
      role="presentation"
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
