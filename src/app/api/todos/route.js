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
  try {
    const body = await request.json();
    console.log("POST body received:", body);

    const { title, userId } = body;

    if (!title || !userId) {
      return new Response(JSON.stringify({ success: false, message: "Title atau userId kosong" }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const userData = await prisma.user.findUnique({ where: { id: Number(userId) } });
    console.log("Found user:", userData);

    if (!userData) {
      return new Response(JSON.stringify({ success: false, message: "User tidak ditemukan" }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }

    const todoData = await prisma.todo.create({
      data: {
        title,
        completed: false,
        userId: userData.id,
      },
    });

    console.log("Created todo:", todoData);

    return new Response(JSON.stringify({ success: true, data: todoData }), { status: 201, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    console.error("POST error:", err);
    return new Response(JSON.stringify({ success: false, message: err.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
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
