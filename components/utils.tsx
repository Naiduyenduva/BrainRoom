"use server"
import prisma from "@/app/lib/prismadb"
import { MCQ } from "@prisma/client"

export const createProblem = async() => {
    const problem = await prisma.MCQ.create({

    })
}