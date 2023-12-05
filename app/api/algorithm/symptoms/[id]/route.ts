import prisma from "@/prisma/client";

import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const symptoms = await prisma.algorithm_symptom_set.findMany({
    select: {
      algorithm_symptom_set_id: true,
      algorithm_question_id: true,
      symptom_type_id: true,
      symptom_id: true,
      symptom: {
        select: {
          symptom_name: true,
        },
      },
    },
    where: {
      algorithm_question_id: parseInt(params.id),
    },
    orderBy: {
      symptom_type_id: "asc",
    },
  });

  return NextResponse.json(symptoms, { status: 200 });
}
