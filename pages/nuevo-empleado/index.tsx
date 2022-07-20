// Components
import {
  Box,
  Typography,
  Divider,
  FormControl,
  InputAdornment,
  InputLabel,
  FilledInput,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import { Layout } from "../../components/layout";

// Icons
import PersonIcon from "@mui/icons-material/Person";
import ApartmentIcon from "@mui/icons-material/Apartment";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SportsIcon from "@mui/icons-material/Sports";
import DiamondIcon from "@mui/icons-material/Diamond";
import BadgeIcon from "@mui/icons-material/Badge";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

const NuevoEmpleadoPage = () => {
  return (
    <Layout>
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            backgroundColor: "#c8d6e5",
            color: "#012",
            borderRadius: "5px",
            p: 2,
            mb: 3,
          }}
        >
          <Box
            sx={{
              backgroundColor: "#222f3e",
              color: "#c8d6e5",
              borderRadius: "5px",
              p: 2,
            }}
          >
            <Typography variant="h5">Registrar nuevo empleado</Typography>
            <Divider sx={{ mt: 1, mb: 3 }} />
            <Box width={"90%"}>
              <FormControl fullWidth variant="filled">
                <TextField
                  id="standard-helperText"
                  sx={{ mb: 2 }}
                  label="Cédula"
                  helperText="Digite la cédula del empleado"
                  variant="filled"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  id="filled-select-currency"
                  sx={{ mb: 2 }}
                  select
                  label="Sede"
                  //   value={currency}
                  //   onChange={handleChange}
                  helperText="Seleccione la sede del empleado"
                  variant="filled"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <ApartmentIcon />
                      </InputAdornment>
                    ),
                  }}
                >
                  <MenuItem value={"1"}>1</MenuItem>
                </TextField>
                <TextField
                  id="filled-select-currency"
                  sx={{ mb: 2 }}
                  select
                  label="Espacio"
                  //   value={currency}
                  //   onChange={handleChange}
                  helperText="Seleccione el espacio del empleado"
                  variant="filled"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <HomeWorkIcon />
                      </InputAdornment>
                    ),
                  }}
                >
                  <MenuItem value={"1"}>1</MenuItem>
                </TextField>
                <TextField
                  id="filled-select-currency"
                  sx={{ mb: 2 }}
                  select
                  label="Equipo"
                  //   value={currency}
                  //   onChange={handleChange}
                  helperText="Seleccione el equipo del empleado"
                  variant="filled"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PeopleAltIcon />
                      </InputAdornment>
                    ),
                  }}
                >
                  <MenuItem value={"1"}>1</MenuItem>
                </TextField>
                <TextField
                  id="filled-select-currency"
                  sx={{ mb: 2 }}
                  select
                  label="Entrenador"
                  //   value={currency}
                  //   onChange={handleChange}
                  helperText="Seleccione el entrenador del empleado"
                  variant="filled"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SportsIcon />
                      </InputAdornment>
                    ),
                  }}
                >
                  <MenuItem value={"1"}>1</MenuItem>
                </TextField>
                <TextField
                  id="filled-select-currency"
                  sx={{ mb: 2 }}
                  select
                  label="Unidad Deportiva"
                  //   value={currency}
                  //   onChange={handleChange}
                  helperText="Seleccione la unidad deportiva del empleado"
                  variant="filled"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <DiamondIcon />
                      </InputAdornment>
                    ),
                  }}
                >
                  <MenuItem value={"1"}>1</MenuItem>
                </TextField>
                <TextField
                  id="standard-helperText"
                  sx={{ mb: 2 }}
                  label="Nombre"
                  helperText="Digite el nombre del empleado"
                  variant="filled"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BadgeIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  id="standard-helperText"
                  sx={{ mb: 2 }}
                  label="Apellido"
                  helperText="Digite el apellido del empleado"
                  variant="filled"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BadgeIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
              <Button
                size="small"
                variant="contained"
                color="success"
                endIcon={<AppRegistrationIcon />}
              >
                Registrar
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default NuevoEmpleadoPage;
