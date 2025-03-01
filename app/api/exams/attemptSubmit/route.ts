import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb";
export async function POST (req:NextRequest) {
    try {
        const { userId, testId, answers } = await req.json();

        const questions = await prisma.mCQ.findMany ({ where: { testId },select: { id:true,correctOption:true }})
        console.log(questions)
        if(!questions) {
            return NextResponse.json({message:"no questions"},{status:404})
        }
        let score = 0;
        questions.forEach((question) => {
            const userAnswer = answers.find((ans:any) => ans.questionId === question.id)
            if(userAnswer && userAnswer.selectedOption === question.correctOption) {
                score++;
            }
        });

        const updatedAttempt = await prisma.attempt.update({
            where: {
                userId_testId: { userId,testId }
            },
            data: {
                score
            },
        });
        return NextResponse.json({ message: "Test submitted",score,attempt:updatedAttempt },{ status: 200 })

    } catch (error) {
        return NextResponse.json({ message: "Internal server error", error },{ status: 500 });
    }
}