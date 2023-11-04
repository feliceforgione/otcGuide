"use client";
import { MedicalHistory, useGuideStore } from "@/app/utils/store";
import { Box, Flex, Heading, RadioGroup, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";

const GENDERS = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Pregnant", value: "pregnant", disable: true },
  { label: "Nursing", value: "nursing", disable: true },
];

const AGEGROUPS = [
  {
    label: "Child",
    labelInfo: "less than 12 years old",
    value: "child",
    disable: true,
  },
  { label: "Adult", labelInfo: "", value: "adult", disable: false },
  {
    label: "Elderly",
    labelInfo: "over 65 years old",
    value: "elderly",
    disable: true,
  },
];

const DEFAULTERRORSTATE = { genderError: false, ageError: false };

function MedicalHistory() {
  const [gender, setGender] = useState<MedicalHistory["gender"] | "">("");
  const [ageGroup, setAgeGroup] = useState<MedicalHistory["ageGroup"] | "">("");
  const [error, setError] = useState(DEFAULTERRORSTATE);
  const { updateMedicalHistory } = useGuideStore();

  const router = useRouter();

  function handleProceed() {
    console.log("proceed clicked");
    setError(DEFAULTERRORSTATE);
    if (!gender) {
      return setError((prevError) => ({ ...prevError, genderError: true }));
    }
    if (!ageGroup) {
      return setError((prevError) => ({ ...prevError, ageError: true }));
    }
    if (
      (gender === "nursing" || gender === "pregnant") &&
      (ageGroup === "child" || ageGroup === "elderly")
    )
      return setError({ ...error, ageError: true });

    updateMedicalHistory({
      gender,
      ageGroup,
    });
    router.push("./exclusion");
  }

  return (
    <div>
      <Heading className="pageHeading">The patient is : </Heading>
      <Box className="mt-5 justify-around flex">
        <Box className="border-2 border-slate-500 rounded-md p-8">
          <RadioGroup.Root
            size="3"
            name="gender"
            onValueChange={(e: MedicalHistory["gender"]) => setGender(e)}
          >
            <Flex gap="3" direction="column">
              {GENDERS.map((gender) => (
                <Box key={gender.value} className="mh-button">
                  <Text as="label" size="7">
                    <Flex gap="2">
                      <RadioGroup.Item
                        value={gender.value}
                        disabled={
                          (ageGroup === "child" || ageGroup === "elderly") &&
                          gender.disable
                        }
                      />{" "}
                      {gender.label}
                    </Flex>
                  </Text>
                </Box>
              ))}
            </Flex>
          </RadioGroup.Root>
          <div className="h-6 w-60 mt-4">
            {error.genderError && (
              <Text as="p" className="text-red-600  text-center">
                Please make a selection
              </Text>
            )}
          </div>
        </Box>
        <Box className="border-2 border-slate-500 rounded-md p-8  pb-16">
          <RadioGroup.Root
            size="3"
            name="agegroup"
            onValueChange={(e: MedicalHistory["ageGroup"]) => setAgeGroup(e)}
          >
            <Flex gap="3" direction="column">
              {AGEGROUPS.map((ageGroup) => (
                <Box key={ageGroup.value} className="mh-button">
                  <Text as="label" size="7">
                    <Flex gap="2">
                      <RadioGroup.Item
                        value={ageGroup.value}
                        disabled={
                          (gender === "nursing" || gender === "pregnant") &&
                          ageGroup.disable
                        }
                      />
                      {ageGroup.label}{" "}
                      {ageGroup.labelInfo && (
                        <Text size="2">{ageGroup.labelInfo}</Text>
                      )}
                    </Flex>
                  </Text>
                </Box>
              ))}
            </Flex>
          </RadioGroup.Root>
          <div className="h-6 w-60 mt-4">
            <Text as="p" className="text-red-600  text-center">
              {error.ageError && "Please select appropriate age"}
            </Text>
          </div>
        </Box>
      </Box>
      <div className="flex justify-center mt-20">
        <button
          className="py-2 px-4 rounded-lg bg-blue-700 text-white"
          onClick={handleProceed}
        >
          Proceed
        </button>
      </div>
    </div>
  );
}

export default MedicalHistory;
