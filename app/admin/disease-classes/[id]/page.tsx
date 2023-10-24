import prisma from "@/prisma/client";
import { Box, Grid, Heading } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import DiseaseClassDetail from "./DiseaseClassDetail";
import EditDiseaseClassButton from "./editDiseaseClassButton";

interface Props {
  params: { id: string };
}

async function DiseaseClassDetailPage({ params }: Props) {
  if (isNaN(parseInt(params.id))) notFound();
  const diseaseClass = await prisma.disease_class.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!diseaseClass) notFound();

  return (
    <Box className="max-w-5xl">
      <Heading>{diseaseClass.name}</Heading>
      <Grid columns={{ initial: "1", lg: "2" }} gap="5" className="my-5">
        <Box>
          <DiseaseClassDetail diseaseClass={diseaseClass} />
        </Box>
        <Box>
          <EditDiseaseClassButton diseaseClassId={diseaseClass.id} />
        </Box>
      </Grid>
    </Box>
  );
}

export default DiseaseClassDetailPage;
