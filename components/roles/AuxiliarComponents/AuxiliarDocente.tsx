import {
  Avatar,
  Box,
  Button,
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
import { useForm } from "react-hook-form";
import { red } from "@mui/material/colors";

// Redux
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { setLoading, newNotification } from "../../../reducers";

// Icons
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

// Components
import { TableMateriales, AuxiliarFetchingData } from "./";

// uuid
import { v4 as uuid } from "uuid";
import { INotification } from "../../../interfaces";

// Date
import moment from "moment";

interface DocenteProps {
  name: string;
}

interface DocenteRequest {
  id: string;
  name: string;
  sede: string;
  idprog?: number;
  espacio?: string;
  deporte?: string;
  num_est?: number;
}

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

const AuxiliarDocente = () => {
  const dispatch = useAppDispatch();

  const { loading } = useAppSelector((state) => state.user);

  const [docente, setDocente] = useState<null | DocenteRequest>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DocenteProps>();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const onSubmit = async (data: DocenteProps) => {
    dispatch(setLoading(true));
    const res = await fetch(`http://127.0.0.1:5000/docente/${data.name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res) dispatch(setLoading(false));

    const jsonData = (await res.json()) as { status: string; message: string };

    if (jsonData.status === "success") {
      console.log(JSON.parse(jsonData.message));
      setDocente(JSON.parse(jsonData.message));
    } else {
      setDocente(null);
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
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "columm",
          justifyContent: "space-evenly",
        }}
      >
        <Box sx={{ width: "40%", pt: 2, maxHeight: "350px" }}>
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
                <Typography variant="h6">Consultar docente</Typography>
              </Box>
              <TextField
                fullWidth
                sx={{ marginBottom: "1em" }}
                type="text"
                placeholder="Ej: Pepito Peréz"
                label="Nombre docente"
                autoComplete="nombre-db-modulo"
                error={!!errors.name}
                helperText={
                  !!errors.name
                    ? errors.name.message
                    : "Escribe el nombre del docente"
                }
                {...register("name", {
                  required: "Nombre es un campo requerido",
                })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SupervisedUserCircleIcon />
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
        {docente ? (
          <Box sx={{ width: "60%", p: 2, backgroundColor: "#8395a7" }}>
            {loading ? (
              <AuxiliarFetchingData />
            ) : (
              <>
                <Card sx={{ width: "100%" }}>
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                      </Avatar>
                    }
                    title={`Docente: ${docente.name}`}
                    subheader={moment(Date.now()).format("DD/MM/YYYY")}
                  />
                  <CardContent
                    sx={{ display: "flex", flexDirection: "column" }}
                  >
                    {docente.idprog ? (
                      <>
                        <Box display={"flex"} sx={{ mb: 2 }}>
                          <Typography variant="body2" color="text.secondary">
                            Curso:{" "}
                          </Typography>
                          <p style={{ color: "white", marginLeft: 10 }}>
                            {docente.idprog}
                          </p>
                        </Box>
                        <Box display={"flex"} sx={{ mb: 2 }}>
                          <Typography variant="body2" color="text.secondary">
                            Espacio:{" "}
                          </Typography>
                          <p style={{ color: "white", marginLeft: 10 }}>
                            {docente.espacio}
                          </p>
                        </Box>
                        <Box display={"flex"} sx={{ mb: 2 }}>
                          <Typography variant="body2" color="text.secondary">
                            Deporte:{" "}
                          </Typography>
                          <p style={{ color: "white", marginLeft: 10 }}>
                            {docente.deporte}
                          </p>
                        </Box>
                        <Box display={"flex"} sx={{ mb: 2 }}>
                          <Typography variant="body2" color="text.secondary">
                            Número de estudiantes:{" "}
                          </Typography>
                          <p style={{ color: "white", marginLeft: 10 }}>
                            {docente.num_est}
                          </p>
                        </Box>
                      </>
                    ) : (
                      <>
                        <Typography variant="h6" color="text.secondary">
                          No tiene espacios asignados
                        </Typography>
                      </>
                    )}
                  </CardContent>
                  <CardActions disableSpacing>
                    <ExpandMore
                      expand={expanded}
                      onClick={handleExpandClick}
                      aria-expanded={expanded}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </ExpandMore>
                  </CardActions>
                </Card>
              </>
            )}
          </Box>
        ) : (
          <Box sx={{ width: "60%", p: 2, backgroundColor: "#8395a7" }}>
            <Typography variant="h6" color="#112233">
              Digite el nombre del docente para consultar.
            </Typography>
          </Box>
        )}
      </Box>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ backgroundColor: "#8395a7" }}>
          <TableMateriales />
        </CardContent>
      </Collapse>
    </>
  );
};

export { AuxiliarDocente };
