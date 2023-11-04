"use client";
import { useGuideStore } from "@/app/utils/store";
import { exclusion_questions } from "@prisma/client";
import { Box, Checkbox, Flex, Heading, Text } from "@radix-ui/themes";
import { useRef, useState } from "react";
import useSWR from "swr";

import { getExclusionQuestions } from "@/app/utils/api";
import { useRouter } from "next/navigation";

function Exclusion() {
  const [noneBoxChecked, setNoneBoxChecked] = useState(false);
  const { condition } = useGuideStore();
  const form = useRef(null);
  const router = useRouter();

  const { isLoading, data: questions } = useSWR<exclusion_questions[] | null>(
    "disease-classes/${condition?.diseaseSubclassId}/exclusions",
    () => getExclusionQuestions(condition!.diseaseSubclassId!)
  );

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    const data = new FormData(form.current!);
    if (data.get("questions")) {
      return router.push("/guide/consult-professional");
    }
  }

  if (isLoading) return null;
  return (
    <>
      <Heading className="pageHeading">Please answer the following: </Heading>
      <Box className="border-2 border-slate-500 rounded-md p-8">
        <form ref={form} onSubmit={handleSubmit}>
          <Flex gap="3" direction="column">
            {questions?.map((question) => (
              <Box key={question.question_id} className="">
                <Text as="label" size="7">
                  <Flex gap="2">
                    <Checkbox
                      size="3"
                      name="questions"
                      value={String(question.question_id)}
                      disabled={noneBoxChecked}
                      checked={noneBoxChecked ? false : undefined}
                    />
                    {question.question}
                  </Flex>
                </Text>
              </Box>
            ))}
            <Box className="">
              <Text as="label" size="7">
                <Flex gap="2">
                  <Checkbox
                    value="none"
                    name="none"
                    onCheckedChange={() => setNoneBoxChecked(!noneBoxChecked)}
                  />
                  None of the above
                </Flex>
              </Text>
            </Box>
          </Flex>

          <div className="flex justify-center mt-20">
            <button
              className="py-2 px-4 rounded-lg bg-blue-700 text-white"
              type="submit"
            >
              Proceed
            </button>
          </div>
        </form>
      </Box>
    </>
  );
}

export default Exclusion;
