import prisma from "@/prisma/client";
import { disease_class } from "@prisma/client";
import DataTableWithSorting from "../_components/DataTableWithSorting";
import DiseaseClassesNavbar from "./navbar";
import Pagination from "../_components/Pagination";
import { Flex } from "@radix-ui/themes";

interface Props {
  searchParams: {
    disabled: string;
    orderBy: keyof disease_class;
    sortOrder: "asc" | "desc";
    page: string;
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

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const where = { disable };

  const diseaseClasses = await prisma.disease_class.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.disease_class.count({
    where,
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
      <Flex justify={"center"} className="py-2">
        <Pagination
          itemCount={issueCount}
          pageSize={pageSize}
          currentPage={page}
        />
      </Flex>
    </div>
  );
}

export const dynamic = "force-dynamic";

export default DiseaseClasses;
