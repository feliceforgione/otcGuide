import { Button } from "@radix-ui/themes";
import React from "react";

function DeleteDiseaseClassButton({
  diseaseClassId,
}: {
  diseaseClassId: number;
}) {
  return <Button color="red">Delete Disease Class</Button>;
}

export default DeleteDiseaseClassButton;
