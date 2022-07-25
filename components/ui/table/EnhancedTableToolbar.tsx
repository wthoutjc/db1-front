import { useRouter } from "next/router";

import { alpha, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";

// Icons
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import EditIcon from "@mui/icons-material/Edit";

// Redux
import { useAppDispatch } from "../../../hooks";
import { newNotification } from "../../../reducers";
import { INotification } from "../../../interfaces";

// uuid
import { v4 as uuid } from "uuid";

interface EnhancedTableToolbarProps {
  numSelected: number;
  selected: string | null;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const dispatch = useAppDispatch();

  const { numSelected, selected } = props;

  const router = useRouter();

  const handleDelete = async () => {
    if (selected) {
      try {
        const res = await fetch(`http://127.0.0.1:5000/${selected}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const { message } = await res.json();
        const payload: INotification = {
          id: uuid(),
          title: "Info:",
          message,
          severity: "info",
        };
        dispatch(newNotification(payload));
        router.push("/");
      } catch (error) {
        console.error(error);
        const payload: INotification = {
          id: uuid(),
          title: "Info:",
          message: "Falló el procesamiento de la solicitud",
          severity: "error",
        };
        dispatch(newNotification(payload));
      }
    }
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} seleccionados
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Tabla de empleados
        </Typography>
      )}
      {numSelected === 1 ? (
        <>
          <Tooltip
            title="Editar"
            onClick={() => router.push(`/empleado/${selected}`)}
          >
            <IconButton>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Borrar" onClick={handleDelete}>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

export { EnhancedTableToolbar };
