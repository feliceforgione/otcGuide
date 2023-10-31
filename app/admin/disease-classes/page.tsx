import prisma from "@/prisma/client";
import { disease_class } from "@prisma/client";
import DataTableWithSorting from "../_components/DataTableWithSorting";
import DiseaseClassesNavbar from "./navbar";

interface Props {
  searchParams: {
    disabled?: string;
    orderBy?: keyof disease_class;
    sortOrder: "asc" | "desc";
  };
}

async function DiseaseClasses({ searchParams }: Props) {
  const columns: {
    label: string;
    accessor: keyof disease_class;
    classnames?: string;
  }[] = [
    { label: "Name", accessor: "name" },
    {
      label: "Alias Name",
      accessor: "aliasname",
      classnames: "hidden md:table-cell md:w-32",
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
    { label: "Order", accessor: "order", classnames: "w-20" },
    { label: "Show", accessor: "show", classnames: "w-20" },
    { label: "Disabled", accessor: "disable", classnames: "w-28" },
  ];

  const disable = ["0", "1"].includes(searchParams.disabled!)
    ? searchParams.disabled === "1"
    : undefined;

  const orderBy = columns
    .map((column) => column.accessor)
    .includes(searchParams.orderBy!)
    ? { [searchParams.orderBy!]: searchParams.sortOrder }
    : undefined;
  const diseaseClasses = await prisma.disease_class.findMany({
    where: {
      disable,
    },
    orderBy,
  });

  return (
    <div>
      <DiseaseClassesNavbar />
      <DataTableWithSorting
        data={diseaseClasses}
        columns={columns}
        idColumn="id"
        urlDetailPath="/admin/disease-classes/"
      />
    </div>
  );
}

export const dynamic = "force-dynamic";

export default DiseaseClasses;
