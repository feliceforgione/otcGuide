"use client";
import ProceedButton from "@/app/guide/_components/ProceedButton";
import { getSymptomsCombo } from "@/app/utils/api";
import { Box, Checkbox, Flex, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { swrSymtomsResponseType } from "./page";

interface Props {
  symptoms: swrSymtomsResponseType[];
  currentAlgorithm: number;
}

function SymptomList({ symptoms, currentAlgorithm }: Props) {
  const form = useRef(null);
  const [error, setError] = useState("");
  const router = useRouter();
  const listLength = (symptoms?.length || 0) / 2;

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    const data = new FormData(form.current!);
    const selectedConditions = data.getAll("symptons");
    if (selectedConditions.length === 0) {
      setError("Please select patient's symptoms");
      return;
    }
    const symptomTypeCombo = Array.from(new Set(selectedConditions)).join("|");
    console.log(symptomTypeCombo);

    const nextAlgorithm = await getSymptomsCombo(
      currentAlgorithm,
      symptomTypeCombo
    );
    console.log(nextAlgorithm);

    router.push(
      `/guide/algorithm/${nextAlgorithm.jumpto_algorithm_question_id}`
    );
  }
  return (
    <Box className="border-2 border-slate-500 rounded-md p-8">
      <form ref={form} onSubmit={handleSubmit}>
        <Box className="flex justify-around">
          <Flex gap="3" direction="column">
            {symptoms?.slice(0, listLength).map((symptom) => (
              <Box key={symptom.symptom_id} className="">
                <Text as="label" size="7">
                  <Flex gap="2">
                    <Checkbox
                      size="3"
                      name="symptons"
                      value={String(symptom.symptom_type_id)}
                    />
                    <span> {symptom.symptom.symptom_name}</span>
                  </Flex>
                </Text>
              </Box>
            ))}
          </Flex>
          <Flex gap="3" direction="column">
            {symptoms?.slice(listLength).map((symptom) => (
              <Box key={symptom.symptom_id} className="">
                <Text as="label" size="7">
                  <Flex gap="2">
                    <Checkbox
                      size="3"
                      name="symptons"
                      value={String(symptom.symptom_type_id)}
                    />
                    <span> {symptom.symptom.symptom_name}</span>
                  </Flex>
                </Text>
              </Box>
            ))}
          </Flex>
        </Box>
        <div className="h-4 text-center mt-4">
          <Text as={"p"} color="red" size={"5"}>
            {error}
          </Text>
        </div>

        <ProceedButton type="submit" />
      </form>
    </Box>
  );
}

export default SymptomList;
