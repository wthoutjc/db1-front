import { GetServerSideProps } from "next";
import { Box, Button, Divider, Typography } from "@mui/material";
import type { NextPage } from "next";

// Components
import { Layout } from "../components/layout";

// Redux
import { useAppDispatch } from "../hooks";
import { INotification } from "../interfaces";
import { newNotification } from "../reducers";

// uuid
import { v4 as uuid } from "uuid";

// Auth
import { requireNoAuth } from "../auth";

const Home: NextPage = () => {
  const dispatch = useAppDispatch();

  const handleNotification = () => {
    const payload: INotification = {
      id: uuid(),
      title: "Success:",
      message:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa, iusto quibusdam laboriosam magni at nesciunt quam. Architecto dignissimos numquam, fugiat rem commodi neque enim optio. Ut odit deserunt explicabo tenetur? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa, iusto quibusdam laboriosam magni at nesciunt quam. Architecto dignissimos numquam, fugiat rem commodi neque enim optio. Ut odit deserunt explicabo tenetur?",
      severity: "error",
    };
    dispatch(newNotification(payload));
  };

  return (
    <>
      <Layout title={"Home - App"}>
        <Box className="index__container">
          <Box className="index__landing">
            <Typography variant="h2" sx={{ fontWeight: "bold" }}>
              App - CRUD
            </Typography>
            <Typography variant="h5">
              The best site to manage, analize and predict your data.
            </Typography>
            <Box className="index__options">
              <Button onClick={handleNotification}> Learn more </Button>
              <Divider orientation="vertical" flexItem />
              <Button variant="contained"> About </Button>
            </Box>
          </Box>
          {/* <Box className="index__landing">
            <h1>Hola</h1>
          </Box> */}
        </Box>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = requireNoAuth(
  async (_ctx) => {
    return {
      props: {},
    };
  }
);

export default Home;
