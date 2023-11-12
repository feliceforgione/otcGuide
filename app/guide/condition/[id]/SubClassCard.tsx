"use client";
import { useInterfaceStore } from "@/app/stores/interfaceStore";
import { useGuideStore } from "@/app/stores/guideStore";
import { Box, Card, Heading, Inset, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Props {
  id: number;
  title: string;
  image?: string;
  description?: string;
}

function SubClassCard({ id, title, image, description }: Props) {
  const router = useRouter();

  function handleClassClick() {
    useInterfaceStore.setState((state) => ({ diseaseSubClassName: title }));
    useGuideStore.setState((state) => ({ diseaseSubclassId: id }));

    router.push("/guide/medicalhistory");
  }
  return (
    <div
      onClick={handleClassClick}
      className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] h-60 "
    >
      <div className="relative overflow-hidden bg-cover bg-no-repeat h-44">
        <Image
          src={`/images/classes/${image}`}
          alt={title}
          fill={true}
          className="object-cover rounded-t-lg min-h-full"
        />
        <a href="#!">
          <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
        </a>
      </div>
      <Heading className="text-center pt-4">{title}</Heading>
    </div>
  );
}

export default SubClassCard;
