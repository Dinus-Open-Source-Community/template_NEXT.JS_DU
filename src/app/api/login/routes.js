import prisma from '@/utility/db/prisma';
import bcrypt from 'bcrypt'

export async function POST(request) {
    const body = await request.json();
    const { email, password } = body;

    const userData = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    const isValid = await bcrypt.compare(password, userData.password);

    if (isValid) {
        return new Response(JSON.stringify({
            success: true,
            data: {
                id: userData.id,
                name: userData.name,
                email: userData.email,
            }
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } else {
        return new Response(JSON.stringify({
            success: false,
            data: null,
        }), {
            status: 401,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}