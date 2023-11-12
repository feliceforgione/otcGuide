import React from "react";
import { ThickArrowRightIcon } from "@radix-ui/react-icons";

interface Props {
  onClickHandle?: () => void | null;
  buttonText?: string;
  type?: "button" | "submit";
}

function ProceedButton({
  onClickHandle,
  buttonText = "Proceed",
  type = "button",
}: Props) {
  return (
    <div className="flex justify-center mt-20">
      <button
        className="py-3 px-4 rounded-lg bg-blue-700 text-white text-lg flex items-center gap-2"
        onClick={onClickHandle}
        type={type}
      >
        {buttonText}
        <ThickArrowRightIcon width="20" height="20" />
      </button>
    </div>
  );
}

export default ProceedButton;
