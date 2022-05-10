import { GetServerSideProps, GetServerSidePropsContext } from "next";

const requireAuth = (ssp: GetServerSideProps) => {
  return async (ctx: GetServerSidePropsContext) => {
    const { req } = ctx;

    if (!req.headers.cookie) {
      return {
        redirect: {
          permanent: false,
          destination: "/",
        },
      };
    }

    const tokens = req.headers.cookie.split(";");
    const token = tokens.find((token) => token.includes("accessToken"));

    if (!token) {
      return {
        redirect: {
          permanent: false,
          destination: "/",
        },
      };
    }
    return await ssp(ctx);
  };
};

export { requireAuth };
