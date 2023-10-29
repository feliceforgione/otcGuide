import authOptions from "@/app/auth/authOptions";
import { diseaseClassSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // protected route
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const validation = diseaseClassSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const diseaseClass = await prisma.disease_class.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!diseaseClass)
    return NextResponse.json(
      { error: "Invalid disease class" },
      { status: 404 }
    );

  const updatedDiseaseClass = await prisma.disease_class.update({
    where: { id: diseaseClass.id },
    data: {
      name: body.name,
      aliasname: body.aliasname,
      description: body.description,
      buttonimage: body.buttonimage,
      order: body.order,
    },
  });

  return NextResponse.json(updatedDiseaseClass);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // protected route
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const diseaseClass = await prisma.disease_class.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!diseaseClass)
    return NextResponse.json(
      { error: "Invalid disease class" },
      { status: 404 }
    );

  await prisma.disease_class.delete({
    where: { id: parseInt(params.id) },
  });

  return NextResponse.json({});
}
