import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

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

type Condition = {
  diseaseSubclassId?: number | null;
  diseaseClassName?: string | null;
  diseaseSubClassName?: string | null;
};

type PlanType = {
  condition: Condition | null;
  products: string[];
  medicalHistory: MedicalHistoryType | null;
  updateCondition: (condition: Condition) => void;
  updateProducts: (products: string[]) => void;
  updateMedicalHistory: (mh: MedicalHistoryType) => void;
  reset: () => void;
};

const INITIAL_STATE = {
  condition: null,
  products: [],
  medicalHistory: null,
};

export const useGuideStore = create<PlanType>((set) => ({
  condition: INITIAL_STATE.condition,
  products: INITIAL_STATE.products,
  medicalHistory: INITIAL_STATE.medicalHistory,
  updateCondition: (condition) => {
    set((state) => ({
      ...state,
      condition: { ...state.condition, ...condition },
    }));
  },
  updateProducts(products) {
    set((state) => ({
      ...state,
      products,
    }));
  },
  updateMedicalHistory(mh) {
    set((state) => ({
      ...state,
      medicalHistory: mh,
    }));
  },
  reset: () => {
    set(INITIAL_STATE);
  },
}));

mountStoreDevtool("Store", useGuideStore);
