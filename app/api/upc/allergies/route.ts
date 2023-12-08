import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("upcs");

  const upcs = await prisma.v_upc_medicalhistory.findMany({
    distinct: ["upc", "ingredient_id", "ingredient_broader_name"],
    select: {
      upc: true,
      ingredient_id: true,
      ingredient_broader_name: true,
    },
    where: {
      upc: {
        in: id?.split(","),
      },
      ingredient_hypoallergenic: 1,
    },
    orderBy: {
      ingredient_broader_name: "asc",
    },
  });

  return NextResponse.json(upcs, { status: 200 });
}
