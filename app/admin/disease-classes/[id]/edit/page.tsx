import { notFound } from "next/navigation";
import DiseaseClassForm from "../../_components/DiseaseClassForm";
import prisma from "@/prisma/client";

interface Props {
  params: { id: string };
}

async function EditDiseaseClassPage({ params }: Props) {
  if (isNaN(parseInt(params.id))) notFound();
  const diseaseClass = await prisma.disease_class.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!diseaseClass) notFound();

  return <DiseaseClassForm diseaseClass={diseaseClass} />;
}

export default EditDiseaseClassPage;
