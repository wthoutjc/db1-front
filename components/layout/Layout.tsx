import { Box } from "@mui/material";
import Head from "next/head";

// Components
import { Navbar } from "../ui";

// Redux
import { useAppDispatch } from "../../hooks";

interface Props {
  title?: string;
  children?: React.ReactNode;
}

const Layout = ({ title = "App", children }: Props) => {
  const dispatch = useAppDispatch();

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      sx={{ width: "100%", height: "100%" }}
    >
      <Head>
        <title> {title} </title>
      </Head>

      <Navbar />

      {children}
    </Box>
  );
};

export { Layout };
