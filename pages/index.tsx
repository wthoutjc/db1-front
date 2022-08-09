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
