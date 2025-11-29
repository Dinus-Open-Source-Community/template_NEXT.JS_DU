import prisma from "@/utility/db/prisma.js";
import jwt from "jsonwebtoken";

// Fungsi bantu untuk ambil userId dari token
async function getUserFromToken(request) {
  const authHeader = request.headers.get("Authorization") || "";
  const token = authHeader.replace("Bearer ", "");
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded?.id || null;
  } catch (err) {
    console.error("Invalid token:", err);
    return null;
  }
}

// GET: ambil todos user
export async function GET(request) {
  const userId = await getUserFromToken(request);
  if (!userId) {
    return new Response(JSON.stringify({ success: false, message: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const todos = await prisma.todo.findMany({ where: { userId: Number(userId) } });
    return new Response(JSON.stringify({ success: true, data: todos }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ success: false, message: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// POST: tambah todo baru
export async function POST(request) {
  // Taruh Potongan Kode yang sesuai di sini (berada pada file puzzle.txt)
  const body = await request.json();
  const { title, userId } = body;

  const userData = await prisma.user.findUnique({
    where: { id: userId },
  });

  const todoData = await prisma.todo.create({
    data: {
      title: title,
      completed: false,
      userId: userData.id,
    },
  });

  return new Response(
    JSON.stringify({
      success: true,
      data: {
        id: todoData.id,
        title: todoData.title,
        completed: todoData.completed,
        createdAt: todoData.createdAt,
        userId: todoData.userId,
      },
    }),
    {
      status: 201,
      headers: { "Content-Type": "application/json" },
    },
  );
}

// PUT: update todo
export async function PUT(request) {
  const userId = await getUserFromToken(request);
  if (!userId) {
    return new Response(JSON.stringify({ success: false, message: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const { id, title, completed } = await request.json();

    const todoData = await prisma.todo.updateMany({
      where: { id: Number(id), userId: Number(userId) },
      data: { title, completed },
    });

    if (todoData.count === 0) {
      return new Response(JSON.stringify({ success: false, message: "Todo tidak ditemukan" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, data: { id, title, completed } }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ success: false, message: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// DELETE: hapus todo
export async function DELETE(request) {
  const userId = await getUserFromToken(request);
  if (!userId) {
    return new Response(JSON.stringify({ success: false, message: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const deleted = await prisma.todo.deleteMany({
      where: { id: Number(id), userId: Number(userId) },
    });

    if (deleted.count === 0) {
      return new Response(JSON.stringify({ success: false, message: "Todo tidak ditemukan" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, data: null }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ success: false, message: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
