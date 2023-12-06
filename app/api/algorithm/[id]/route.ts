import authOptions from "@/app/auth/authOptions";
import { diseaseClassSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const algorithmQuestion = await prisma.algorithm_questions.findFirst({
    where: {
      algorithm_question_id: parseInt(params.id),
    },
  });

  return NextResponse.json(algorithmQuestion, { status: 200 });
}
