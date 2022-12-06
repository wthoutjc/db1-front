import { SwipeableDrawer } from "@mui/material";

// Components
import { List } from "./";

// Redux
import { useAppSelector, useAppDispatch } from "../../../hooks";
import { toggleSidebar } from "../../../reducers";

const Sidebar = () => {
  const { sidebar } = useAppSelector((state) => state.ui);
  const { open } = sidebar;

  const dispatch = useAppDispatch();

  return (
    <SwipeableDrawer
      anchor={"right"}
      open={open}
      onClose={() => dispatch(toggleSidebar())}
      onOpen={() => dispatch(toggleSidebar())}
    >
      {<List />}
    </SwipeableDrawer>
  );
};

export { Sidebar };
