import {
  Avatar,
  Box,
  Button,
  capitalize,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  IconButtonProps,
  InputAdornment,
  styled,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { TableMateriales } from "./TableMateriales";

// Icons
import SchoolIcon from "@mui/icons-material/School";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { red } from "@mui/material/colors";

// Redux
import { useAppSelector, useAppDispatch } from "../../../hooks";
import { setLoading, newNotification } from "../../../reducers";

// Components
import { AuxiliarFetchingData } from "./";

// uuid
import { v4 as uuid } from "uuid";
import { IMaterial, INotification } from "../../../interfaces";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return (
    <>
      <Tooltip title={"Ver materiales"}>
        <IconButton {...other} />
      </Tooltip>
    </>
  );
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface PasanteProps {
  code: string;
}

interface PasanteRequest {
  id_est: string;
  name: string;
  horai: string;
  horaf: string;
  idprog?: string;
  sede?: string;
  espacio?: string;
  id_deporte?: string;
  deporte?: string;
  num_est?: number;
}

const AuxiliarPasante = () => {
  const dispatch = useAppDispatch();

  const { loading } = useAppSelector((state) => state.user);

  const [pasante, setPasante] = useState<null | PasanteRequest>(null);
  const [materiales, setMateriales] = useState<IMaterial[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasanteProps>();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const onSubmit = async (data: PasanteProps) => {
    dispatch(setLoading(true));
    setExpanded(false);
    setPasante(null);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/pasante/${data.code}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (res) dispatch(setLoading(false));

    const jsonData = (await res.json()) as { status: string; message: PasanteRequest | string, materiales: IMaterial[] };

    if (jsonData.status === "success") {
      console.log(jsonData);
      setPasante(jsonData.message as PasanteRequest);
      setMateriales(jsonData.materiales)
    } else {
      setPasante(null);
      const payload: INotification = {
        id: uuid(),
        title: "Failed:",
        message: jsonData.message as string,
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
                <Typography variant="h6">Consultar estudiante</Typography>
              </Box>
              <TextField
                fullWidth
                sx={{ marginBottom: "1em" }}
                type="number"
                placeholder="Ej: 123456"
                label="Código estudiante"
                autoComplete="codigo-de-estudiante"
                error={!!errors.code}
                helperText={
                  !!errors.code
                    ? errors.code.message
                    : "Escribe el código del estudiante"
                }
                {...register("code", {
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
            {pasante ? (
              <Box sx={{ width: "60%", p: 2, backgroundColor: "#8395a7" }}>
                <Card sx={{ width: "100%" }}>
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {capitalize(pasante.name[0])}
                      </Avatar>
                    }
                    title={`Estudiante: ${pasante.name}`}
                    subheader={`Hora inicio: ${pasante.horai} - Hora fin: ${pasante.horaf}`}
                  />
                  <CardContent
                    sx={{ display: "flex", flexDirection: "column" }}
                  >
                    {pasante.idprog ? (
                      <>
                        <Box display={"flex"} sx={{ mb: 2 }}>
                          <Typography variant="body2" color="text.secondary">
                            Sede:
                          </Typography>
                          <p style={{ color: "white", marginLeft: 10 }}>
                            {pasante.sede}
                          </p>
                        </Box>
                        <Box display={"flex"} sx={{ mb: 2 }}>
                          <Typography variant="body2" color="text.secondary">
                            Práctica libre:{" "}
                          </Typography>
                          <p style={{ color: "white", marginLeft: 10 }}>
                            {pasante.idprog}
                          </p>
                        </Box>
                        <Box display={"flex"} sx={{ mb: 2 }}>
                          <Typography variant="body2" color="text.secondary">
                            Espacio:{" "}
                          </Typography>
                          <p style={{ color: "white", marginLeft: 10 }}>
                            {pasante.espacio}
                          </p>
                        </Box>
                        <Box display={"flex"} sx={{ mb: 2 }}>
                          <Typography variant="body2" color="text.secondary">
                            Deporte:{" "}
                          </Typography>
                          <p style={{ color: "white", marginLeft: 10 }}>
                            {pasante.deporte}
                          </p>
                        </Box>
                        <Box display={"flex"} sx={{ mb: 2 }}>
                          <Typography variant="body2" color="text.secondary">
                            Número de inscritos:{" "}
                          </Typography>
                          <p style={{ color: "white", marginLeft: 10 }}>
                            {pasante.num_est}
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
                  <CardActions disableSpacing>
                    {pasante.idprog && materiales && (
                      <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                      >
                        <ExpandMoreIcon />
                      </ExpandMore>
                    )}
                  </CardActions>
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
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ backgroundColor: "#8395a7" }}>
          <TableMateriales rows={materiales} />
        </CardContent>
      </Collapse>
    </>
  );
};

export { AuxiliarPasante };
