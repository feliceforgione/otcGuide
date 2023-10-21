"use client";
import { useState } from "react";
import {
  Button,
  Callout,
  Heading,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createDiseaseClassSchema } from "@/app/validationSchemas";
import axios from "axios";
import { useRouter } from "next/navigation";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/spinner";

type Form = z.infer<typeof createDiseaseClassSchema>;

function NewDiseaseClass() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(createDiseaseClassSchema),
  });
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  async function handleFormSubmit(data: Form) {
    try {
      setSubmitting(true);
      await axios.post("/api/disease-classes", {
        ...data,
        order: Number(data.order),
      });
      router.push("/admin/disease-classes");
    } catch (error) {
      setSubmitting(false);
      setError("An unexpected error has occured");
    }
  }

  return (
    <div className="max-w-xl">
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
            <TextField.Input placeholder="Name" {...register("name")} />
          </TextField.Root>
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
        </div>

        <div>
          <TextField.Root>
            <TextField.Input placeholder="Alias" {...register("aliasname")} />
          </TextField.Root>
          <ErrorMessage>{errors.aliasname?.message}</ErrorMessage>
        </div>

        <div>
          <TextArea placeholder="Description" {...register("description")} />

          <ErrorMessage>{errors.description?.message}</ErrorMessage>
        </div>

        <div>
          <TextField.Root>
            <TextField.Input
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
          Submit New Disease Class {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
}

export default NewDiseaseClass;
