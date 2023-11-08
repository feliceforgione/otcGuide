import { create } from "zustand";
import { devtools } from "zustand/middleware";

const initialInterfaceValue = {
  diseaseClassName: "",
  diseaseSubClassName: "",
};

export const useInterfaceStore = create<typeof initialInterfaceValue>()(
  devtools(() => initialInterfaceValue, {
    name: "Interface Store",
  })
);

export const reset = () =>
  useInterfaceStore.setState((state) => initialInterfaceValue);
