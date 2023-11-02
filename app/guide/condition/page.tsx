import prisma from "@/prisma/client";
import { Box, Grid, Heading } from "@radix-ui/themes";
import React from "react";
import ClassCard from "./_components/ClassCard";
import Link from "next/link";

async function DiseaseClassesSelection() {
  const diseaseClasses = await prisma.disease_class.findMany();
  return (
    <>
      <Heading>What is the patient looking to treat?</Heading>
      <Grid columns="3" gap="3" width="auto">
        {diseaseClasses.map((diseaseClass) => (
          <Link key={diseaseClass.id} href={`./condition/${diseaseClass.id}`}>
            <ClassCard
              title={diseaseClass.aliasname!}
              description={diseaseClass.description!}
            />
          </Link>
        ))}
      </Grid>
    </>
  );
}

export default DiseaseClassesSelection;
