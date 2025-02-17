
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import prisma from "@/app/lib/prismadb"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export async function createProblem(data:any) {
  try {
    console.log("hii")
    const test = await prisma.testModel.create({
      data,
    });
    return test;
  } catch (e) {
    return null;
  }
}