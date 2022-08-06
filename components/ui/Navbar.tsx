import {
  AppBar,
  Box,
  IconButton,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import NextLink from "next/link";

// Icons
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

// Redux
import { useAppSelector, useAppDispatch } from "../../hooks";
import { toggleSidebar } from "../../reducers";

// Components
import { Sidebar } from "./sidebar";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { sidebar } = useAppSelector((state) => state.ui);
  const { open } = sidebar;

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  return (
    <AppBar position={"static"} elevation={0} className={"navbar__appbar"}>
      <Sidebar />
      <Toolbar
        variant="dense"
        sx={{ display: "flex", justifyContent: "space-between", padding: 0 }}
      >
        <Box display={"flex"} alignItems={"center"}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleToggleSidebar}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
          <NextLink href={"/"} passHref>
            <Link sx={{ textDecoration: "none", color: "#fff" }}>
              <Typography
                variant="h6"
                sx={{ userSelect: "none", cursor: "pointer" }}
              >
                Unidad Deportiva
              </Typography>
            </Link>
          </NextLink>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export { Navbar };
