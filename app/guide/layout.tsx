import type { Metadata } from "next";
import { Container } from "@radix-ui/themes";
import NavBar from "./NavBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      <main className="p-5">
        <Container>{children}</Container>
      </main>
    </>
  );
}
