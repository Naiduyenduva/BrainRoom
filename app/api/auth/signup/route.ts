import { NextRequest,NextResponse } from "next/server"
import prisma from "@/app/lib/prismadb";
import bcrypt from 'bcrypt';


export async function POST (req:NextRequest) {
    try {
    const { username, password, email} = await req.json();
    
    const existingUser = await prisma.user.findFirst({
        where: {
            email: email
        }
    })
    
    if (existingUser) {
        return NextResponse.json(
            { message: "User already exists" },
            { status: 400 }
        );
    }
    const hashedpass = await bcrypt.hash(password,10);

        const userdata = await prisma.user.create({
            data: {
                username: username,
                email: email,
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