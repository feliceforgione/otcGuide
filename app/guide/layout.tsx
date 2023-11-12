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
      <main
        id="guideMain"
        className="p-5 overflow-y-scroll"
        style={{ height: "calc(100vh - 75px)" }}
      >
        <Container>{children}</Container>
      </main>
    </>
  );
}
