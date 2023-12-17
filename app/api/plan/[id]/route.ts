import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { searchParams } = new URL(request.url);
  const upcs = searchParams.get("upcs");
  const plan = await prisma.treatment_plan.findFirst({
    select: {
      plan_name: true,
      tabs_num: true,
      tab3_label: true,
      tab4_label: true,
      tab5_label: true,

      upcs: {
        where: {
          upc: {
            in: upcs?.split(","),
          },
        },
        include: {
          upc_product: {
            include: {
              brand: true,
              images: true,
            },
          },
        },
        orderBy: [{ treatment_line: "asc" }, { upc_order: "asc" }],
      },
      treatment_advice: {
        select: {
          advice_id: true,
          advice_type: true,
          advice_order: true,
          treatment_advice: {
            select: {
              title: true,
              text: true,
              list: true,
            },
          },
        },
        orderBy: [
          {
            advice_type: "asc",
          },
          {
            advice_order: "asc",
          },
        ],
      },
    },
    where: {
      treatment_plan_id: parseInt(params.id),
    },
  });

  return NextResponse.json(plan, { status: 200 });
}
