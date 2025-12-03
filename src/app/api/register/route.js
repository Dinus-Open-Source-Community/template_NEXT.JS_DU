import { prisma } from "../../../../lib/prisma";
import bcrypt from "bcrypt";

// Handler untuk request HTTP POST (registrasi user baru)
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    // Validasi input sederhana
    if (!name || !email || !password) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Nama, email, dan password wajib diisi",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    // Cek apakah email sudah ada
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Email sudah terdaftar",
        }),
        { status: 409, headers: { "Content-Type": "application/json" } }, // 409 Conflict
      );
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // Simpan user baru
    const newUser = await prisma.user.create({
      data: { name, email, password: hashPassword },
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Registrasi berhasil",
        data: { id: newUser.id, name: newUser.name, email: newUser.email },
      }),
      { status: 201, headers: { "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("Error saat registrasi:", err);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Terjadi kesalahan server",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
