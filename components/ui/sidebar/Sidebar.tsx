import { Fragment, useState } from "react";
import { Button, SwipeableDrawer } from "@mui/material";

// Components
import { List } from "./";

// Redux
import { useAppSelector, useAppDispatch } from "../../../hooks";
import { toggleSidebar } from "../../../reducers";

type Anchor = "top" | "left" | "bottom" | "right";

const Sidebar = () => {
  const { sidebar } = useAppSelector((state) => state.ui);
  const { open } = sidebar;

  const dispatch = useAppDispatch();

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  return (
    <SwipeableDrawer
      anchor={"left"}
      open={open}
      onClose={() => dispatch(toggleSidebar())}
      onOpen={() => dispatch(toggleSidebar())}
    >
      {<List />}
    </SwipeableDrawer>
  );
};

export { Sidebar };
