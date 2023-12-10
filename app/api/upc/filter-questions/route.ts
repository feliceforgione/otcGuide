import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("upcs");

  const upcs = await prisma.v_upc_filterquestions.findMany({
    select: {
      upc: true,
      filter_question_id: true,
      question: true,
    },
    where: {
      upc: {
        in: id?.split(","),
      },
      question: {
        not: null,
      },
    },
  });

  return NextResponse.json(upcs, { status: 200 });
}
