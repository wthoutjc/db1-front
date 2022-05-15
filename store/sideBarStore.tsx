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
    title: "Account",
    Icon: <AccountBoxIcon />, 
  },
  {
    to: "/home/optionEMPLOYEE1",
    title: "optionEMPLOYEE1",
    Icon: <AddBoxIcon />,
  },
  {
    to: "/home/optionEMPLOYEE2",
    title: "optionEMPLOYEE2",
    Icon: <AddBoxIcon />,
  },
  {
    to: "/home/optionEMPLOYEE3",
    title: "optionEMPLOYEE3",
    Icon: <AddBoxIcon />,
  },
  {
    to: "/home/optionEMPLOYEE4",
    title: "optionEMPLOYEE4",
    Icon: <AddBoxIcon />,
  },
];

const ClientSideBarStore: SideBarData[] = [
  {
    to: "/home/account",
    title: "Account",
    Icon: <AccountBoxIcon />, 
  },
  {
    to: "/home/optionCLIENT1",
    title: "optionCLIENT1",
    Icon: <AddBoxIcon />,
  },
  {
    to: "/home/optionCLIENT2",
    title: "optionCLIENT2",
    Icon: <AddBoxIcon />,
  },
  {
    to: "/home/optionCLIENT3",
    title: "optionCLIENT3",
    Icon: <AddBoxIcon />,
  },
  {
    to: "/home/optionCLIENT4",
    title: "optionCLIENT4",
    Icon: <AddBoxIcon />,
  },
];

export { AdminSideBarStore, EmployeeSideBarStore, ClientSideBarStore };
