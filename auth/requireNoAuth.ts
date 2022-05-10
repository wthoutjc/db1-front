import { GetServerSideProps, GetServerSidePropsContext } from "next";

const requireNoAuth = (ssp: GetServerSideProps) => {
  return async (ctx: GetServerSidePropsContext) => {
    const { req } = ctx;

    if (req.headers.cookie) {
      const tokens = req.headers.cookie.split(";");
      const token = tokens.find((token) => token.includes("accessToken"));

      if (token) {
        return {
          redirect: {
            permanent: false,
            destination: "/home",
          },
        };
      }
    }
    return await ssp(ctx);
  };
};

export { requireNoAuth };
