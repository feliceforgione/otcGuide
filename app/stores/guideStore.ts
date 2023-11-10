import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type MedicalHistoryType = {
  gender: "male" | "female" | "pregnant" | "nursing";
  pregnancy?: "nursing" | "pregnant" | null;
  ageGroup: "infant" | "child" | "adult" | "elderly";
  ageGenderGroup?:
    | "infant"
    | "child"
    | "adult_female"
    | "adult_male"
    | "elderly_male"
    | "elderly_female"
    | "nursing"
    | "pregnant";
};

type TGuide = {
  diseaseSubclassId: number | null;
  products: string[];
  medicalHistory: MedicalHistoryType | null;
  treatmentPlan: number | null;
};

const initialGuideValue: TGuide = {
  diseaseSubclassId: null,
  products: [],
  medicalHistory: null,
  treatmentPlan: null,
};

export const useGuideStore = create<TGuide>()(
  devtools(() => initialGuideValue, {
    name: "Guide Store",
  })
);

export const resetGuide = () => useGuideStore.setState(initialGuideValue);
