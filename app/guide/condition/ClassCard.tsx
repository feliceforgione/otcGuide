"use client";
import { useGuideStore } from "@/app/utils/store";
import { Card, Heading, Inset, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

interface Props {
  id: number;
  title: string;
  image?: string;
  description?: string;
}

function ClassCard({ id, title, image, description }: Props) {
  const router = useRouter();
  const { updateCondition } = useGuideStore();

  function handleClassClick() {
    updateCondition({ diseaseClassName: title, diseaseSubClassName: null });
    router.push(`./condition/${id}`);
  }
  return (
    <Card onClick={handleClassClick}>
      <Inset clip="padding-box" side="top" pb="current">
        <img
          src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
          alt="Bold typography"
          style={{
            display: "block",
            objectFit: "cover",
            width: "100%",
            height: 140,
            backgroundColor: "var(--gray-5)",
          }}
        />
      </Inset>
      <Heading>{title}</Heading>
      <Text as="p" size="3">
        {description}
      </Text>
    </Card>
  );
}

export default ClassCard;