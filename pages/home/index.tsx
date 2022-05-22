import { Box } from "@mui/material";
import { Layout } from "../../components/layout";

// Components
import { Admin, Client, Employee } from "../../components/roles";
import { ConnectedLayout } from "../../components/layout";
import { CTable } from "../../components/ui/table";

// Enum
import { Hierarchy } from "../../enum";

// Redux
import { useAppSelector } from "../../hooks";
import { GetServerSideProps } from "next";

// Request
import { request } from "../../api";

//Interface
import { DBDataUsers } from "../../interfaces";

interface Props {
  data: DBDataUsers[];
}

const HomePage = ({ data }: Props) => {
  const { user } = useAppSelector((state) => state.auth);

  const { hierarchy } = user;

  return (
    <Layout title="Welcome - App">
      <ConnectedLayout>
        <Box sx={{ padding: "0 1em" }}>
          {hierarchy === Hierarchy.admin && <Admin />}
          {hierarchy === Hierarchy.employee && <Employee />}
          {hierarchy === Hierarchy.client && <Client data={data} />}
        </Box>
      </ConnectedLayout>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { data } = await request.get<DBDataUsers[]>("/data/users");

  return {
    props: {
      data,
    },
  };
};

export default HomePage;
