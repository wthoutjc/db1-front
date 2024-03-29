import { Box, Button, LinearProgress, Typography } from "@mui/material";

// Redux
import { useAppSelector } from "../../hooks";

// Components
import { DDeportivoAuth } from "../auth";

const DDeportivo = () => {
  const { logged, loading } = useAppSelector((state) => state.user);

  const handlePDFPasante = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pdf-pasante`, {
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pdf-miembro`, {
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
      {loading && !logged && <LinearProgress />}
      {logged ? (
        <>
          <Box
            sx={{
              backgroundColor: "#001122",
              borderStartEndRadius: 25,
              borderStartStartRadius: 25,
              overflow: "auto",
              width: "100%",
              p: 2,
              boxShadow: "0px 0px 1px 0px white",
            }}
            className={"animate__animated animate__fadeIn"}
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
