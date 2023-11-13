"use client";
import { Box, Checkbox, Flex, Text } from "@radix-ui/themes";
import React, { useRef, useState } from "react";
import ProceedButton from "./ProceedButton";

type TStatement = {
  id: number;
  itemValue: string;
};

type Props = {
  statements: TStatement[];
  handleSubmit: (selectedValues: string[]) => void;
  columns?: 1 | 2;
  selectionRequired?: boolean;
};

function CheckboxStatementList({
  statements,
  handleSubmit,
  columns = 1,
  selectionRequired = false,
}: Props) {
  const [noneBoxChecked, setNoneBoxChecked] = useState(false);
  const [error, setError] = useState("");
  const form = useRef(null);

  const listLength = Math.ceil((statements?.length || 0) / 2);
  const columnOneStatements =
    columns === 1 ? statements : statements.slice(0, listLength);
  const columnTwoStatements = columns === 1 ? [] : statements.slice(listLength);

  function onSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    const data = new FormData(form.current!);
    const selectedStatements = data.getAll("statements");
    if (selectionRequired && selectedStatements.length === 0) {
      setError("Please make selections");
      return;
    }
    console.log(selectedStatements);
    handleSubmit(selectedStatements as string[]);
  }

  return (
    <Box className="border-2 border-slate-500 rounded-md p-8">
      <form ref={form} onSubmit={onSubmit}>
        <Box className="flex justify-around">
          <Flex gap="4" direction="column">
            {columnOneStatements?.map((statement) => (
              <Box key={statement.id} className="">
                <Text as="label" size="7">
                  <Flex gap="2">
                    <Checkbox
                      size="3"
                      name="statements"
                      value={String(statement.id)}
                      disabled={noneBoxChecked}
                      checked={noneBoxChecked ? false : undefined}
                    />
                    {statement.itemValue}
                  </Flex>
                </Text>
              </Box>
            ))}
          </Flex>
          {columns == 2 && (
            <Flex gap="4" direction="column">
              {columnTwoStatements?.map((statement) => (
                <Box key={statement.id} className="">
                  <Text as="label" size="7">
                    <Flex gap="2">
                      <Checkbox
                        size="3"
                        name="statements"
                        value={String(statement.id)}
                        disabled={noneBoxChecked}
                        checked={noneBoxChecked ? false : undefined}
                      />
                      {statement.itemValue}
                    </Flex>
                  </Text>
                </Box>
              ))}
            </Flex>
          )}
        </Box>
        <div className="h-4 text-center mt-4">
          <Text as={"p"} color="red" size={"5"}>
            {error}
          </Text>
        </div>
        <hr className="mt-4" />
        {!selectionRequired && (
          <Box className="mt-5">
            <Text as="label" size="7">
              <Flex gap="2" justify={"center"}>
                <Checkbox
                  value="none"
                  name="none"
                  onCheckedChange={() => setNoneBoxChecked(!noneBoxChecked)}
                />
                None of the above
              </Flex>
            </Text>
          </Box>
        )}
        <ProceedButton type="submit" />
      </form>
    </Box>
  );
}

export default CheckboxStatementList;
