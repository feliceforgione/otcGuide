import { Skeleton } from "@/app/components";
import { Box, Heading, Table } from "@radix-ui/themes";

function LoadingDiseaseClassDetailPage() {
  return (
    <Box className="max-w-3xl">
      <Heading>
        <Skeleton />
      </Heading>
      <Table.Root variant="surface" className="my-5">
        <Table.Body>
          <Table.Row>
            <Table.RowHeaderCell className="!bg-blue-50 w-4/12">
              Alias
            </Table.RowHeaderCell>
            <Table.Cell>
              <Skeleton />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.RowHeaderCell className="!bg-blue-50">
              Description
            </Table.RowHeaderCell>
            <Table.Cell>
              <Skeleton />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.RowHeaderCell className="!bg-blue-50">
              Image
            </Table.RowHeaderCell>
            <Table.Cell>
              <Skeleton />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.RowHeaderCell className="!bg-blue-50">
              Properties
            </Table.RowHeaderCell>
            <Table.Cell>
              <Skeleton />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </Box>
  );
}

export default LoadingDiseaseClassDetailPage;
