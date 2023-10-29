import prisma from "@/prisma/client";
import { Box, Flex, Grid, Heading } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import DiseaseClassDetail from "./DiseaseClassDetail";
import EditDiseaseClassButton from "./EditDiseaseClassButton";
import DeleteDiseaseClassButton from "./DeleteDiseaseClassButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

interface Props {
  params: { id: string };
}

async function DiseaseClassDetailPage({ params }: Props) {
  const session = await getServerSession(authOptions);
  if (isNaN(parseInt(params.id))) notFound();
  const diseaseClass = await prisma.disease_class.findUnique({
    where: { id: parseInt(params.id) },
  });

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

export default DiseaseClassDetailPage;
