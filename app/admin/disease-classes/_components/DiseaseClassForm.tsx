"use client";
import { ErrorMessage, Spinner } from "@/app/components/";
import { diseaseClassSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { disease_class } from "@prisma/client";
import {
  Button,
  Callout,
  Heading,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Form = z.infer<typeof diseaseClassSchema>;

function DiseaseClassForm({ diseaseClass }: { diseaseClass?: disease_class }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(diseaseClassSchema),
  });
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  async function handleFormSubmit(data: Form) {
    try {
      setSubmitting(true);
      if (diseaseClass) {
        await axios.patch(`/api/disease-classes/${diseaseClass.id}`, {
          ...data,
          order: Number(data.order),
        });
      } else {
        await axios.post("/api/disease-classes", {
          ...data,
          order: Number(data.order),
        });
      }
      router.push("/admin/disease-classes");
    } catch (error) {
      setSubmitting(false);
      setError("An unexpected error has occured");
    }
  }

  return (
    <div className="max-w-2xl">
      <Heading as="h1" className="mb-6">
        Add Disease Class
      </Heading>

      <form
        className="my-3 space-y-3"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        {error && (
          <Callout.Root color="red" className="">
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        )}
        <div>
          <TextField.Root>
            <TextField.Input
              defaultValue={diseaseClass?.name}
              placeholder="Name"
              {...register("name")}
            />
          </TextField.Root>
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
        </div>

        <div>
          <TextField.Root>
            <TextField.Input
              defaultValue={diseaseClass?.aliasname ?? undefined}
              placeholder="Alias"
              {...register("aliasname")}
            />
          </TextField.Root>
          <ErrorMessage>{errors.aliasname?.message}</ErrorMessage>
        </div>

        <div>
          <TextArea
            defaultValue={diseaseClass?.description ?? undefined}
            placeholder="Description"
            {...register("description")}
          />

          <ErrorMessage>{errors.description?.message}</ErrorMessage>
        </div>

        <div>
          <TextField.Root>
            <TextField.Input
              defaultValue={diseaseClass?.buttonimage ?? undefined}
              placeholder="Image Link"
              {...register("buttonimage")}
            />
          </TextField.Root>
          <ErrorMessage>{errors.buttonimage?.message}</ErrorMessage>
        </div>

        <div>
          <TextField.Root>
            <TextField.Input
              type="number"
              defaultValue={diseaseClass?.order ?? undefined}
              placeholder="Order"
              {...register("order", {
                valueAsNumber: true,
              })}
              className="border border-gray-400 "
            />
          </TextField.Root>
          <ErrorMessage>{errors.order?.message}</ErrorMessage>
        </div>

        <Button disabled={isSubmitting}>
          {diseaseClass ? "Update Disease Class" : "Submit New Disease Class"}{" "}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
}

export default DiseaseClassForm;
