"use client";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import React from "react";

function NewDiseaseClass() {
  return (
    <div className="max-w-xl space-y-3">
      <h1>Add Disease Class</h1>
      <TextField.Root>
        <TextField.Input placeholder="Name" />
      </TextField.Root>
      <TextField.Root>
        <TextField.Input placeholder="Alias" />
      </TextField.Root>
      <TextArea placeholder="Description" />
      <TextField.Root>
        <TextField.Input placeholder="Image Link" />
      </TextField.Root>
      <TextField.Root>
        <TextField.Input placeholder="Order" />
      </TextField.Root>
      <Button>Submit New Disease Class</Button>
    </div>
  );
}

export default NewDiseaseClass;
