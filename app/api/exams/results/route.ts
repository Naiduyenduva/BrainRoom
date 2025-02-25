import prisma from "@/app/lib/prismadb"
import { NextRequest, NextResponse } from "next/server"
import { useSession } from "next-auth/react";

export async function GET (req:NextRequest) {
    const {data} = useSession();
    console.log(data)
    try {
        const results = await prisma.attempt.findMany({})
        return NextResponse.json({message: "user found"},{status: 200})
    } catch (error) {
        return NextResponse.json({message: "Internal server error",error},{status: 500})
    }
}