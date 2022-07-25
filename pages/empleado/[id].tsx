import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

// Components
import {
  Box,
  Typography,
  Divider,
  FormControl,
  InputAdornment,
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

// Redux
import { useAppDispatch } from "../../hooks";
import { newNotification } from "../../reducers";

// uuid
import { v4 as uuid } from "uuid";
import { DBDataUsers, INotification } from "../../interfaces";
import { GetServerSideProps } from "next";

interface RegisterInfo {
  idPersonal: string;
  idSede: string;
  idEspacio: string;
  idEquipo: string;
  supIdEquipo: string;
  idUDeportiva: string;
  nombre: string;
  apellido: string;
}

interface SSRPRops {
  empleado: DBDataUsers;
}

const EmpleadoPage = ({ empleado }: SSRPRops) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    APELLIDO,
    IDEQUIPO,
    IDESPACIO,
    IDPERSONAL,
    IDSEDE,
    IDUDEPORTIVA,
    NOMBRE,
    SUPIDEQUIPO,
  } = empleado;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterInfo>();

  const handleSignUp = async (registerInfo: RegisterInfo) => {
    try {
      const res = await fetch(`http://127.0.0.1:5000`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerInfo),
      });
      const { message } = await res.json();
      reset();
      const payload: INotification = {
        id: uuid(),
        title: "Info:",
        message,
        severity: "info",
      };
      dispatch(newNotification(payload));
      router.push("/");
    } catch (error) {
      console.error(error);
      reset();
      const payload: INotification = {
        id: uuid(),
        title: "Info:",
        message: "Falló el procesamiento de la solicitud",
        severity: "error",
      };
      dispatch(newNotification(payload));
    }
  };

  return (
    <Layout>
      <Box sx={{ p: 2 }}>
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
          <Box width={"100%"}>
            <form
              onSubmit={handleSubmit(handleSignUp)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <FormControl variant="filled">
                <Box
                  width={"100%"}
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-around",
                  }}
                >
                  <TextField
                    id="standard-helperText"
                    sx={{ mb: 2, width: "45%" }}
                    label="Cédula"
                    variant="filled"
                    error={!!errors.idPersonal}
                    helperText={
                      !!errors.idPersonal
                        ? errors.idPersonal.message
                        : "Digite la cédula del empleado"
                    }
                    defaultValue={IDPERSONAL}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon
                            sx={{
                              color: !!errors.idPersonal ? "red" : "white",
                            }}
                          />
                        </InputAdornment>
                      ),
                    }}
                    {...register("idPersonal", {
                      required: "Cédula es obligatoria",
                    })}
                  />
                  <TextField
                    id="filled-select-currency"
                    sx={{ mb: 2, width: "45%" }}
                    select
                    defaultValue={IDSEDE}
                    label="Sede"
                    error={!!errors.idSede}
                    helperText={
                      !!errors.idPersonal
                        ? errors.idPersonal.message
                        : "Seleccione la sede del empleado"
                    }
                    variant="filled"
                    {...register("idSede", {
                      required: "La sede es obligatoria",
                    })}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <ApartmentIcon
                            sx={{
                              color: !!errors.idPersonal ? "red" : "white",
                            }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  >
                    <MenuItem value={"1"}>1</MenuItem>
                  </TextField>
                  <TextField
                    id="filled-select-currency"
                    sx={{ mb: 2, width: "45%" }}
                    select
                    defaultValue={IDESPACIO}
                    label="Espacio"
                    error={!!errors.idEspacio}
                    helperText={
                      !!errors.idEspacio
                        ? errors.idEspacio.message
                        : "Seleccione el espacio del empleado"
                    }
                    variant="filled"
                    {...register("idEspacio", {
                      required: "El campo espacio es obligatorio",
                    })}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <HomeWorkIcon
                            sx={{
                              color: !!errors.idPersonal ? "red" : "white",
                            }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  >
                    <MenuItem value={"1"}>1</MenuItem>
                  </TextField>
                  <TextField
                    id="filled-select-currency"
                    sx={{ mb: 2, width: "45%" }}
                    select
                    label="Equipo"
                    defaultValue={IDEQUIPO}
                    error={!!errors.idEquipo}
                    helperText={
                      !!errors.idEquipo
                        ? errors.idEquipo.message
                        : "Seleccione el equipo del empleado"
                    }
                    variant="filled"
                    {...register("idEquipo", {
                      required: "El campo equipo es obligatorio",
                    })}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PeopleAltIcon
                            sx={{
                              color: !!errors.idPersonal ? "red" : "white",
                            }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  >
                    <MenuItem value={"1"}>1</MenuItem>
                  </TextField>
                  <TextField
                    id="filled-select-currency"
                    sx={{ mb: 2, width: "45%" }}
                    select
                    defaultValue={SUPIDEQUIPO}
                    label="Entrenador"
                    error={!!errors.supIdEquipo}
                    helperText={
                      !!errors.supIdEquipo
                        ? errors.supIdEquipo.message
                        : "Seleccione el entrenador del empleado"
                    }
                    variant="filled"
                    {...register("supIdEquipo", {
                      required: "El campo entrenador es obligatorio",
                    })}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SportsIcon
                            sx={{
                              color: !!errors.idPersonal ? "red" : "white",
                            }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  >
                    <MenuItem value={"1"}>1</MenuItem>
                  </TextField>
                  <TextField
                    id="filled-select-currency"
                    sx={{ mb: 2, width: "45%" }}
                    select
                    defaultValue={IDUDEPORTIVA}
                    label="Unidad Deportiva"
                    error={!!errors.idUDeportiva}
                    helperText={
                      !!errors.idUDeportiva
                        ? errors.idUDeportiva.message
                        : "Seleccione la unidad deportiva del empleado"
                    }
                    variant="filled"
                    {...register("idUDeportiva", {
                      required: "El campo unidad deportiva es obligatorio",
                    })}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <DiamondIcon
                            sx={{
                              color: !!errors.idPersonal ? "red" : "white",
                            }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  >
                    <MenuItem value={"1"}>1</MenuItem>
                  </TextField>
                  <TextField
                    id="standard-helperText"
                    sx={{ mb: 2, width: "45%" }}
                    label="Nombre"
                    defaultValue={NOMBRE}
                    error={!!errors.nombre}
                    autoComplete="current-name"
                    helperText={
                      !!errors.nombre
                        ? errors.nombre.message
                        : "Digite el nombre del empleado"
                    }
                    {...register("nombre", {
                      required: "El nombre es un campo obligatorio",
                      minLength: {
                        value: 2,
                        message: "El nombre debe tener al menos 2 caracteres",
                      },
                    })}
                    variant="filled"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <BadgeIcon
                            sx={{
                              color: !!errors.idPersonal ? "red" : "white",
                            }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    id="standard-helperText"
                    sx={{ mb: 2, width: "45%" }}
                    label="Apellido"
                    defaultValue={APELLIDO}
                    variant="filled"
                    error={!!errors.nombre}
                    autoComplete="current-name"
                    helperText={
                      !!errors.apellido
                        ? errors.apellido.message
                        : "Digite el apellido del empleado"
                    }
                    {...register("apellido", {
                      required: "El apellido es un campo obligatorio",
                      minLength: {
                        value: 2,
                        message: "El apellido debe tener al menos 2 caracteres",
                      },
                    })}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <BadgeIcon
                            sx={{
                              color: !!errors.idPersonal ? "red" : "white",
                            }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </FormControl>
              <Button
                sx={{ width: "30%" }}
                size="small"
                type="submit"
                variant="contained"
                color="success"
                endIcon={<AppRegistrationIcon />}
                onClick={() => {}}
              >
                Actualizar
              </Button>
            </form>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };

  const res = await fetch(`http://127.0.0.1:5000/${id}`);
  const data = await res.json();

  console.log(typeof data);
  console.log(data);

  const { empleado } = data;

  return {
    props: {
      empleado: JSON.parse(empleado),
    },
  };
};

export default EmpleadoPage;
