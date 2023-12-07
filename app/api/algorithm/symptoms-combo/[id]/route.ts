import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { searchParams } = new URL(request.url);
  const combo = searchParams.get("combo");
  if (!combo) {
    return NextResponse.json(null, { status: 400 });
  }
  const nextAlgorithm = await prisma.algorithm_symptom_combos.findFirst({
    where: {
      algorithm_question_id: parseInt(params.id),
      combination: combo,
    },
  });

  return NextResponse.json(nextAlgorithm, { status: 200 });
}
