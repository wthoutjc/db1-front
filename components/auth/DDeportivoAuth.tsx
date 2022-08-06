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
import PictureAsPdfRoundedIcon from "@mui/icons-material/PictureAsPdfRounded";

// SWR
import useSWR from "swr";

// Redux
import { useAppDispatch } from "../../hooks";
import { setLogged } from "../../reducers";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface LoginProps {
  cod: string;
}

const DDeportivoAuth = () => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProps>();

  // SWR - Client side
  // const { data, error } = useSWR("/api/users", fetcher);

  const onSubmit = (data: LoginProps) => {
    dispatch(
      setLogged({
        logged: true,
      })
    );
  };

  return (
    <Box display={"flex"} sx={{ width: "100%", height: "40%" }}>
      <Box
        sx={{
          p: 2,
          backgroundColor: "#112233",
          borderEndStartRadius: 3,
          borderStartStartRadius: 3,
          width: "100%",
          height: "100%",
        }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <Box
            sx={{
              boxSizing: "border-box",
              padding: "1em",
              width: "100%",
              height: "100%",
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
                    {/* <EmailIcon /> */}
                  </InputAdornment>
                ),
              }}
            />

            <Button type="submit" variant="contained" fullWidth>
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
          height: "100%",
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

// {showError && (
//     <Alert severity="error" sx={{ mt: 1, mb: 1 }}>
//       <AlertTitle>Error</AlertTitle>
//       E-mail or password is not valid
//     </Alert>
//   )}
