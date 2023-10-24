import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

function EditDiseaseClassButton({
  diseaseClassId,
}: {
  diseaseClassId: number;
}) {
  return (
    <Button>
      <Pencil2Icon />
      <Link href={`/admin/disease-classes/${diseaseClassId}/edit`}>
        Edit Disease Class
      </Link>
    </Button>
  );
}

export default EditDiseaseClassButton;
