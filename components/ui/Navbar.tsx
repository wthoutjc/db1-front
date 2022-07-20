import { AppBar, Box, Link, Toolbar, Typography } from "@mui/material";
import NextLink from "next/link";

const Navbar = () => {
  return (
    <AppBar position={"static"} elevation={0} className={"navbar__appbar"}>
      <Toolbar
        variant="dense"
        sx={{ display: "flex", justifyContent: "space-between", padding: 0 }}
      >
        <Box display={"flex"} alignItems={"center"}>
          <NextLink href={"/"} passHref>
            <Link sx={{ textDecoration: "none", color: "#fff" }}>
              <Typography
                variant="h6"
                sx={{ userSelect: "none", cursor: "pointer" }}
              >
                CRUD - Empleado
              </Typography>
            </Link>
          </NextLink>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export { Navbar };
