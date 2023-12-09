import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("upcs");

  const upcs = await prisma.v_upc_medicalhistory.findMany({
    select: {
      upc: true,
      medical_condition_id: true,
      medical_condition_layman_term: true,
    },
    where: {
      upc: {
        in: id?.split(","),
      },
      medical_condition_layman_term: {
        not: null,
      },
    },
  });

  return NextResponse.json(upcs, { status: 200 });
}
