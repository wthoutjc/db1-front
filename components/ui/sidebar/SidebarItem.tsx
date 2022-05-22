import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";

// Components
import { ActiveSideBarLink } from "../activeLink";

// Interface
import { SideBarData } from "../../../interfaces";

interface ItemSideBar {
  item: SideBarData;
  open: boolean;
}

const SidebarItem = ({ item, open }: ItemSideBar) => {
  const { title, to, Icon } = item;

  return (
    <ActiveSideBarLink href={to}>
      <Tooltip title={title}>
        <ListItemButton
          sx={{
            justifyContent: open ? "initial" : "center",
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            {Icon}
          </ListItemIcon>
          <ListItemText primary={title} sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
      </Tooltip>
    </ActiveSideBarLink>
  );
};

export { SidebarItem };
