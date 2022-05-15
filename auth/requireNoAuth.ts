import { GetServerSideProps, GetServerSidePropsContext } from "next";

// Next Auth
import { getSession } from "next-auth/react";

const requireNoAuth = (ssp: GetServerSideProps) => {
  return async (ctx: GetServerSidePropsContext) => {
    const { req, query } = ctx;

    const { p = "/home" } = query;
    const session = await getSession({ req });

    console.log(p);

    if (session) {
      return {
        redirect: {
          permanent: false,
          destination: p.toString(),
        },
      };
    }
    return await ssp(ctx);
  };
};

export { requireNoAuth };

// JWT
// import { verifyToken } from "./";

// const { accessToken = "" } = req.cookies;
// let validToken = false;

// try {
//   await verifyToken(accessToken);
//   validToken = true;
// } catch (error) {
//   validToken = false;
// }
