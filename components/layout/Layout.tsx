import { useEffect } from "react";
import { Box } from "@mui/material";
import Head from "next/head";

// Components
import { Navbar } from "../ui";

// Cookies
import Cookies from "js-cookie";

// Redux
import { useAppDispatch, useAppSelector } from "../../hooks";
import { login } from "../../reducers";

// JWT
import decode from "jwt-decode";
import { IAuth } from "../../interfaces";

interface Props {
  title?: string;
  children?: React.ReactNode;
}

const Layout = ({ title = "App", children }: Props) => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);
  const { logged } = user;

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");

    if (accessToken) {
      const { id, name, hierarchy } = decode<IAuth>(accessToken);

      dispatch(login({id, name, hierarchy}));
    }
  }, [dispatch]);

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
