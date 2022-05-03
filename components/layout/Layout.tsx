import { Box } from "@mui/material";
import Head from "next/head";
import { Navbar } from "../ui";

interface Props {
  title?: string;
  children?: React.ReactNode;
}

const Layout: React.FC<Props> = ({ title = "App", children }) => {
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
