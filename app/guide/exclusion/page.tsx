"use client";
import { MedicalHistoryType, useGuideStore } from "@/app/stores/guideStore";
import { getAlgorithmStart, getExclusionQuestions } from "@/app/utils/api";
import { getAgeGenderGroup } from "@/app/utils/utilities";
import { exclusion_questions, lnk_mh_algorithm_ques } from "@prisma/client";
import { Heading } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import CheckboxStatementList from "../_components/CheckboxStatementList";
import Loading from "../_components/Loading";
import Redirect from "../_components/Redirect";

function Exclusion() {
  const router = useRouter();
  const diseaseSubclassId = useGuideStore.getState().diseaseSubclassId;

  const { isLoading: isLoadingQuestions, data: questions } = useSWR<
    exclusion_questions[] | null
  >(`disease-classes/${diseaseSubclassId}/exclusions`, () =>
    getExclusionQuestions(diseaseSubclassId!)
  );

  const { isLoading: isLoadingstartingPoints, data: startingPoints } =
    useSWR<lnk_mh_algorithm_ques | null | null>(
      `disease-classes/${diseaseSubclassId}/startingpoints`,
      () => getAlgorithmStart(diseaseSubclassId!)
    );

  if (isLoadingQuestions || isLoadingstartingPoints) return <Loading />;

  const { gender, ageGroup } = useGuideStore.getState().medicalHistory!;
  console.log("Starting Points : ", startingPoints);

  if (!startingPoints) {
    console.log("No starting pointS");
    return (
      <Redirect
        link={"/guide/consult-professional?error=2"}
        redirect={true}
        replaceMethod="replace"
      />
    );
  }

  const ageGenderGroup: MedicalHistoryType["ageGenderGroup"] =
    getAgeGenderGroup({ gender, ageGroup })!;

  useGuideStore.setState((state) => ({
    medicalHistory: {
      ...state.medicalHistory!,
      ageGenderGroup: ageGenderGroup,
    },
  }));
  const startingPoint = startingPoints![ageGenderGroup];

  console.log("Starting Point :", startingPoint);

  if (!startingPoint) {
    console.log("No starting point!");
    return (
      <Redirect
        link={"/guide/consult-professional?error=2"}
        redirect={true}
        replaceMethod="replace"
      />
    );
  }
  if (!questions || questions?.length === 0) {
    console.log("No exclusion questions");
    return (
      <Redirect
        link={`/guide/algorithm/${startingPoint}`}
        redirect={true}
        replaceMethod="replace"
      />
    );
  }

  function handleSubmit(selectedValues: string[]) {
    if (selectedValues.length > 0) {
      router.push("/guide/consult-professional?error=1");
    } else {
      router.push(`/guide/algorithm/${startingPoint}`);
    }
  }

  return (
    <>
      <Heading className="pageHeading">Please answer the following: </Heading>
      <CheckboxStatementList
        handleSubmit={handleSubmit}
        statements={questions.map((q) => ({
          id: q.question_id,
          itemValue: q.question,
        }))}
      />
    </>
  );
}

export default Exclusion;
