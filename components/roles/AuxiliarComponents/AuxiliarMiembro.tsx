import {
  Avatar,
  Box,
  Button,
  capitalize,
  Card,
  CardContent,
  CardHeader,
  IconButtonProps,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";

// Icons
import SchoolIcon from "@mui/icons-material/School";
import { red } from "@mui/material/colors";

// Redux
import { useAppSelector, useAppDispatch } from "../../../hooks";
import { setLoading, newNotification } from "../../../reducers";

// Components
import { AuxiliarFetchingData } from "./";

// uuid
import { v4 as uuid } from "uuid";
import { INotification } from "../../../interfaces";
import moment from "moment";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

interface PasanteProps {
  cod: string;
  codEquipo: string;
}

interface MiembroRequest {
  id: string;
  deporte: string;
  entrenador: string;
  id_equipo: string;
  name: string;
  item: string;
  CONMIEMEQUIPO: string;
  CONSECPROGRA: string;
  CONSEEQUIPO: string;
  ITEMMIEMBRO: string;
}

const AuxiliarMiembro = () => {
  const dispatch = useAppDispatch();

  const { loading } = useAppSelector((state) => state.user);

  const [miembro, setMiembro] = useState<null | MiembroRequest>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasanteProps>();

  const onSubmit = async (data: PasanteProps) => {
    dispatch(setLoading(true));
    setMiembro(null);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/miembro`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res) dispatch(setLoading(false));

    const jsonData = (await res.json()) as {
      status: string;
      message: MiembroRequest;
    };

    if (jsonData.status === "success") {
      console.log(jsonData);
      setMiembro(jsonData.message as MiembroRequest);
      if (jsonData.message.CONMIEMEQUIPO) {
        const payload: INotification = {
          id: uuid(),
          title: "Registro exitoso:",
          message: `Registrado: ${jsonData.message.CONMIEMEQUIPO}  ${jsonData.message.CONSECPROGRA}  ${jsonData.message.CONSEEQUIPO}  ${jsonData.message.ITEMMIEMBRO}`,
          severity: "success",
        };
        dispatch(newNotification(payload));
      }
    } else {
      setMiembro(null);
      const payload: INotification = {
        id: uuid(),
        title: "Failed:",
        message: String(jsonData.message),
        severity: "error",
      };
      dispatch(newNotification(payload));
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "columm",
          justifyContent: "space-evenly",
        }}
      >
        <Box sx={{ width: "40%", p: 2, maxHeight: "350px" }}>
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
                  Consultar miembro de equipo
                </Typography>
              </Box>
              <TextField
                fullWidth
                sx={{ marginBottom: "1em" }}
                type="text"
                placeholder="Ej: 123456"
                label="Código estudiante"
                autoComplete="codigo-de-estudiante"
                error={!!errors.cod}
                helperText={
                  !!errors.cod
                    ? errors.cod.message
                    : "Escribe el código del estudiante"
                }
                {...register("cod", {
                  required: "Código es un campo requerido",
                })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SchoolIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                sx={{ marginBottom: "1em" }}
                type="text"
                placeholder="Ej: 123"
                label="Código equipo"
                autoComplete="codigo-de-equipo"
                error={!!errors.codEquipo}
                helperText={
                  !!errors.codEquipo
                    ? errors.codEquipo.message
                    : "Escribe el código del equipo"
                }
                {...register("codEquipo", {
                  required: "Código equipo es un campo requerido",
                })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SchoolIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
              >
                Buscar
              </Button>
            </Box>
          </form>
        </Box>
        {loading ? (
          <Box sx={{ width: "60%", p: 2, backgroundColor: "#8395a7" }}>
            <AuxiliarFetchingData />
          </Box>
        ) : (
          <>
            {miembro ? (
              <Box sx={{ width: "60%", p: 2, backgroundColor: "#8395a7" }}>
                <Card sx={{ width: "100%" }}>
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {capitalize(miembro.name[0])}
                      </Avatar>
                    }
                    title={`Estudiante: ${miembro.name}`}
                    subheader={`${moment(Date.now()).format("DD/MM/YYYY")} • ${
                      miembro.deporte
                    } • ${miembro.entrenador}`}
                  />
                  <CardContent
                    sx={{ display: "flex", flexDirection: "column" }}
                  >
                    {miembro.id_equipo ? (
                      <>
                        <Box display={"flex"} sx={{ mb: 2 }}>
                          <Typography variant="body2" color="text.secondary">
                            Práctica libre:{" "}
                          </Typography>
                          <p style={{ color: "white", marginLeft: 10 }}>
                            {miembro.id}
                          </p>
                        </Box>
                        <Box display={"flex"} sx={{ mb: 2 }}>
                          <Typography variant="body2" color="text.secondary">
                            Deporte:{" "}
                          </Typography>
                          <p style={{ color: "white", marginLeft: 10 }}>
                            {miembro.deporte}
                          </p>
                        </Box>
                        <Box display={"flex"} sx={{ mb: 2 }}>
                          <Typography variant="body2" color="text.secondary">
                            Entrenador:{" "}
                          </Typography>
                          <p style={{ color: "white", marginLeft: 10 }}>
                            {miembro.entrenador}
                          </p>
                        </Box>
                        <Box display={"flex"} sx={{ mb: 2 }}>
                          <Typography variant="body2" color="text.secondary">
                            Equipo:{" "}
                          </Typography>
                          <p style={{ color: "white", marginLeft: 10 }}>
                            {miembro.id_equipo}
                          </p>
                        </Box>
                        <Box display={"flex"} sx={{ mb: 2 }}>
                          <Typography variant="body2" color="text.secondary">
                            Nombre:{" "}
                          </Typography>
                          <p style={{ color: "white", marginLeft: 10 }}>
                            {miembro.name}
                          </p>
                        </Box>
                      </>
                    ) : (
                      <>
                        <Typography variant="h6" color="text.secondary">
                          No tiene práctica libre
                        </Typography>
                      </>
                    )}
                  </CardContent>
                </Card>
              </Box>
            ) : (
              <Box sx={{ width: "60%", p: 2, backgroundColor: "#8395a7" }}>
                <Typography variant="h6" color="#112233">
                  No se encontraron resultados para la búsqueda
                </Typography>
              </Box>
            )}
          </>
        )}
      </Box>
    </>
  );
};

export { AuxiliarMiembro };
