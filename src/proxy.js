import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function proxy(request) {
  const { pathname } = request.nextUrl;

  // 1. Path yang bebas akses
  const isApi = pathname.startsWith("/api");
  const publicPages = ["/login", "/register"];
  const publicApi = ["/api/login", "/api/register"];

  console.log(`Middleware cek path: ${pathname}`);

  // Bypass halaman publik
  if (publicPages.includes(pathname) || publicApi.includes(pathname)) {
    return NextResponse.next();
  }

  // 2. AMBIL TOKEN (Hybrid: Header untuk API, Cookie untuk Web)
  let token;

  // Cek Header (Authorization: Bearer xyz)
  const authHeader = request.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  // Cek Cookie (Jika header kosong)
  if (!token) {
    const cookieToken = request.cookies.get("token"); // Ambil cookie bernama 'token'
    if (cookieToken) {
      token = cookieToken.value;
    }
  }

  // 3. JIKA TOKEN KOSONG
  if (!token) {
    if (isApi) {
      return NextResponse.json({ success: false, message: "Unauthorized: No Token" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 4. VERIFIKASI TOKEN (Pakai jsonwebtoken)
  try {
    // jwt.verify akan throw error jika token invalid/expired
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Token valid! Lanjut...
    const response = NextResponse.next();
    
    // Opsional: Kirim data user ke backend lewat header baru
    response.headers.set("user_id", decoded.id); 
    response.headers.set("user_email", decoded.email);

    return response;

  } catch (err) {
    console.error("JWT Error:", err.message);

    if (isApi) {
      return NextResponse.json({ success: false, message: "Unauthorized: Invalid Token" }, { status: 401 });
    }
    // Jika token expired/salah saat buka web, lempar ke login
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  // Matcher standar (exclude static files)
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};