"use client";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

function DeleteDiseaseClassButton({
  diseaseClassId,
}: {
  diseaseClassId: number;
}) {
  const [error, setError] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    try {
      await axios.delete(`/api/disease-classes/${diseaseClassId}`);
      router.push("/admin/disease-classes/");
      router.refresh();
    } catch (error) {
      setError(true);
    }
  }
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red">Delete Disease Class</Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure you want to delete this?
          </AlertDialog.Description>
          <Flex mt="4" gap="3">
            <AlertDialog.Cancel>
              <Button color="gray" variant="soft">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button color="red" onClick={handleDelete}>
                Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            This could not be deleted
          </AlertDialog.Description>
          <Button
            mt="4"
            color="gray"
            variant="soft"
            onClick={() => setError(false)}
          >
            Close
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
}

export default DeleteDiseaseClassButton;
