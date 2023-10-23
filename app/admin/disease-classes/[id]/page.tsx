import prisma from "@/prisma/client";
import { Heading, Table } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";

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
    <>
      <Heading>{diseaseClass.name}</Heading>
      <Table.Root variant="surface" className="my-5">
        <Table.Body>
          <Table.Row>
            <Table.RowHeaderCell className="!bg-blue-50">
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
    </>
  );
}

export default DiseaseClassDetailPage;
