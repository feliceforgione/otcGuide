import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface Props {
  redirect: boolean;
  link: string;
  replaceMethod: "push" | "replace";
}

function Redirect({ redirect = false, link, replaceMethod }: Props) {
  const router = useRouter();

  useEffect(() => {
    if (redirect) {
      if (replaceMethod === "replace") {
        router.replace(link);
      } else {
        router.push(link);
      }
    }
  }, [redirect, router, link, replaceMethod]);

  return null;
}

export default Redirect;
