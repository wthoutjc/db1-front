import {
  Box,
  Button,
  Chip,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";

// Icons
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PictureAsPdfRoundedIcon from "@mui/icons-material/PictureAsPdfRounded";
import PasswordIcon from "@mui/icons-material/Password";

// Redux
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  setLogged,
  newNotification,
  setLoading,
  setData,
} from "../../reducers";

// uuid
import { v4 as uuid } from "uuid";

// Interfaces
import { INotification } from "../../interfaces";

interface LoginProps {
  cod: string;
  psswd: string;
}

const DDeportivoAuth = () => {
  const dispatch = useAppDispatch();

  const { loading } = useAppSelector((state) => state.user);
  const { role } = useAppSelector((state) => state.info);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProps>();

  const onSubmit = async (data: LoginProps) => {
    dispatch(setLoading(true));
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data, role }),
    });

    const jsonData = (await res.json()) as {
      status: string;
      ddeportivo: string;
      message: string;
    };

    if (res) dispatch(setLoading(false));

    if (jsonData.status === "success") {
      dispatch(setData(JSON.parse(jsonData.ddeportivo)));
      dispatch(
        setLogged({
          logged: true,
        })
      );
    } else {
      const payload: INotification = {
        id: uuid(),
        title: "Failed:",
        message: jsonData.message,
        severity: "error",
      };
      dispatch(newNotification(payload));
    }
  };

  return (
    <Box
      display={"flex"}
      sx={{ width: "100%" }}
      className={"animate__animated animate__fadeIn"}
    >
      <Box
        sx={{
          p: 2,
          backgroundColor: "#112233",
          borderEndStartRadius: 3,
          borderStartStartRadius: 3,
          width: "100%",
        }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            width: "100%",
          }}
        >
          <Box
            sx={{
              boxSizing: "border-box",
              padding: "1em",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6">
                Iniciar sesión - Director Deportivo
              </Typography>
            </Box>
            <TextField
              fullWidth
              sx={{ marginBottom: "1em" }}
              type="text"
              placeholder="Ej: 123456"
              label="Código"
              autoComplete="codigo-de-usuario"
              error={!!errors.cod}
              helperText={
                !!errors.cod
                  ? errors.cod.message
                  : "Escribe tu código de usuario"
              }
              {...register("cod", {
                required: "Código es un campo requerido",
              })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PeopleAltIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              sx={{ marginBottom: "1em" }}
              type="password"
              placeholder="Ej: *****"
              label="Contraseña"
              autoComplete="contraseña-de-usuario"
              error={!!errors.psswd}
              helperText={
                !!errors.psswd
                  ? errors.psswd.message
                  : "Escribe tu contraseña de usuario"
              }
              {...register("psswd", {
                required: "Contraseña es un campo requerido",
              })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PasswordIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{ cursor: `${loading ? "wait" : "pointer"}` }}
            >
              CONECTARSE
            </Button>
          </Box>
        </form>
      </Box>
      <Box
        sx={{
          p: 4,
          backgroundColor: "#8395a7",
          borderEndEndRadius: 3,
          borderStartEndRadius: 3,
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h5" color="#112223" fontWeight={600}>
          ¡Bienvenido!
        </Typography>
        <Typography variant="h6" color="#112233">
          Ingresa tu código de empleado para iniciar sesión
        </Typography>
        <Typography variant="body2" fontSize={17} color="#353b48">
          Tendrás acceso a las siguientes funcionalidades:
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", mt: 2 }}>
          <Chip
            icon={<PictureAsPdfRoundedIcon />}
            label="Generar reportes"
            sx={{ mb: 1, backgroundColor: "#112233", width: "fit-content" }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export { DDeportivoAuth };
