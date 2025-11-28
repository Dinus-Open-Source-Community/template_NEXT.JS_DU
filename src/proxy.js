import { NextResponse } from "next/server"; // Import NextResponse untuk mengontrol response di middleware
import jwt from "jsonwebtoken";

// Middleware akan berjalan untuk setiap request sebelum masuk ke route tujuan
export function proxy(request) {
  const { pathname } = request.nextUrl; // Ambil path dari request
  // Daftar path publik yang tidak butuh autentikasi
  const publicPaths = [
    "/",
    "/login",
    "/register",
    "/api/login",
    "/api/register",
  ];

  console.log("Middleware aktif untuk path:", pathname);

  // Jika path yang diakses ada di daftar publicPaths → lanjutkan tanpa cek auth
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // Ambil header Authorization dari request
  const authHeader = request.headers.get("authorization");

  // Jika tidak ada Authorization atau formatnya salah → unauthorized

  if (
    !authHeader ||
    !authHeader.startsWith("Bearer ") ||
    authHeader.split(" ").length !== 2
  ) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 },
    );
  }

  // Contoh validasi token sederhana:
  // Jika token setelah "Bearer " adalah "true" → lanjutkan
  // if (authHeader.split(" ")[1] === "true") {
  // return NextResponse.next();
  // } else {
  // Jika token tidak valid → return response 403 Forbidden`
  // return NextResponse.json(
  // { success: false, message: "Forbidden" },
  // { status: 403 },
  // );
  // }

  // take the token from the header
  const token = authHeader.split(" ")[1];
  try {
    // verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // set datanya ke request header
    request.headers.set("user_id", decoded.id);

    return NextResponse.next();
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Forbidden" },
      { status: 401 },
    );
  }
}

// Config middleware: matcher menentukan request mana saja yang akan dicegat```
export const config = {
  matcher: [
    // Semua route kecuali api default, file static, dan favicon
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    // Semua API route juga kena middleware
    "/api/:path*",
  ],
};
