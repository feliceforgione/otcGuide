import authOptions from "@/app/auth/authOptions";
import { diseaseClassSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const exclusionQuestions = await prisma.exclusion_questions.findMany({
    where: {
      disease_subclass_id: parseInt(params.id),
    },
  });

  return NextResponse.json(exclusionQuestions, { status: 200 });
}
