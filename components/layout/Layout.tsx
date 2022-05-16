import { useEffect } from "react";
import { Box } from "@mui/material";
import Head from "next/head";

// Components
import { Navbar } from "../ui";

// Redux
import { useAppDispatch } from "../../hooks";
import { login } from "../../reducers";

import { IAuth } from "../../interfaces";

// NextAuth
import { useSession } from "next-auth/react";

// Interface - Enum - Types
import { StatusAuth } from "../../enum";

interface Props {
  title?: string;
  children?: React.ReactNode;
}

const Layout = ({ title = "App", children }: Props) => {
  const { data, status } = useSession();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === StatusAuth.authenticated) {
      dispatch(login(data?.user as IAuth));
    }
  }, [status, data, dispatch]);

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
