import prisma from '@/utility/db/prisma.js' // Import Prisma client untuk akses database

// Handler untuk request HTTP GET
export async function GET(request) {
    // Ambil query parameter dari URL (contoh: /api/todo?userid=1)
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userid'); // Ambil nilai "userid"

    // Query database: cari semua todo dengan field userId = userId
    const todos = await prisma.todo.findMany({
        where: { userId: Number(userId) }
    });

    // Return response JSON berisi daftar todo
    return new Response(JSON.stringify({
        success: true,
        data: todos.map((data) => ({
            id: data.id,               // ID todo
            title: data.title,         // Judul todo
            completed: data.completed, // Status todo (selesai/belum)
            createdAt: data.createdAt, // Waktu pembuatan todo
            userId: data.userId,       // ID user yang punya todo
        }))
    }), {
        status: 200, // OK
        headers: { 'Content-Type': 'application/json' }
    });
}


export async function POST(request) {
    // Taruh Potongan Kode yang sesuai di sini (berada pada file puzzle.txt)
}

export async function PUT(request) {
    // Taruh Potongan Kode yang sesuai di sini (berada pada file puzzle.txt)
}

export async function DELETE(request) {
    // Taruh Potongan Kode yang sesuai di sini (berada pada file puzzle.txt)
}
