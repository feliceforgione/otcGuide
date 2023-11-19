"use client";
import Loading from "@/app/guide/_components/Loading";
import { getAlgorithmQuestion } from "@/app/utils/api";
import { algorithm_questions, algorithm_questions_type } from "@prisma/client";
import { Box, Button, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import useSWR from "swr";
import Redirect from "../../_components/Redirect";

interface Props {
  params: { id: string };
}

function AlgorithmPage({ params }: Props) {
  const { isLoading, data: question } = useSWR<algorithm_questions | null>(
    `algorithm/${params.id}`,
    () => getAlgorithmQuestion(parseInt(params.id))
  );

  if (isLoading) return <Loading />;

  if (question?.yes_type === "symptoms") {
    return (
      <Redirect
        link={`/guide/algorithm/symptoms/${parseInt(params.id)}`}
        replaceMethod="replace"
        redirect={true}
      />
    );
  }
  if (question?.yes_type === "plan" && !question?.question) {
    return (
      <Redirect
        link={`/guide/upcs/${question.yes_link_id}`}
        replaceMethod="replace"
        redirect={true}
      />
    );
  }

  function createLink(type: algorithm_questions_type, id: number) {
    let link = "";
    switch (type) {
      case "question":
        link = `/guide/algorithm/${id}`;
        break;
      case "referral":
        link = `/guide/consult-professional?error=3`;
        break;
      case "plan":
        link = `/guide/upcs/${id}/`;
        break;
      case "symptoms":
        link = `/guide/algorithm/symptoms/${id}`;
        break;
      default:
        break;
    }

    return link;
  }

  console.log(question);
  return (
    <>
      <Heading className="pageHeading">Questions : </Heading>
      <Box className="flex h-96 flex-col justify-between p-8  border-2 rounded-md sm:mx-auto sm:w-full lg:max-w-2xl ">
        <Box className="h-2/4">
          <Text as="p" size={"6"}>
            {question?.question}
          </Text>
          {question?.question_list && (
            <ul className="list-disc list-inside mt-3">
              {question.question_list.split("||").map((item) => (
                <li key={item} className="text-lg">
                  {item}
                </li>
              ))}
            </ul>
          )}
        </Box>
        <Box className="flex justify-around mt-4">
          <Link href={createLink(question?.yes_type!, question?.yes_link_id!)}>
            <Button size="3">Yes</Button>
          </Link>
          <Link href={createLink(question?.no_type!, question?.no_link_id!)}>
            <Button size="3">No</Button>
          </Link>
        </Box>
      </Box>
    </>
  );
}

export default AlgorithmPage;
