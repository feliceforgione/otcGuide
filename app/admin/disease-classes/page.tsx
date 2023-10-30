import { Link } from "@/app/components/";
import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import DiseaseClassesNavbar from "./navbar";
import { disease_class } from "@prisma/client";

interface Props {
  searchParams: {
    disabled?: string;
  };
}

async function DiseaseClasses({ searchParams }: Props) {
  const { disabled } = searchParams;
  let disable;

  const columns: {
    label: string;
    accessor: keyof disease_class;
    classnames?: string;
  }[] = [
    { label: "Name", accessor: "name" },
    {
      label: "Alias Name",
      accessor: "aliasname",
      classnames: "hidden md:table-cell",
    },
    {
      label: "Description",
      accessor: "description",
      classnames: "hidden md:table-cell",
    },
    {
      label: "Image",
      accessor: "buttonimage",
      classnames: "hidden md:table-cell",
    },
    { label: "Order", accessor: "order" },
    { label: "Show", accessor: "show" },
    { label: "Disabled", accessor: "disable" },
  ];

  if (disabled) {
    disable = ["0", "1"].includes(disabled) && disabled === "1";
  }

  const diseaseClasses = await prisma.disease_class.findMany({
    where: {
      disable,
    },
  });

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
            <Table.ColumnHeaderCell>Disabled</Table.ColumnHeaderCell>
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
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
}

export const dynamic = "force-dynamic";

export default DiseaseClasses;
