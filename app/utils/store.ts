import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

export type MedicalHistory = {
  gender: "male" | "female" | "pregnant" | "nursing";
  pregnancy?: "nursing" | "pregnant" | null;
  ageGroup: "child" | "adult" | "elderly";
};

type Condition = {
  diseaseSubclassId?: number | null;
  diseaseClassName?: string | null;
  diseaseSubClassName?: string | null;
};

type PlanType = {
  condition: Condition | null;
  products: string[];
  medicalHistory: MedicalHistory | null;
  updateCondition: (condition: Condition) => void;
  updateProducts: (products: string[]) => void;
  updateMedicalHistory: (mh: MedicalHistory) => void;
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
      products,
      medicalHistory: state.medicalHistory,
    }));
  },
  updateMedicalHistory(mh) {
    set((state) => ({
      products: state.products,
      medicalHistory: mh,
    }));
  },
  reset: () => {
    set(INITIAL_STATE);
  },
}));

mountStoreDevtool("Store", useGuideStore);
