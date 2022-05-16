import { GetServerSideProps, GetServerSidePropsContext } from "next";

// Next Auth
import { getSession } from "next-auth/react";

const requireNoAuth = (ssp: GetServerSideProps) => {
  return async (ctx: GetServerSidePropsContext) => {
    const { req, query } = ctx;

    const { p = "/home" } = query;
    const session = await getSession({ req });

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
