import { Box, Button, Typography } from "@mui/material";
import type { NextPage } from "next";
import NextLink from "next/link";

// Components
import { Layout } from "../components/layout";
import { CTable } from "../components/ui/table";

// Redux
import { useAppDispatch } from "../hooks";
import { INotification } from "../interfaces";
import { newNotification } from "../reducers";

// uuid
import { v4 as uuid } from "uuid";

// Icons
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import BackupTableIcon from "@mui/icons-material/BackupTable";
import AddIcon from "@mui/icons-material/Add";

const DATA = [
  {
    idPersonal: "1",
    nombre: "Juan",
    apellido: "Perez",
    idSede: "1",
    idEspacio: "1",
    idEquipo: "1",
    SupIdEquipo: "1",
    idUDeportiva: "1",
  },
  {
    idPersonal: "2",
    nombre: "Juan",
    apellido: "Perez",
    idSede: "1",
    idEspacio: "1",
    idEquipo: "1",
    SupIdEquipo: "1",
    idUDeportiva: "1",
  },
  {
    idPersonal: "3",
    nombre: "Juan",
    apellido: "Perez",
    idSede: "1",
    idEspacio: "1",
    idEquipo: "1",
    SupIdEquipo: "1",
    idUDeportiva: "1",
  },
  {
    idPersonal: "4",
    nombre: "Juan",
    apellido: "Perez",
    idSede: "1",
    idEspacio: "1",
    idEquipo: "1",
    SupIdEquipo: "1",
    idUDeportiva: "1",
  },
  {
    idPersonal: "5",
    nombre: "Juan",
    apellido: "Perez",
    idSede: "1",
    idEspacio: "1",
    idEquipo: "1",
    SupIdEquipo: "1",
    idUDeportiva: "1",
  },
  {
    idPersonal: "6",
    nombre: "Juan",
    apellido: "Perez",
    idSede: "1",
    idEspacio: "1",
    idEquipo: "1",
    SupIdEquipo: "1",
    idUDeportiva: "1",
  },
];

const Home: NextPage = () => {
  const dispatch = useAppDispatch();

  const handleNotification = () => {
    const payload: INotification = {
      id: uuid(),
      title: "Success:",
      message:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa, iusto quibusdam laboriosam magni at nesciunt quam. Architecto dignissimos numquam, fugiat rem commodi neque enim optio. Ut odit deserunt explicabo tenetur? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa, iusto quibusdam laboriosam magni at nesciunt quam. Architecto dignissimos numquam, fugiat rem commodi neque enim optio. Ut odit deserunt explicabo tenetur?",
      severity: "error",
    };
    dispatch(newNotification(payload));
  };

  return (
    <>
      <Layout title={"UDFJC - Unidad Deportiva"}>
        <Box
          sx={{ p: 2, boxSizing: 'border-box' }}
          display={"flex"}
          flexDirection={"column"}
          height={"100vh"}
        >
          <Box
            sx={{
              backgroundColor: "#c8d6e5",
              color: "#012",
              borderRadius: "5px",
              p: 2,
              mb: 3,
            }}
            width={"100%"}
            display={"flex"}
            justifyContent={"space-around"}
            height={"15%"}
          >
            <Box width={"55%"}>
              <Typography variant="h6">Empleado Management</Typography>
              <Typography variant="body1">
                Sistema de gestión de empleados en la unidad deportiva de la
                Universidad Distrital Francisco José de Caldas
              </Typography>
            </Box>
            <Box
              display={"flex"}
              sx={{ p: 1, backgroundColor: "#123", borderRadius: "5px" }}
              width={"25%"}
              justifyContent={"space-around"}
              alignItems={"center"}
              height={"100%"}
            >
              <Box>
                <NextLink href="/integrantes" passHref>
                  <Button
                    size="small"
                    variant="contained"
                    endIcon={<GroupsRoundedIcon />}
                  >
                    Integrantes
                  </Button>
                </NextLink>
              </Box>
              <Box>
                <NextLink href="/modelo" passHref>
                  <Button
                    size="small"
                    variant="contained"
                    color="success"
                    endIcon={<BackupTableIcon />}
                  >
                    Modelo
                  </Button>
                </NextLink>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              backgroundColor: "#c8d6e5",
              color: "#012",
              borderStartEndRadius: "5px",
              borderStartStartRadius: "5px",
              p: 2,
              borderBottom: "1px solid #123",
            }}
            minHeight={"5%"}
          >
            <NextLink href="/nuevo-empleado" passHref>
              <Button
                size="small"
                variant="contained"
                color="info"
                endIcon={<AddIcon />}
              >
                Nuevo
              </Button>
            </NextLink>
          </Box>
          <Box
            sx={{
              backgroundColor: "#c8d6e5",
              color: "#012",
              borderEndEndRadius: "5px",
              borderEndStartRadius: "5px",
              p: 2,
              mb: 3,
            }}
          >
            <CTable data={DATA} />
          </Box>
        </Box>
      </Layout>
    </>
  );
};

export default Home;
