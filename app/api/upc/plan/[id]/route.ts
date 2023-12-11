import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!params.id) {
    return NextResponse.json(null, { status: 400 });
  }
  const upcs = await prisma.treatment_plan.findFirst({
    where: {
      treatment_plan_id: parseInt(params.id),
    },
    select: {
      upcs: {
        select: {
          upc: true,
        },
        where: {
          disable: false,
        },
      },
    },
  });

  return NextResponse.json(upcs, { status: 200 });
}
