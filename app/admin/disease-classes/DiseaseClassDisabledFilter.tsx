"use client";
import React from "react";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

function DiseaseClassDisabledFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const disabledValues: { label: string; value?: "0" | "1" }[] = [
    { label: "All" },
    { label: "True", value: "1" },
    { label: "False", value: "0" },
  ];

  function handleSelect(value: string) {
    const params = new URLSearchParams();
    const disabled = value === "all" ? "" : value;
    if (disabled) params.append("disabled", disabled);
    if (searchParams.get("sortOrder"))
      params.append("sortOrder", searchParams.get("sortOrder")!);
    if (searchParams.get("orderBy"))
      params.append("orderBy", searchParams.get("orderBy")!);

    const query = params.size ? `?${params.toString()}` : "";
    router.push(`/admin/disease-classes/${query}`);
  }

  return (
    <Select.Root
      onValueChange={handleSelect}
      defaultValue={searchParams.get("disabled") || ""}
    >
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
