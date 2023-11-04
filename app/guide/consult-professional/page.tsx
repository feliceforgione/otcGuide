import { Heading, Box, Text, Flex } from "@radix-ui/themes";
import React from "react";

function ConsultMedicalProfessional() {
  return (
    <>
      <Heading className="pageHeading">
        Referral : Please Consult a Medical Professional{" "}
      </Heading>
      <Box className="flex justify-center items-center h-[70vh]">
        <Box className="rounded-full w-[30rem] h-[30rem] border-8 border-red-800 flex justify-center items-center p-8">
          <Text size={"7"} className="text-center text-red-900 ">
            Based on your responses, it is best to consult a medical
            professional before self treating.
          </Text>
        </Box>
      </Box>
    </>
  );
}

export default ConsultMedicalProfessional;
