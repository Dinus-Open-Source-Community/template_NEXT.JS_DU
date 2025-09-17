import prisma from '@/utility/db/prisma.js'

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const todos = await prisma.todo.findMany({
        where: {
            userId: userId
        }
    });

    return new Response(JSON.stringify({
        success: true,
        data: todos.map((data) => {
            return {
                id: data.id,
                title: data.title,
                completed: data.completed,
                createdAt: data.createdAt,
                userId: data.userId,
            }
        })
    }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export async function POST(request) {
    const body = await request.json();
    const { title, userId } = body;

    const userData = await prisma.user.findUnique({
        where: {
            id: userId
        }
    });
    const todoData = await prisma.todo.create({
        data: {
            title: title,
            completed: false,
            userId: userData.id,
        }
    });

    return new Response(JSON.stringify({
        success: true,
        data: {
            id: todoData.id,
            title: todoData.title,
            completed: todoData.completed,
            createdAt: todoData.createdAt,
            userId: todoData.userId,
        }
    }), {
        status: 201,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export async function PUT(request) {
    const body = await request.json();
    const { id, title, completed } = body;

    const todoData = await prisma.todo.update({
        where: {
            id: id
        },
        data: {
            title: title,
            completed: completed,
        }
    });

    return new Response(JSON.stringify({
        success: true,
        data: {
            id: todoData.id,
            title: todoData.title,
            completed: todoData.completed,
            createdAt: todoData.createdAt,
            userId: todoData.userId,
        }
    }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export async function DELETE(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    await prisma.todo.delete({
        where: {
            id: id
        }
    });

    return new Response(JSON.stringify({
        success: true,
        data: null,
    }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    }); 
}