import {
  Box,
  Checkbox,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import React from "react";

// Interface
import { DBDataUsers } from "../../../interfaces";

type Order = "asc" | "desc";

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof DBDataUsers
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof DBDataUsers;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "IDPERSONAL",
    numeric: true,
    disablePadding: true,
    label: "Personal",
  },
  { id: "IDSEDE", numeric: true, disablePadding: true, label: "Sede" },
  { id: "IDESPACIO", numeric: true, disablePadding: true, label: "Espacio" },
  { id: "IDEQUIPO", numeric: true, disablePadding: true, label: "Equipo" },
  {
    id: "SUPIDEQUIPO",
    numeric: true,
    disablePadding: true,
    label: "Entrenador",
  },
  {
    id: "IDUDEPORTIVA",
    numeric: true,
    disablePadding: true,
    label: "U. Deportiva",
  },
  { id: "NOMBRE", numeric: true, disablePadding: true, label: "Hierarchy" },
  { id: "APELLIDO", numeric: true, disablePadding: true, label: "Apellido" },
];

const EnhancedTableHead = (props: EnhancedTableProps) => {
  const {
    numSelected,
    onRequestSort,
    onSelectAllClick,
    order,
    orderBy,
    rowCount,
  } = props;

  const createSortHandler =
    (property: keyof DBDataUsers) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding={"checkbox"}>
          <Checkbox
            color={"primary"}
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "Select all",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"center"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id && (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              )}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export { EnhancedTableHead };
