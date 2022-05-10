import { GetServerSideProps } from "next";
import { Box } from "@mui/material";
import { Layout } from "../../components/layout";

// Components
import { Admin, Client, Employee } from "../../components/roles";
import { ConnectedLayout } from "../../components/layout";

// Enum
import { Hierarchy } from "../../enum";

// Redux
import { useAppSelector } from "../../hooks";

// Auth
import { requireAuth } from "../../auth";

const HomePage = () => {
  const { user } = useAppSelector((state) => state.auth);

  const { hierarchy } = user;

  return (
    <Layout title="Welcome - App">
      <ConnectedLayout>
        <Box sx={{ padding: "0 1em" }}>
          {hierarchy === Hierarchy.admin && <Admin />}
          {hierarchy === Hierarchy.employee && <Employee />}
          {hierarchy === Hierarchy.client && <Client />}
        </Box>
      </ConnectedLayout>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = requireAuth(
  async (_ctx) => {
    return {
      props: {},
    };
  }
);

export default HomePage;
