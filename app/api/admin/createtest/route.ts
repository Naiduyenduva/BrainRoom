    import { NextRequest,NextResponse } from "next/server";
    import prisma from "@/app/lib/prismadb";

    export async function POST (req:NextRequest) {
        try {
            const body = await req.json();

            const test = await prisma.testModel.create({
                data: {
                    category: body.category,
                    difficulty: body.difficulty,
                    title: body.title,
                    description: body.description
                }
            })
            console.log(test,"test")
            return NextResponse.json({
                message: "test created successfully",test: test
            })
        } catch (error) {
            console.error("Error creating user:", error);
            return NextResponse.json({
                message: "Internal server error"
            },{
                status: 500
            })
        }

    }