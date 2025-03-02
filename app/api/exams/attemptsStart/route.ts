import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb";
export async function POST (req: NextRequest) {
    try {
        const { userId, testId } = await req.json();

        const existingAttempt = await prisma.attempt.findUnique({
            where: {
                userId_testId: {userId,testId}
            },
        });

        if(existingAttempt) {
            return NextResponse.json({ message: "User already attempted the test" },{ status: 200 });
        }

        const totalQuestions = await prisma.mCQ.count({ where: { testId }});

        const attempt = await prisma.attempt.create({
            data: {
                userId,
                testId,
                score: 0,
                totalQuestions
            }
        })
        return NextResponse.json({ message: "attempt started "} ,{ status: 201 })
    } catch (error) {
        return NextResponse.json ({ message: "Internal server error",error}, { status: 500 })
    }
}