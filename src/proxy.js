import { NextResponse } from "next/server"; // Import NextResponse untuk mengontrol response di middleware
import jwt from "jsonwebtoken";

// Middleware akan berjalan untuk setiap request sebelum masuk ke route tujuan
export function proxy(request) {
  const { pathname } = request.nextUrl; // Ambil path dari request

  // Daftar path publik yang tidak butuh autentikasi
  const isApi = pathname.startsWith("/api");
  const publicPages = ["/login", "/register"];
  const publicApi = ["/api/login", "/api/register"];

  console.log("Middleware aktif untuk path:", pathname);

  // jika public page diizinkan atau bisa langsung di akses
  if (!isApi && publicPages.includes(pathname)) {
    return NextResponse.next();
  }

  // jika public api diizinkan atau bisa langsung di akses
  if (isApi && publicApi.includes(pathname)) {
    return NextResponse.next();
  }

  // Ambil header Authorization dari request -> ambil token
  const authHeader = request.headers.get("authorization");

  // Jika tidak ada Authorization atau formatnya salah → unauthorized

  if (
    !authHeader ||
    !authHeader.startsWith("Bearer ") ||
    authHeader.split(" ").length !== 2
  ) {
    if (isApi) {
      // jika yang di akses adalah api
      return NextResponse.json(
        // -> return json dengan message Unauthorized
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    // jika yang diakses bukan api tapi page -> redirect ke login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // validasi token
  const token = authHeader.split(" ")[1];
  try {
    // verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // set datanya ke request header
    const response = NextResponse.next();
    response.headers.set("user_id", decoded.id);

    return response;
  } catch (err) {
    if (isApi) {
      // jika yang di akses adalah api
      return NextResponse.json(
        // -> return json dengan message Unauthorized
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    // jika yang diakses bukan api tapi page -> redirect ke login
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// Config middleware: matcher menentukan request mana saja yang akan dicegat```
export const config = {
  matcher: [
    // Semua route kecuali api default, file static, dan favicon
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

