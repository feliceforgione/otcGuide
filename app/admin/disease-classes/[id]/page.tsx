import prisma from "@/prisma/client";
import { Box, Button, Grid, Heading, Table } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import { Pencil2Icon } from "@radix-ui/react-icons";
import Link from "next/link";

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
        <Table.Root variant="surface">
          <Table.Body>
            <Table.Row>
              <Table.RowHeaderCell className="!bg-blue-50 w-4/12">
                Alias
              </Table.RowHeaderCell>
              <Table.Cell>{diseaseClass.aliasname}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.RowHeaderCell className="!bg-blue-50">
                Description
              </Table.RowHeaderCell>
              <Table.Cell>{diseaseClass.description}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.RowHeaderCell className="!bg-blue-50">
                Image
              </Table.RowHeaderCell>
              <Table.Cell>{diseaseClass.buttonimage}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.RowHeaderCell className="!bg-blue-50">
                Properties
              </Table.RowHeaderCell>
              <Table.Cell className="space-x-10">
                <span>Order: {diseaseClass.order}</span>
                <span>Disable: {String(diseaseClass.disable)}</span>
                <span>Show: {String(diseaseClass.show)}</span>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>
        <Box>
          <Button>
            <Pencil2Icon />
            <Link href={`/admin/disease-classes/${diseaseClass.id}/edit`}>
              Edit Disease Class
            </Link>
          </Button>
        </Box>
      </Grid>
    </Box>
  );
}

export default DiseaseClassDetailPage;
