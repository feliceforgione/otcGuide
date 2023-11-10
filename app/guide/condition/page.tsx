import prisma from "@/prisma/client";
import { Grid, Heading } from "@radix-ui/themes";
import ClassCard from "./ClassCard";
import Reset from "./Reset";

async function DiseaseClassesSelection() {
  const diseaseClasses = await prisma.disease_class.findMany({
    where: {
      show: true,
    },
    orderBy: {
      order: "asc",
    },
  });
  return (
    <>
      <Reset />
      <Heading className="pageHeading">
        What is the patient looking to treat?
      </Heading>
      <Grid columns="3" gap="3" width="auto">
        {diseaseClasses.map((diseaseClass) => (
          <ClassCard
            key={diseaseClass.id}
            id={diseaseClass.id}
            title={diseaseClass.aliasname!}
            description={diseaseClass.description!}
            image={diseaseClass.buttonimage!}
          />
        ))}
      </Grid>
    </>
  );
}

export default DiseaseClassesSelection;
