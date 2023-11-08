"use client";
import { useGuideStore } from "@/app/utils/store";
import React, { useEffect } from "react";

function Reset() {
  const { reset } = useGuideStore();

  useEffect(() => {
    reset();
  }, [reset]);
  return null;
}

export default Reset;
