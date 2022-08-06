import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";

// Redux
import { useAppSelector } from "../../hooks";

// Components
import { DDeportivoAuth } from "../auth";
import {
  AuxiliarDocente,
  AuxiliarMiembro,
  AuxiliarPasante,
} from "./AuxiliarComponents";

// Icons
import SchoolIcon from "@mui/icons-material/School";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import ReduceCapacityIcon from "@mui/icons-material/ReduceCapacity";
import { useState } from "react";

type Render = 0 | 1 | 2;

const DDeportivo = () => {
  const { logged } = useAppSelector((state) => state.user);
  const [render, setRender] = useState<Render>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: Render) => {
    setRender(newValue);
  };

  return (
    <Box
      sx={{ p: 2, boxSizing: "border-box" }}
      display={"flex"}
      flexDirection={"column"}
      height={"100vh"}
    >
      {logged ? (
        <>
          <Box
            sx={{
              backgroundColor: "#001122",
              borderStartEndRadius: 25,
              borderStartStartRadius: 25,
              overflow: "hidden",
              width: "100%",
              p: 2,
              boxShadow: "0px 0px 1px 0px white",
            }}
          >
            <Typography variant="body2"> Name </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: "#112233",
              p: 2,
              display: "flex",
              justifyContent: "space-evenly",
              boxShadow: "0px 0px 1px 0px white",
            }}
          >
            <Button variant="contained">Reporte pasantes</Button>
            <Button variant="contained">Reporte miembros de los equipos</Button>
          </Box>
          <Box
            sx={{
              backgroundColor: "#112233",
              p: 2,
              boxShadow: "0px 0px 1px 0px white",
            }}
          >
            <Typography variant="body1"> Reporte pasantes </Typography>
            <Typography variant="body2" color="text.secondary">
              Generar un pdf con las horas asistidas de cada uno de los pasantes
              en el período y en la sede
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: "#112233",
              p: 2,
              boxShadow: "0px 0px 1px 0px white",
            }}
          >
            <Typography variant="body1">Reporte miembros del equipo</Typography>
            <Typography variant="body2" color="text.secondary">
              Generar un pdf con las horas asistidas de cada uno de los miembros
              de los equipos en el periodo en la sede
            </Typography>
          </Box>
        </>
      ) : (
        <DDeportivoAuth />
      )}
    </Box>
  );
};

export { DDeportivo };
