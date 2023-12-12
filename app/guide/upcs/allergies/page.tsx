"use client";
import Loading from "@/app/guide/_components/Loading";
import Redirect from "@/app/guide/_components/Redirect";
import { useGuideStore } from "@/app/stores/guideStore";
import { getAllergies } from "@/app/utils/api";
import {
  filterRecordSet,
  getDistinctItems,
  removeItemsFromArray,
} from "@/app/utils/utilities";
import { Heading } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import CheckboxStatementList from "../../_components/CheckboxStatementList";

interface swrResponse {
  upc: string;
  ingredient_id: number;
  ingredient_broader_name: string;
}

function Allergies() {
  const router = useRouter();
  const products = useGuideStore.getState().products;

  const { isLoading, data: allergies } = useSWR<swrResponse[]>(
    `upc/allergies/${products.join(",")}`,
    () => getAllergies(products.join(","))
  );

  if (isLoading) return <Loading />;

  if (!allergies || allergies.length === 0)
    return (
      <Redirect link={`/guide/plan`} redirect={true} replaceMethod="replace" />
    );

  console.log("Allergies Response : ", allergies);

  const statementsList = getDistinctItems<swrResponse>(
    allergies!,
    "ingredient_id",
    "ingredient_broader_name"
  );

  function handleSubmit(selectedValues: string[]) {
    const toExcludeUpcs = filterRecordSet<swrResponse>(
      allergies!,
      "ingredient_id",
      selectedValues,
      "upc"
    );

    console.log("Original UPCS : ", products);
    console.log("To exclude UPCS : ", toExcludeUpcs);
    const filteredProducts = removeItemsFromArray(products, toExcludeUpcs);
    console.log("Filtered Upcs : ", filteredProducts);

    useGuideStore.setState((state) => ({
      products: filteredProducts as string[],
    }));

    router.push("/guide/plan");
  }

  return (
    <>
      <Heading className="pageHeading">
        What allergies does the patient have:
      </Heading>
      <CheckboxStatementList
        statements={statementsList}
        handleSubmit={handleSubmit}
        columns={2}
      />
    </>
  );
}

export default Allergies;
