import { NextResponse } from "next/server";

export function middleware(request) {

  const loginPath = ["/login", "/api/login"]

  //Kalau ada url dari array login path, bisa langsung masuk tanpa perlu access token
  if(loginPath.some((value) => value === request.nextUrl.pathname)){
      return NextResponse.next();
  } else {
  //Kalau gaada url dari loginPath, berarti kita perlu access token, get access token & verify token pake jwt
    const accessToken = request.cookies.get("accessToken")

    if(accessToken) {

      return NextResponse.next();

    } else {
        return NextResponse.redirect(new URL("/login", request.url))
    }

  }

}

export const config = {
  matcher: ["/login", "/api/:function", "/api/books/:function", "/"]
}