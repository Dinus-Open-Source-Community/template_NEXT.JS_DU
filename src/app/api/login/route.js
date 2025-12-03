import { prisma } from "../../../../lib/prisma";
import bcrypt from "bcrypt"; // Import bcrypt untuk hashing & validasi password
import jwt from "jsonwebtoken";

// Handler untuk request HTTP POST
export async function POST(request) {
  // Ambil body JSON dari request
  const body = await request.json();
  const { email, password } = body; // Destruktur email & password

  // Cari user berdasarkan email di database
  const userData = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  // Jika user ditemukan
  if (userData) {
    // Mengecek apakah password input sama dengan hash di database
    const isValid = await bcrypt.compare(password, userData.password);

    if (isValid) {
      // Jika password cocok → login sukses
      // tambahkan jwt token ke header
      const token = jwt.sign(
        { id: userData.id, email: userData.email },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h", // jwt expired in 1 hour
        },
      );
      return new Response(
        JSON.stringify({
          success: true,
          message: "Login sukses",
          data: {
            id: userData.id, // ID user
          },
          // token: token,
        }),
        {
          status: 200, // OK
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
    } else {
      // Jika password salah → login gagal
      return new Response(
        JSON.stringify({
          success: false,
          data: null,
        }),
        {
          status: 401, // Unauthorized
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }
    // Jika user tidak ditemukan
  } else {
    return new Response(
      JSON.stringify({
        success: false,
        data: null,
      }),
      {
        status: 401, // Unauthorized
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}
