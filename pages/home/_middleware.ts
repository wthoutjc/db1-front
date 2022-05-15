import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

const middleware = (req: NextRequest, ev: NextFetchEvent) => {
  const { accessToken = "" } = req.cookies;

  if (!accessToken) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
};

export { middleware };
