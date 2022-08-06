import { GetServerSideProps } from "next";
import type { NextPage } from "next";

// Components
import { Layout } from "../components/layout";

import { Auxiliar, DDeportivo} from "../components/roles";

// Redux
import { useAppSelector } from "../hooks";

import axios from "axios";

// Interfaces
import { DBDataUsers } from "../interfaces";
import { Box } from "@mui/material";

interface SSRProps {
  empleados: DBDataUsers[] | null;
}

const Home: NextPage<SSRProps> = ({ empleados }) => {
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const { data } = await axios.get<SSRProps>(`${process.env.API_URL}`);
    const { empleados } = data || { empleados: [] };

    return {
      props: {
        empleados,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        empleados: [],
      },
    };
  }
};

export default Home;

// uuid
// import { v4 as uuid } from "uuid";

// const dispatch = useAppDispatch();

// const handleNotification = () => {
//   const payload: INotification = {
//     id: uuid(),
//     title: "Success:",
//     message:
//       "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa, iusto quibusdam laboriosam magni at nesciunt quam. Architecto dignissimos numquam, fugiat rem commodi neque enim optio. Ut odit deserunt explicabo tenetur? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa, iusto quibusdam laboriosam magni at nesciunt quam. Architecto dignissimos numquam, fugiat rem commodi neque enim optio. Ut odit deserunt explicabo tenetur?",
//     severity: "error",
//   };
//   dispatch(newNotification(payload));
// };
