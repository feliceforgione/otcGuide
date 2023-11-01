import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { Box, Flex, Grid, Heading } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { cache } from "react";
import DeleteDiseaseClassButton from "./DeleteDiseaseClassButton";
import DiseaseClassDetail from "./DiseaseClassDetail";
import EditDiseaseClassButton from "./EditDiseaseClassButton";

interface Props {
  params: { id: string };
}

const fetchDiseaseClass = cache((diseaseClassId: string) => {
  return prisma.disease_class.findUnique({
    where: { id: parseInt(diseaseClassId) },
  });
});

async function DiseaseClassDetailPage({ params }: Props) {
  const session = await getServerSession(authOptions);
  if (isNaN(parseInt(params.id))) notFound();
  const diseaseClass = await fetchDiseaseClass(params.id);

  if (!diseaseClass) notFound();

  return (
    <Box className="max-w-5xl">
      <Heading>{diseaseClass.name}</Heading>
      <Grid columns={{ initial: "1", md: "5" }} gap="5" className="my-5">
        <Box className="lg:col-span-4">
          <DiseaseClassDetail diseaseClass={diseaseClass} />
        </Box>
        {session && (
          <Box>
            <Flex direction="column" gap="4">
              <EditDiseaseClassButton diseaseClassId={diseaseClass.id} />
              <DeleteDiseaseClassButton diseaseClassId={diseaseClass.id} />
            </Flex>
          </Box>
        )}
      </Grid>
    </Box>
  );
}

export async function generateMetadata({ params }: Props) {
  const diseaseClass = await fetchDiseaseClass(params.id);

  return {
    title: diseaseClass?.aliasname,
    description: "Details of disease class " + diseaseClass?.id,
  };
}

export default DiseaseClassDetailPage;
