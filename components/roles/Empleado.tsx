import { Box, Button } from "@mui/material";
import NextLink from "next/link";

// Icons
import AddIcon from "@mui/icons-material/Add";

// Components
import { CTable } from "../ui/table";

// Interfaces
import { DBDataUsers } from "../../interfaces";

interface SSRProps {
  empleados: DBDataUsers[] | null;
}

const Empleado = ({ empleados }: SSRProps) => {
  return (
    <Box
      sx={{ p: 2, boxSizing: "border-box" }}
      display={"flex"}
      flexDirection={"column"}
      height={"100vh"}
    >
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
        <CTable data={empleados || []} />
      </Box>
    </Box>
  );
};

export { Empleado };
