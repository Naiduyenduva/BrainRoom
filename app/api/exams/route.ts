import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb";

export async function GET () {
    try {
        const tests = await prisma.testModel.findMany({});

        return NextResponse.json({ message: "All tests",tests },{ status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Internal server error" },{ status: 500 });
    }
}