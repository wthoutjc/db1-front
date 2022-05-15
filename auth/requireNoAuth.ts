import { GetServerSideProps, GetServerSidePropsContext } from "next";

// JWT
import { verifyToken } from "./";

const requireNoAuth = (ssp: GetServerSideProps) => {
  return async (ctx: GetServerSidePropsContext) => {
    const { req } = ctx;

    const { accessToken = "" } = req.cookies;
    let validToken = false;

    try {
      await verifyToken(accessToken);
      validToken = true;
    } catch (error) {
      validToken = false;
    }

    if (validToken) {
      return {
        redirect: {
          permanent: false,
          destination: "/home",
        },
      };
    }
    return await ssp(ctx);
  };
};

export { requireNoAuth };
