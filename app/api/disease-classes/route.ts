import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { createDiseaseClassSchema } from "@/app/validationSchemas";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createDiseaseClassSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newDiseaseClass = await prisma.disease_class.create({
    data: {
      name: body.name,
      aliasname: body.aliasname,
      description: body.description,
      buttonimage: body.buttonimage,
      order: body.order,
    },
  });

  return NextResponse.json(newDiseaseClass, { status: 201 });
}
