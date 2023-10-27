"use client";
import { Skeleton } from "@/app/components/";
import { Button, Heading, TextField } from "@radix-ui/themes";

function DiseaseClassFormSkeleton() {
  return (
    <div className="max-w-2xl">
      <Skeleton height={"1.9rem"} />

      <form className="my-3 space-y-3">
        <div>
          <Skeleton height={"1.5rem"} />
        </div>
        <div>
          <Skeleton height={"1.5rem"} />
        </div>
        <div>
          <Skeleton height={"3.5rem"} />
        </div>
        <div>
          <Skeleton height={"1.5rem"} />
        </div>
        <div>
          <Skeleton height={"1.5rem"} />
        </div>

        <Button className="w-40">
          <Skeleton />
        </Button>
      </form>
    </div>
  );
}

export default DiseaseClassFormSkeleton;
