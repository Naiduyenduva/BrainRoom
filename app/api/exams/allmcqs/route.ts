import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb";

export async function POST (req: NextRequest) {
    try {
        const {testId} = await req.json();
        const questions = await prisma.mCQ.findMany({
            where: {
                testId: testId
            }
        })
        
        const count = await prisma.mCQ.count({
            where: {
                testId: testId
            }
        })
        return NextResponse.json({message: "All questions fetched", questions, count},{status: 200})
    } catch (error) {
        return NextResponse.json({message: "Internal server error"},{status: 500})
    }
}