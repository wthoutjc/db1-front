import React, { useState, useMemo, useEffect } from "react";

import {
  Box,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from "@mui/material";

// Interface
import { DBDataUsers } from "../../../interfaces";

// Components
import { EnhancedTableToolbar, EnhancedTableHead } from "./";

type Order = "asc" | "desc";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

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

const CTable = ({ data }: { data: DBDataUsers[] }) => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState((page - 1) * limit);

  // Order States
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof DBDataUsers>("IDPERSONAL");

  // Selected
  const [selected, setSelected] = useState<readonly string[]>([]);

  useMemo(() => {
    setOffset((page - 1) * limit);
  }, [page, limit]);

  const emptyRows = useMemo(
    () => (page > 0 ? Math.max(0, (1 + page) * limit - data.length) : 0),
    [data.length, limit, page]
  );

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof DBDataUsers
  ) => {
    const isAsc = orderBy === property && order == "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n.IDPERSONAL);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} selected={selected[0]} />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {data
                .slice()
                .sort(getComparator(order, orderBy))
                .slice(page * limit, page * limit + limit)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.IDPERSONAL);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.IDPERSONAL)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.IDPERSONAL}
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
                        align="center"
                      >
                        {row.IDPERSONAL}
                      </TableCell>
                      <TableCell align="center">
                        {row.IDSEDE || "No registra"}
                      </TableCell>
                      <TableCell align="center">
                        {row.IDESPACIO || "No registra"}
                      </TableCell>
                      <TableCell align="center">
                        {row.IDEQUIPO || "No registra"}
                      </TableCell>
                      <TableCell align="center">
                        {row.SUPIDEQUIPO || "No registra"}
                      </TableCell>
                      <TableCell align="center">
                        {row.IDUDEPORTIVA || "No registra"}
                      </TableCell>
                      <TableCell align="center">
                        {row.NOMBRE || "No registra"}
                      </TableCell>
                      <TableCell align="center">
                        {row.APELLIDO || "No registra"}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 40]}
          component="div"
          count={data.length}
          rowsPerPage={limit}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        ></TablePagination>
      </Paper>
    </Box>
  );
};

export { CTable };
