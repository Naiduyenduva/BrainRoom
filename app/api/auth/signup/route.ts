import { NextRequest,NextResponse } from "next/server"
import prisma from "@/app/lib/prismadb";
import bcrypt from 'bcrypt';


export async function POST (req:NextRequest) {
    try {
    const body = await req.json();
    
    const existingUser = await prisma.user.findFirst({
        where: {
            email: body.email
        }
    })
    
    if (existingUser) {
        return NextResponse.json(
            { message: "User already exists" },
            { status: 400 }
        );
    }
    const hashedpass = await bcrypt.hash(body.password,10);

        const userdata = await prisma.user.create({
            data: {
                username: body.username,
                email: body.email,
                password: hashedpass
            }
        })
        console.log(userdata)
        return NextResponse.json(
            {message:"user created successfully", user: userdata },{ status: 201 }
        );

    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({
            message: "Internal server error"
        },{
            status: 500
        })
    }

}