import { GetStaticPaths, GetStaticProps, NextPage } from "next";

// Components
import { ConnectedLayout, Layout } from "../../../components/layout";

// Redux
import { useAppSelector } from "../../../hooks";

const HomeOptionPage: NextPage = () => {
  return (
    <Layout>
      <ConnectedLayout>
        <h1>Page</h1>
      </ConnectedLayout>
    </Layout>
  );
};

// export const getStaticPaths: GetStaticPaths = async () => {
//   const options = ["account"];

//   return {
//     paths: options.map((option) => ({
//       params: { option },
//     })),
//     fallback: "blocking",
//   };
// };

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const { id } = params as { id: string };

//   const pokemon = { id: "1" };

//   if (!pokemon) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {
//       pokemon,
//     },
//     revalidate: 86399,
//   };
// };

export default HomeOptionPage;
