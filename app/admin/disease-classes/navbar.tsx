import { Heading, Button, Box } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import DiseaseClassDisabledFilter from "./DiseaseClassDisabledFilter";

function DiseaseClassesNavbar() {
  return (
    <>
      <Heading as="h1">Disease Classes</Heading>
      <div className="my-3 flex justify-between">
        <Button>
          <Link href="/admin/disease-classes/new/">Add New Disease Class</Link>
        </Button>
        <Box>
          <DiseaseClassDisabledFilter />
        </Box>
      </div>
    </>
  );
}

export default DiseaseClassesNavbar;
