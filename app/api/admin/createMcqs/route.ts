import prisma from "@/app/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST (req:NextRequest) {
    try {
        const { testId, question, options, answer } = await req.json();

        const test = await prisma.testModel.findUnique({
            where: {
                id: testId
            },
        });
        if(!test) {
            return NextResponse.json({ message: "Test not found" },{ status: 404 });
        }
        const newMCQ = await prisma.mCQ.create({
            data: {
                testId,
                question,
                options,
                correctOption: answer
            }
        });

        return NextResponse.json({ message: "MCQ Added" },{ status: 201 });

    } catch (error) {
        return NextResponse.json({ message: "Internal server error",error }, { status: 500});
    }
}