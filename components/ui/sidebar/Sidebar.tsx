import { CSSObject, List, ListItemButton, ListItemIcon, ListItemText, styled, Theme, Tooltip,} from "@mui/material";
import MuiDrawer from '@mui/material/Drawer';

// Redux
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { closeSidebar } from "../../../reducers";

// Icons
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ActiveLink } from "../ActiveLink";

const DRAWER_WIDTH = 200

const openedMixin = (theme: Theme): CSSObject => ({
    width: DRAWER_WIDTH,
    backgroundColor: '#091621',
    position: 'static',
    height: '100%',
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});
  
const closedMixin = (theme: Theme): CSSObject => ({
    position: 'static',
    height: '100%',
    backgroundColor: '#091621',
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});
    
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: DRAWER_WIDTH,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const Sidebar = () => {
    const dispatch = useAppDispatch()

    const {sidebar} = useAppSelector(state => state.ux)

    const handleCloseSideBar = () => {
        dispatch(closeSidebar())
    }
    

    return (
        <Drawer variant="permanent" open={sidebar.open} className={sidebar.open ? "sidebar__main sidebar__expanded" : "sidebar__main sidebar__compressed"} >
            <List>
                <ActiveLink href="/home/account">
                    <Tooltip title="Account">
                        <ListItemButton onClick={handleCloseSideBar} sx={{
                            minHeight: 48,
                            justifyContent: sidebar.open ? 'initial' : 'center',
                            px: 2.5
                        }} >
                            <ListItemIcon sx={{
                                minWidth: 0,
                                mr: sidebar.open ? 3 : 'auto',
                                justifyContent: 'center',
                            }} >
                                <AccountCircleIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Account'} sx={{opacity: sidebar.open ? 1 : 0}} />
                        </ListItemButton>
                    </Tooltip>
                </ActiveLink>
            </List>
        </Drawer>
    )
}

export { Sidebar }
