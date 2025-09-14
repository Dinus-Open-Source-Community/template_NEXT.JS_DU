import { PrismaClient } from '../prisma/generated/prisma/index.js'
const prisma = new PrismaClient()

async function main() {
    await prisma.user.create({
        data: {
            name: "User DU",
            email: "duemail@gmail.com",
            password: "dupassword",
        }
    })

    await prisma.todo.createMany({
        data: [
            { title: "Belajar Prisma", completed: false, userId: 1 },
            { title: "Setup project Next.js", completed: true, userId: 1 },
            { title: "Integrasi dengan MySQL", completed: false, userId: 1 },
            { title: "Bikin halaman login", completed: false, userId: 1 },
            { title: "Tambahkan fitur register", completed: true, userId: 1 },
            { title: "Testing API dengan Postman", completed: false, userId: 1 },
            { title: "Deploy ke Vercel", completed: false, userId: 1 },
            { title: "Tambah fitur Todo List", completed: true, userId: 1 },
            { title: "Refactor code backend", completed: false, userId: 1 },
            { title: "Tulis dokumentasi project", completed: false, userId: 1 },
        ],
    })
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
