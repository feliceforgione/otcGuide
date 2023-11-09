"use client";
import { reset } from "@/app/stores/interfaceStore";
import { useEffect } from "react";

function Reset() {
  useEffect(() => {
    reset();
  }, []);
  return null;
}

export default Reset;
