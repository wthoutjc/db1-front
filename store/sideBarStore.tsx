// Icons
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AddBoxIcon from "@mui/icons-material/AddBox";

//Interfaces
import { SideBarData } from "../interfaces";

const AdminSideBarStore: SideBarData[] = [
  {
    to: "/home/account",
    title: "Account",
    Icon: <AccountBoxIcon />, 
  },
  {
    to: "/home/optionADMIN1",
    title: "Option1",
    Icon: <AddBoxIcon />,
  },
  {
    to: "/home/optionADMIN2",
    title: "Option2",
    Icon: <AddBoxIcon />,
  },
  {
    to: "/home/optionADMIN3",
    title: "Option3",
    Icon: <AddBoxIcon />,
  },
  {
    to: "/home/optionADMIN4",
    title: "Option4",
    Icon: <AddBoxIcon />,
  },
];

const EmployeeSideBarStore: SideBarData[] = [
  {
    to: "/home/account",
    title: "",
    Icon: <AccountBoxIcon />, 
  },
  {
    to: "/home/optionEMPLOYEE1",
    title: "",
    Icon: <AddBoxIcon />,
  },
  {
    to: "/home/optionEMPLOYEE2",
    title: "",
    Icon: <AddBoxIcon />,
  },
  {
    to: "/home/optionEMPLOYEE3",
    title: "",
    Icon: <AddBoxIcon />,
  },
  {
    to: "/home/optionEMPLOYEE4",
    title: "",
    Icon: <AddBoxIcon />,
  },
];

const ClientSideBarStore: SideBarData[] = [
  {
    to: "/home/account",
    title: "",
    Icon: <AccountBoxIcon />, 
  },
  {
    to: "/home/optionCLIENT1",
    title: "",
    Icon: <AddBoxIcon />,
  },
  {
    to: "/home/optionCLIENT2",
    title: "",
    Icon: <AddBoxIcon />,
  },
  {
    to: "/home/optionCLIENT3",
    title: "",
    Icon: <AddBoxIcon />,
  },
  {
    to: "/home/optionCLIENT4",
    title: "",
    Icon: <AddBoxIcon />,
  },
];

export { AdminSideBarStore, EmployeeSideBarStore, ClientSideBarStore };
