"use client";
import { reset } from "@/app/stores/interfaceStore";
import { resetGuide } from "@/app/stores/guideStore";
import { useEffect } from "react";

function Reset() {
  useEffect(() => {
    reset();
    resetGuide();
  }, []);
  return null;
}

export default Reset;
