import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

// Next Auth
import { getToken } from "next-auth/jwt";

const middleware = async (req: NextRequest, ev: NextFetchEvent) => {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!session) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
};

export { middleware };
