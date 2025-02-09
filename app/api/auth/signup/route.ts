import { NextRequest,NextResponse } from "next/server"
import prisma from "@/app/lib/prismadb";
import bcrypt from 'bcrypt';


export async function POST (req:NextRequest) {
    const body = await req.json();
    const hashedpass = await bcrypt.hash(body.password,10);

    const userdata = await prisma.user.create({
        data: {
            username: body.username,
            email: body.email,
            password: hashedpass
        }
    })
    console.log(userdata)
}