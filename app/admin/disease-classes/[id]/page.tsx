import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: { id: string };
}

async function DiseaseClassDetailPage({ params }: Props) {
  if (isNaN(parseInt(params.id))) notFound();
  const diseaseClass = await prisma.disease_class.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!diseaseClass) notFound();

  return <div>DiseaseClassDetailPage</div>;
}

export default DiseaseClassDetailPage;
