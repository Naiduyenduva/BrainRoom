    import { NextRequest,NextResponse } from "next/server";
    import prisma from "@/app/lib/prismadb";

    export async function POST (req:NextRequest) {
        try {
            const { category, difficulty, title, description } = await req.json();

            const test = await prisma.testModel.create({
                data: {
                    category: category,
                    difficulty: difficulty,
                    title: title,
                    description: description
                }
            })
            return NextResponse.json({
                message: "test created successfully",test: test
            })
        } catch (error) {
            return NextResponse.json({
                message: "Internal server error"
            },{
                status: 500
            })
        }

    }