import { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Divider,
  Icon,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import NextLink from "next/link";

// Icons
import DiamondIcon from "@mui/icons-material/Diamond";

// Redux
import { useAppDispatch } from "../../hooks";
import { incrementClicks, turnOffRender } from "../../reducers";

// Components
// UI
import { ActiveLink } from "./";

const Navbar = () => {
  const [clicked, setClicked] = useState(false);
  const dispatch = useAppDispatch();

  const turnOffUxRender = () => {
    dispatch(turnOffRender());
  };

  useEffect(() => {
    if (clicked) {
      dispatch(incrementClicks());
    }
  }, [clicked, dispatch]);

  return (
    <AppBar
      position={"static"}
      elevation={0}
      sx={{ backgroundColor: "inherit" }}
    >
      <Toolbar
        variant="dense"
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Box display={"flex"} alignItems={"center"}>
          <Icon sx={{ marginRight: 1 }}>
            <DiamondIcon />
          </Icon>
          <NextLink href="/" passHref>
            <Link
              sx={{ textDecoration: "none", color: "#fff" }}
              onClick={turnOffUxRender}
            >
              <Typography
                variant="h6"
                sx={{ userSelect: "none", cursor: "pointer" }}
              >
                App
              </Typography>
            </Link>
          </NextLink>
        </Box>

        <Box className={"navbar__actions"}>
          <ActiveLink href="/auth/login">
            <Typography variant="overline" onClick={() => setClicked(true)}>
              Log in
            </Typography>
          </ActiveLink>
          <Divider orientation="vertical" flexItem />
          <ActiveLink href="/auth/signup">
            <Button variant="outlined" onClick={() => setClicked(true)}>
              Sign up
            </Button>
          </ActiveLink>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export { Navbar };
