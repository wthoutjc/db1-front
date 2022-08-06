import { Box } from "@mui/material";

// Interfaces
import { DBDataUsers } from "../../interfaces";

// Redux
import { useAppDispatch, useAppSelector } from "../../hooks";

// SWR
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Auxiliar = () => {
  const dispatch = useAppDispatch();
  const { logged } = useAppSelector((state) => state.auxiliar);

  // SWR - Client side
  // const { data, error } = useSWR("/api/users", fetcher);

  return (
    <Box
      sx={{ p: 2, boxSizing: "border-box" }}
      display={"flex"}
      flexDirection={"column"}
      height={"100vh"}
    >
      {logged ? (
        <Box sx={{ p: 2, boxSizing: "border-box" }}>
          <h1>Logged</h1>
        </Box>
      ) : (
        <Box sx={{ p: 2, boxSizing: "border-box" }}>
          <h1>Not Logged</h1>
        </Box>
      )}
    </Box>
  );
};

export { Auxiliar };
