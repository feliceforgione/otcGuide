"use client";
import React from "react";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

function DiseaseClassDisabledFilter() {
  const router = useRouter();

  const disabledValues: { label: string; value?: "0" | "1" }[] = [
    { label: "All" },
    { label: "True", value: "1" },
    { label: "False", value: "0" },
  ];

  function handleSelect(value: string) {
    const query = value === "all" ? "" : `?disabled=${value}`;
    router.push(`/admin/disease-classes/${query}`);
  }

  return (
    <Select.Root onValueChange={handleSelect}>
      <Select.Trigger placeholder="Disabled" />
      <Select.Content>
        {disabledValues.map((selectValue) => (
          <Select.Item
            key={selectValue.label}
            value={
              selectValue.value === undefined
                ? "all"
                : String(selectValue.value)
            }
          >
            {selectValue.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
}

export default DiseaseClassDisabledFilter;
