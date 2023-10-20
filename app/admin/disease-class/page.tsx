import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

function DiseaseClasses() {
  return (
    <div>
      <h1>Disease Classes</h1>
      <Button>
        <Link href="/admin/disease-class/new/">Add New Disease Class</Link>
      </Button>
    </div>
  );
}

export default DiseaseClasses;
