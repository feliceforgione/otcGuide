"use client";
import {
  Button,
  Callout,
  Heading,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Form {
  name: string;
  aliasname: string;
  description: string;
  buttonimage: string;
  order: number;
}

function NewDiseaseClass() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<Form>();
  const [error, setError] = useState("");

  async function handleFormSubmit(data: Form) {
    try {
      await axios.post("/api/disease-classes", {
        ...data,
        order: Number(data.order),
      });
      router.push("/admin/disease-classes");
    } catch (error) {
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
        <TextField.Root>
          <TextField.Input placeholder="Name" {...register("name")} />
        </TextField.Root>
        <TextField.Root>
          <TextField.Input placeholder="Alias" {...register("aliasname")} />
        </TextField.Root>
        <TextArea placeholder="Description" {...register("description")} />
        <TextField.Root>
          <TextField.Input
            placeholder="Image Link"
            {...register("buttonimage")}
          />
        </TextField.Root>
        <TextField.Root>
          <TextField.Input placeholder="Order" {...register("order")} />
        </TextField.Root>
        <Button>Submit New Disease Class</Button>
      </form>
    </div>
  );
}

export default NewDiseaseClass;
