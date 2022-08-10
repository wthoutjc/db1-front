import * as React from "react";
import { alpha } from "@mui/material/styles";

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Paper,
  Checkbox,
  IconButton,
  Tooltip,
} from "@mui/material";

// Icons
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";

// Utils
import { visuallyHidden } from "@mui/utils";

// Interfaces
import { IMaterial } from "../../../interfaces";
import { useAppDispatch } from "../../../hooks";
import { setLoading, newNotification } from "../../../reducers";

// uuid
import { v4 as uuid } from "uuid";
import { INotification } from "../../../interfaces";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof IMaterial;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "idElemento",
    numeric: false,
    disablePadding: true,
    label: "ID",
  },
  {
    id: "idEspacio",
    numeric: false,
    disablePadding: true,
    label: "ID Sede",
  },
  {
    id: "material",
    numeric: false,
    disablePadding: true,
    label: "Material",
  },
  {
    id: "sede",
    numeric: true,
    disablePadding: false,
    label: "Sede",
  },
  {
    id: "deporte",
    numeric: true,
    disablePadding: false,
    label: "Deporte",
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof IMaterial
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof IMaterial) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell, i) => (
          <TableCell
            key={headCell.id}
            align={i === 0 ? "left" : "right"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
  infoSelected: readonly IMaterial[];
}

const EnhancedTableToolbar = ({
  numSelected,
  infoSelected,
}: EnhancedTableToolbarProps) => {
  const dispatch = useAppDispatch()

  const handleClick = async () => {
    dispatch(setLoading(true));
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/prestar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(infoSelected),
    });

    if (res) dispatch(setLoading(false));

    const data = await res.json();
    
    const payload: INotification = {
      id: uuid(),
      title: "Registro exitoso:",
      message: data.message,
      severity: "success",
    };
    dispatch(newNotification(payload));

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
          {numSelected > 1 ? `${numSelected} seleccionados` : "1 seleccionado"}
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Materiales
        </Typography>
      )}
      {numSelected > 0 && (
        <Tooltip title="Prestar material(es)">
          <IconButton onClick={handleClick}>
            <AssignmentRoundedIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

const TableMateriales = ({ rows }: { rows: IMaterial[] }) => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof IMaterial>("material");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [infoSelected, setInfoSelected] = React.useState<IMaterial[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof IMaterial
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.material);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (
    event: React.MouseEvent<unknown>,
    idElemento: string,
    row: IMaterial
  ) => {
    const selectedIndex = selected.indexOf(idElemento);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, idElemento);
      infoSelected.push(row);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
      infoSelected.splice(0, 1);
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
      infoSelected.splice(-1, 1);
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
      infoSelected.splice(selectedIndex, 1);
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (idElemento: string) =>
    selected.indexOf(idElemento) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2, backgroundColor: "#112233" }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          infoSelected={infoSelected}
        />
        <TableContainer>
          <Table
            sx={{ width: "100%", backgroundColor: "#112233" }}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(String(row.idElemento));
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) =>
                        handleClick(event, String(row.idElemento), row)
                      }
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={String(row.idElemento)}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.idElemento}
                      </TableCell>
                      <TableCell align="right">{row.idEspacio}</TableCell>
                      <TableCell align="right">{row.material}</TableCell>
                      <TableCell align="right">{row.sede}</TableCell>
                      <TableCell align="right">{row.deporte}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export { TableMateriales };
