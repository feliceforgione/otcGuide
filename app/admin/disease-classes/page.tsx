import { Link } from "@/app/components/";
import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import DiseaseClassesNavbar from "./navbar";

async function DiseaseClasses() {
  const diseaseClasses = await prisma.disease_class.findMany();

  return (
    <div>
      <DiseaseClassesNavbar />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Alias Name
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Description
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Image
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Order</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Show</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Disable</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {diseaseClasses.map((disease) => (
            <Table.Row key={disease.id}>
              <Table.Cell>
                <Link href={`/admin/disease-classes/${disease.id}`}>
                  {disease.name}
                </Link>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {disease.aliasname}
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {disease.description}
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {disease.buttonimage}
              </Table.Cell>
              <Table.Cell>{disease.order}</Table.Cell>
              <Table.Cell>{String(disease.show)}</Table.Cell>
              <Table.Cell>{String(disease.disable)}</Table.Cell>
              <Table.Cell> Delete </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
}

export default DiseaseClasses;
