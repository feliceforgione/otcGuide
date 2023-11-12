"use client";
import { useInterfaceStore } from "@/app/stores/interfaceStore";
import { Box, Card, Heading, Inset, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Props {
  id: number;
  title: string;
  image?: string;
  description?: string;
}

function ClassCard({ id, title, image, description }: Props) {
  const router = useRouter();

  function handleClassClick() {
    useInterfaceStore.setState((state) => ({ diseaseClassName: title }));
    router.push(`./condition/${id}`);
  }
  return (
    <div
      onClick={handleClassClick}
      className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] h-72 "
    >
      <div className="relative overflow-hidden bg-cover bg-no-repeat h-32">
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
      <Box className="px-3">
        <Heading className="text-center py-2">{title}</Heading>
        <hr />
        <div className="p-2 columns-2">
          <ul className="list-disc list-inside">
            {description?.split("||").map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </Box>
    </div>
  );
}

export default ClassCard;
