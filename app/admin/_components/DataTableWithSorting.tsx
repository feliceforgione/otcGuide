"use client";
import { Link } from "@/app/components/";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface Props<T, K> {
  data: T[];
  columns: {
    label: string;
    accessor: K & string;
    classnames?: string;
  }[];
  idColumn: K & string;
  urlDetailPath: string;
}

function DataTableWithSorting<T, K extends keyof T>({
  data,
  columns,
  idColumn,
  urlDetailPath,
}: Props<T, K>) {
  const [sortField, setSortField] = useState("");
  const [orderBy, setOrder] = useState("asc");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSortingChange = (accessor: string) => {
    const sortOrder =
      accessor === sortField && orderBy === "asc" ? "desc" : "asc";

    const params = new URLSearchParams(searchParams);
    params.set("sortOrder", sortOrder);
    params.set("orderBy", accessor);
    setSortField(accessor);
    setOrder(sortOrder);
    router.push(pathname + "?" + params.toString());
  };

  return (
    <div>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.accessor}
                className={column.classnames}
              >
                <span
                  className="cursor-pointer"
                  onClick={() => handleSortingChange(column.accessor)}
                >
                  {column.label}
                </span>

                {column.accessor === sortField && orderBy === "asc" && (
                  <ArrowUpIcon className="inline" />
                )}
                {column.accessor === sortField && orderBy === "desc" && (
                  <ArrowDownIcon className="inline" />
                )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((row) => (
            <Table.Row key={row[idColumn] as string}>
              {columns.map((column, index) => (
                <Table.Cell key={column.accessor} className={column.classnames}>
                  {index === 0 ? (
                    <Link href={`${urlDetailPath}${row[idColumn]}`}>
                      {String(row[column.accessor])}
                    </Link>
                  ) : (
                    <span> {String(row[column.accessor])}</span>
                  )}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
}

export default DataTableWithSorting;
