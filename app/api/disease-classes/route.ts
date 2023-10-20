import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { z } from "zod";

const createDiseaseClassSchema = z.object({
  name: z.string().min(1).max(255),
  aliasname: z.string().min(1).max(255).nullable(),
  description: z.string().min(1).max(255).nullable(),
  buttonimage: z.string().min(1).max(255).nullable(),
  order: z.number().int().nullable(),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createDiseaseClassSchema.safeParse(body);
  console.log(validation);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

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
