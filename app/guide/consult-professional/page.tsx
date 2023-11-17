"use client";
import { Heading, Box, Text, Flex } from "@radix-ui/themes";
import { useSearchParams } from "next/navigation";
import React from "react";

const ERRORS: Record<number, string> = {
  1: "Selected one of the exclusion questions",
  2: "No starting algorithm found",
  3: "Filter question exclusion",
  4: "No treatment plan id",
};

function ConsultMedicalProfessional() {
  const searchParams = useSearchParams();
  const errorCode = searchParams.get("error");

  return (
    <>
      <Heading className="pageHeading">
        Referral : Please Consult a Medical Professional
      </Heading>

      <Box className="flex justify-center items-center h-[70vh]">
        <Box className="rounded-full w-[30rem] h-[30rem] border-8 border-red-800 flex justify-center items-center p-8">
          <Text size={"7"} className="text-center text-red-900 ">
            Based on your responses, it is best to consult a medical
            professional before self treating.
          </Text>
        </Box>
      </Box>
      <Text size={"1"} color="red">
        {errorCode && ERRORS[parseInt(errorCode)]}
      </Text>
    </>
  );
}

export default ConsultMedicalProfessional;
