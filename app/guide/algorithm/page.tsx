"use client";
import { getAlgorithmStart } from "@/app/utils/api";
import { MedicalHistoryType, useGuideStore } from "@/app/utils/store";
import { lnk_mh_algorithm_ques } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";
import useSWR from "swr";

function AlgorithmStart() {
  //const { updateMedicalHistory } = useGuideStore();
  const router = useRouter();

  const { diseaseSubclassId } = useGuideStore.getState().condition!;

  const { isLoading, data: startingPoints } =
    useSWR<lnk_mh_algorithm_ques | null>(
      `disease-classes/${diseaseSubclassId}/algorithm-start`,
      () => getAlgorithmStart(diseaseSubclassId!)
    );

  if (isLoading) return <p>loading...</p>;

  const medicalHistory = useGuideStore.getState().medicalHistory!;
  const { gender, ageGroup } = medicalHistory;
  let ageGenderGroup: MedicalHistoryType["ageGenderGroup"];

  switch (gender) {
    case "male":
      ageGenderGroup =
        ageGroup === "child" || ageGroup === "infant"
          ? ageGroup
          : `${ageGroup}_male`;
      break;
    case "female":
      ageGenderGroup =
        ageGroup === "child" || ageGroup === "infant"
          ? ageGroup
          : `${ageGroup}_female`;
      break;

    default:
      ageGenderGroup = gender;
      break;
  }

  if (startingPoints) {
    const startingPoint = startingPoints
      ? startingPoints[ageGenderGroup]
      : null;
    console.log("starting point : ", startingPoint);

    if (!startingPoint) {
      return router.push(`algorithm/consult-professional?error=2`);
    }
    useGuideStore.setState((prevState) => ({
      ...prevState,
      medicalHistory: { ...medicalHistory, ageGenderGroup },
    }));
    return router.push(`algorithm/${startingPoint}`);
  }

  return null;
}

export default AlgorithmStart;
