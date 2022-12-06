import type { NextPage } from "next";

// Components
import { Layout } from "../components/layout";

import { Auxiliar, DDeportivo } from "../components/roles";

// Redux
import { useAppSelector } from "../hooks";

const Home: NextPage = () => {
  const { role } = useAppSelector((state) => state.info);

  return (
    <>
      <Layout title={"UDFJC - Unidad Deportiva"}>
        {role === "auxiliar" && <Auxiliar />}
        {role === "ddeportivo" && <DDeportivo />}
      </Layout>
    </>
  );
};

export default Home;
