import prisma from "@/utility/db/prisma"; // Import Prisma client untuk interaksi database
import bcrypt from "bcrypt"; // Import bcrypt untuk hashing password

// Handler untuk request HTTP POST (registrasi user baru)
export async function POST(request) {
    // Ambil body JSON dari request
    const body = await request.json();
    const { name, email, password } = body; // Destruktur data user (name, email, password)

    // Hash password sebelum disimpan ke database (salt round = 10)
    const hashPassword = await bcrypt.hash(password, 10);

    try {
        // Simpan user baru ke database
        await prisma.user.create({
            data: {
                name,               // Nama user
                email,              // Email user
                password: hashPassword // Password sudah di-hash
            }
        });

        // Jika berhasil → kirim response sukses dengan status 201 (Created)
        return new Response(JSON.stringify({
            success: true,
            data: null,
        }), {
            status: 201, // Created
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch {
        // Jika terjadi error (misalnya email sudah ada / DB error) → return response gagal
        return new Response(JSON.stringify({
            success: false,
            data: null,
        }), {
            status: 500, // Internal Server Error
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
