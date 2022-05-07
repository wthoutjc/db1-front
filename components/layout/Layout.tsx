import { Box } from "@mui/material";
import Head from "next/head";
import { Navbar } from "../ui";

// Redux
import { useAppSelector } from "../../hooks"
import { Sidebar } from "../ui/sidebar";

interface Props {
  title?: string;
  children?: React.ReactNode;
}

const Layout = ({ title = "App", children }:Props) => {
  const {status} = useAppSelector(state=> state.auth)
  const {logged} = status

  return (
    <Box display={'flex'} flexDirection={"column"} sx={{ width: "100%", height: "100%" }}>
      <Head>
        <title> {title} </title>
      </Head>

      <Navbar />
      
      {children}

    </Box>
  );
};

export { Layout };
