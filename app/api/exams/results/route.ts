import prisma from "@/app/lib/prismadb"
import { NextRequest, NextResponse } from "next/server"

export async function POST (req:NextRequest) {
    const { userId } = await req.json();
    try {
        const results = await prisma.attempt.findMany({
            where: {
                userId: userId
            },select: {
                testId: true,
                score: true,
                totalQuestions: true,
                test: {
                    select: {
                        title:true
                    }
                }
            }
        })
        return NextResponse.json({message: "user found",results},{status: 200})
    } catch (error) {
        return NextResponse.json({message: "Internal server error",error},{status: 500})
    }
}