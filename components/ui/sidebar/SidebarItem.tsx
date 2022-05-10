import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";

// Icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// Components
import { ActiveLink } from "../ActiveLink";

// Interface
import { SideBarData } from "../../../interfaces";

interface ItemSideBar {
  item: SideBarData;
  open: boolean;
}

const SidebarItem = ({ item, open }: ItemSideBar) => {
  const { title, to, Icon } = item;
  console.log({ title, to, Icon });

  return (
    <ActiveLink href={to}>
      <Tooltip title={title}>
        <ListItemButton
          sx={{
            minHeight: 48,
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
    </ActiveLink>
  );
};

export { SidebarItem };
