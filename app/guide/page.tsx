import logo from "@/public/otcguide_logo.png";
import Image from "next/image";
import Link from "next/link";

async function GuideWelcome() {
  return (
    <div
      className="flex items-center justify-center"
      style={{ height: "calc(100vh - 120px)" }}
    >
      <Link href={"/guide/condition"}>
        <Image src={logo} width={344} height={224} alt="otcGuide Logo" />
      </Link>
    </div>
  );
}

export default GuideWelcome;
