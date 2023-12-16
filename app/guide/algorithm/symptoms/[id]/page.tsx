"use client";
import Loading from "@/app/guide/_components/Loading";
import { getSymptoms } from "@/app/utils/api";
import { Heading } from "@radix-ui/themes";
import useSWR from "swr";
import SymptomList from "./SymptomList";

export type swrSymtomsResponseType = {
  algorithm_symptom_set_id: number;
  algorithm_question_id: number;
  symptom_type_id: number;
  symptom_id: number;
  symptom: {
    symptom_name: string;
  };
};

interface Props {
  params: { id: string };
}

function Symptoms({ params }: Props) {
  const { isLoading, data: symptoms } = useSWR<swrSymtomsResponseType[]>(
    `algorithm/symptoms/${params.id}`,
    () => getSymptoms(parseInt(params.id))
  );

  if (isLoading) return <Loading />;

  return (
    <>
      <Heading className="pageHeading">
        What symptoms does the patient have:
      </Heading>
      <SymptomList
        symptoms={symptoms!}
        currentAlgorithm={parseInt(params.id)}
      />
    </>
  );
}

export default Symptoms;
