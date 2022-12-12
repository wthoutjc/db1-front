import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  LinearProgress,
} from "@mui/material";

// Redux
import { useAppSelector } from "../../hooks";

// Components
import { AuxiliarAuth } from "../auth";
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

const Auxiliar = () => {
  const { logged, loading } = useAppSelector((state) => state.user);
  const [render, setRender] = useState<Render>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: Render) => {
    setRender(newValue);
  };

  return (
    <Box
      sx={{
        p: 2,
        boxSizing: "border-box",
      }}
      display={"flex"}
      flexDirection={"column"}
      height={"100vh"}
    >
      {loading && !logged && <LinearProgress />}
      {logged ? (
        <Box
          sx={{
            backgroundColor: "#112233",
            borderStartEndRadius: 25,
            borderStartStartRadius: 25,
            overflow: "auto",
            width: "100%",
          }}
          className={"animate__animated animate__fadeIn"}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              backgroundColor: "white",
              boxShadow: "0px 0px 3px 0px white",
              position: "relative",
            }}
          >
            {loading && (
              <LinearProgress
                sx={{ width: "100%", position: "absolute", bottom: 0 }}
              />
            )}
            <BottomNavigation
              showLabels
              value={render}
              onChange={handleChange}
              sx={{
                width: "100%",
                backgroundColor: "#001122",
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <BottomNavigationAction label="Docentes" icon={<SchoolIcon />} />
              <BottomNavigationAction
                label="Pasantes"
                icon={<SupervisedUserCircleIcon />}
              />
              <BottomNavigationAction
                label="Miembros"
                icon={<ReduceCapacityIcon />}
              />
            </BottomNavigation>
          </Box>
          {render === 0 && <AuxiliarDocente />}
          {render === 1 && <AuxiliarPasante />}
          {render === 2 && <AuxiliarMiembro />}
        </Box>
      ) : (
        <AuxiliarAuth />
      )}
    </Box>
  );
};

export { Auxiliar };
