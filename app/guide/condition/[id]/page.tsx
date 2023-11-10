import prisma from "@/prisma/client";
import { Grid, Heading } from "@radix-ui/themes";
import SubClassCard from "./SubClassCard";

interface Props {
  params: { id: string };
}

async function DiseaseSubClassesSelection({ params }: Props) {
  const diseaseSubClasses = await prisma.disease_subclass.findMany({
    where: {
      disease_class_id: parseInt(params.id),
      disease_subclass_disable: false,
    },
  });
  return (
    <>
      <Heading className="pageHeading">
        What is the patient looking to treat?
      </Heading>
      <Grid columns="2" gap="3" width="auto">
        {diseaseSubClasses.map((diseaseClass) => (
          <SubClassCard
            key={diseaseClass.disease_subclass_id}
            id={diseaseClass.disease_subclass_id}
            title={diseaseClass.disease_subclass_name!}
            description={diseaseClass.disease_subclass_description || undefined}
            image={diseaseClass.image!}
          />
        ))}
      </Grid>
    </>
  );
}

export default DiseaseSubClassesSelection;
