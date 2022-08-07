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
import { setLogged } from "../../../reducers";

// Icons
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

// Components
import { TableMateriales, AuxiliarFetchingData } from "./";

interface DocenteProps {
  name: string;
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
  const { loading } = useAppSelector((state) => state.user);

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
    const res = await fetch(`http://127.0.0.1:5000/docente/${data.name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const jsonData = (await res.json()) as { logged: boolean; status: string };

    if (jsonData.status === "success") {
      console.log(jsonData);
    }
  };

  return (
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
              <Typography variant="h6">Consultar docente</Typography>
            </Box>
            <TextField
              fullWidth
              sx={{ marginBottom: "1em" }}
              type="text"
              placeholder="Ej: Pepito Peréz"
              label="Nombre docente"
              autoComplete="codigo-de-usuario"
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
                title="Docente: Pepito Peréz"
                subheader="September 14, 2016"
              />
              <CardContent sx={{ display: "flex", flexDirection: "column" }}>
                <Box display={"flex"} sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Curso:{" "}
                  </Typography>
                  <p style={{ color: "white", marginLeft: 10 }}>Curso 1</p>
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
                    Número de estudiantes:{" "}
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
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <TableMateriales />
                </CardContent>
              </Collapse>
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
  );
};

export { AuxiliarDocente };
