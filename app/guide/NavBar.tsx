"use client";
import { Button, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useGuideStore } from "../utils/store";

function NavBar() {
  const router = useRouter();
  const pathname = usePathname();

  const condition = useGuideStore((state) => state.condition);

  return (
    <nav className="flex justify-between border-b px-2 h-16 items-center">
      <Link
        href="/"
        className="font-extrabold text-red-950 hover:text-red-800 transition-colors"
      >
        <Text size="6">otcGuide</Text>
      </Link>
      <Flex align="center" gap={"1"}>
        <Text size="6" weight="medium">
          {condition?.diseaseClassName}
        </Text>
        {condition?.diseaseSubClassName && (
          <Text size="6">{` : ${condition.diseaseSubClassName}`}</Text>
        )}
      </Flex>
      <ul>
        <li>
          <Link href="/guide/condition">
            <Button className="rounded-full py-4 bg-blue-600">Refresh</Button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
