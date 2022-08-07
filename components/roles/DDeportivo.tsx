import { Box, Button, Typography } from "@mui/material";

// Redux
import { useAppSelector } from "../../hooks";

// Components
import { DDeportivoAuth } from "../auth";

import { useState } from "react";

type Render = 0 | 1 | 2;

const DDeportivo = () => {
  const { logged } = useAppSelector((state) => state.user);
  const [render, setRender] = useState<Render>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: Render) => {
    setRender(newValue);
  };

  const handlePDFPasante = async () => {
    const res = await fetch(`http://127.0.0.1:5000/pdf-pasante`, {
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

  const handlePDFMiembros = async () => {
    const res = await fetch(`http://127.0.0.1:5000/pdf-miembro`, {
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
            <Button variant="contained" onClick={handlePDFPasante}>
              Reporte pasantes
            </Button>
            <Button variant="contained" onClick={handlePDFMiembros}>
              Reporte miembros de los equipos
            </Button>
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
