import { Box, Button, Divider, Typography } from "@mui/material";
import type { NextPage } from "next";

// Components
import { Layout } from "../components/layout";

const Home: NextPage = () => {
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
              <Button> Learn more </Button>
              <Divider orientation="vertical" flexItem />
              <Button variant="contained"> About </Button>
            </Box>
          </Box>
        </Box>
      </Layout>
    </>
  );
};

export default Home;
