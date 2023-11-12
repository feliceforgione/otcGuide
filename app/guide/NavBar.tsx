"use client";
import { SymbolIcon } from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import { useInterfaceStore } from "../stores/interfaceStore";

function NavBar() {
  const diseaseClassName = useInterfaceStore((state) => state.diseaseClassName);
  const diseaseSubClassName = useInterfaceStore(
    (state) => state.diseaseSubClassName
  );

  return (
    <nav className="flex justify-between border-b px-7 h-16 items-center">
      <Link
        href="/"
        className="font-extrabold text-red-950 hover:text-red-800 transition-colors"
      >
        <Text size="6">otcGuide</Text>
      </Link>
      <Flex align="center" gap={"1"}>
        <Text size="6" weight="medium">
          {diseaseClassName}
        </Text>
        {diseaseSubClassName && (
          <Text size="6">{` : ${diseaseSubClassName}`}</Text>
        )}
      </Flex>
      <ul>
        <li>
          <Link href="/guide/condition">
            <Button className="rounded-full py-4 bg-blue-600">
              <SymbolIcon />
              Restart
            </Button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
