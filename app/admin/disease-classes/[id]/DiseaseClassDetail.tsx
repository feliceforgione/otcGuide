import { disease_class } from "@prisma/client";
import { Table } from "@radix-ui/themes";

function DiseaseClassDetail({ diseaseClass }: { diseaseClass: disease_class }) {
  return (
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
  );
}

export default DiseaseClassDetail;
