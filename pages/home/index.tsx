import { Box, Breadcrumbs, Link, Typography } from "@mui/material";
import { Layout } from "../../components/layout";

// Components
import { Sidebar } from "../../components/ui/sidebar";
import { Admin, Client, Employee } from "../../components/roles";
import { ConnectedLayout } from "../../components/layout";

// Enum
import { Hierarchy } from "../../enum";

// Redux
import { useAppSelector } from "../../hooks";

const HomePage = () => {
  const { status } = useAppSelector((state) => state.auth);

  const { hierarchy } = status;

  return (
    <Layout title="Welcome - App">
      <ConnectedLayout>
        <Box className="main__application">
          <Box sx={{ padding: 1, boxSizing: "border-box" }}>
            <Breadcrumbs sx={{ color: "#001122" }}>
              <Link underline="hover" color="inherit" href="/">
                MUI
              </Link>
              <Link
                underline="hover"
                color="inherit"
                href="/material-ui/getting-started/installation/"
              >
                Core
              </Link>
              <Typography color="inherit" fontWeight={600}>
                Breadcrumbs
              </Typography>
            </Breadcrumbs>
          </Box>
          <Box sx={{ padding: "0 1em" }}>
            {hierarchy === Hierarchy.admin && <Admin />}
            {hierarchy === Hierarchy.employee && <Employee />}
            {hierarchy === Hierarchy.client && <Client />}
          </Box>
        </Box>
      </ConnectedLayout>
    </Layout>
  );
};

export default HomePage;
