import {
  AppBar,
  Box,
  IconButton,
  Link,
  Toolbar,
  Typography,
  capitalize,
  Tooltip,
} from "@mui/material";
import NextLink from "next/link";

// Icons
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import BookIcon from "@mui/icons-material/Book";

// Redux
import { useAppSelector, useAppDispatch } from "../../hooks";
import { toggleSidebar, setLogged, resetData } from "../../reducers";

// Components
import { Sidebar } from "./sidebar";

// Date
import moment from "moment";

// Icons
import LogoutIcon from "@mui/icons-material/Logout";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { sidebar } = useAppSelector((state) => state.ui);
  const { role, data } = useAppSelector((state) => state.info);
  const { logged } = useAppSelector((state) => state.user);
  const { open } = sidebar;

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const handleLogOut = () => {
    dispatch(resetData());
    dispatch(
      setLogged({
        logged: false,
      })
    );
  };

  return (
    <>
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Tooltip title="Manual de usuario">
              <IconButton
                onClick={() =>
                  window.open(
                    "https://drive.google.com/file/d/1Ol4vxDy4O1ymXkzWNz2l_9fQCPXwNlnj/view",
                    "_blank"
                  )
                }
              >
                <BookIcon />
              </IconButton>
            </Tooltip>
            <Box
              sx={{
                ml: 4,
              }}
            >
              {logged && (
                <Tooltip title="Cerrar sesión">
                  <IconButton onClick={handleLogOut} size="small">
                    <LogoutIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <AppBar position={"static"} elevation={0} className={"navbar__appbar2"}>
        <Sidebar />
        <Toolbar
          variant="dense"
          sx={{ display: "flex", justifyContent: "space-between", padding: 0 }}
        >
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            width={"90%"}
          >
            <Typography variant="h6" sx={{ userSelect: "none" }}>
              {role === "ddeportivo" ? "Director Deportivo" : capitalize(role)}
            </Typography>
            {data && (
              <Typography variant="h6">
                {data.name} - {data.sede}
              </Typography>
            )}
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ userSelect: "none" }}
            >
              {moment(Date.now()).format("DD/MM/YYYY")}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export { Navbar };
