import bcrypt from 'bcrypt'
import prisma from '@/utility/db/prisma'

async function main() {
    const hashPassword = await bcrypt.hash("dupass123", 10)

    const userData = await prisma.user.create({
        data: {
            name: "User DU",
            email: "duemail@gmail.com",
            password: hashPassword,
        }
    })

    await prisma.todo.createMany({
        data: [
            { title: "Belajar Prisma", completed: false, userId: userData.id },
            { title: "Setup project Next.js", completed: true, userId: userData.id },
            { title: "Integrasi dengan MySQL", completed: false, userId: userData.id },
            { title: "Bikin halaman login", completed: false, userId: userData.id },
            { title: "Tambahkan fitur register", completed: true, userId: userData.id },
            { title: "Testing API dengan Postman", completed: false, userId: userData.id },
            { title: "Deploy ke Vercel", completed: false, userId: userData.id },
            { title: "Tambah fitur Todo List", completed: true, userId: userData.id },
            { title: "Refactor code backend", completed: false, userId: userData.id },
            { title: "Tulis dokumentasi project", completed: false, userId: userData.id },
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
