import { Heading, Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

function DiseaseClassesNavbar() {
  return (
    <>
      <Heading as="h1">Disease Classes</Heading>
      <div className="my-3">
        <Button>
          <Link href="/admin/disease-classes/new/">Add New Disease Class</Link>
        </Button>
      </div>
    </>
  );
}

export default DiseaseClassesNavbar;
