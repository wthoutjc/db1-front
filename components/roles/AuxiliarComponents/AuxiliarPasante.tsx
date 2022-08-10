import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
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
import { INotification } from "../../../interfaces";

// Date
import moment from "moment";

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
  dia: string;
  horai: string;
  horaf: string;
  periodo: string;
  
}

const AuxiliarPasante = () => {
  const dispatch = useAppDispatch();

  const { loading } = useAppSelector((state) => state.user);

  const [pasante, setPasante] = useState<null | PasanteRequest>(null);

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

    const jsonData = (await res.json()) as { status: string; message: string };

    if (jsonData.status === "success") {
      console.log(JSON.parse(jsonData.message));
      setPasante(JSON.parse(jsonData.message));
    } else {
      setPasante(null);
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
        {true ? (
          <Box sx={{ width: "60%", p: 2, backgroundColor: "#8395a7" }}>
            {loading ? (
              <AuxiliarFetchingData />
            ) : (
              <Card sx={{ width: "100%" }}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      R
                    </Avatar>
                  }
                  title="Estudiante: Pepito Peréz"
                  subheader="September 14, 2016"
                />
                <CardContent sx={{ display: "flex", flexDirection: "column" }}>
                  <Box display={"flex"} sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Práctica libre:{" "}
                    </Typography>
                    <p style={{ color: "white", marginLeft: 10 }}>Práctica 1</p>
                  </Box>
                  <Box display={"flex"} sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Espacio:{" "}
                    </Typography>
                    <p style={{ color: "white", marginLeft: 10 }}>Espacio 1</p>
                  </Box>
                  <Box display={"flex"} sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Deporte:{" "}
                    </Typography>
                    <p style={{ color: "white", marginLeft: 10 }}>Deporte 1</p>
                  </Box>
                  <Box display={"flex"} sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Número de inscritos:{" "}
                    </Typography>
                    <p style={{ color: "white", marginLeft: 10 }}>25</p>
                  </Box>
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
            )}
          </Box>
        ) : (
          <Box sx={{ width: "60%", p: 2, backgroundColor: "#8395a7" }}>
            <Typography variant="h6" color="#112233">
              No se encontraron resultados para la búsqueda
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

export { AuxiliarPasante };
