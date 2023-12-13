"use client";
import CheckboxStatementList from "@/app/guide/_components/CheckboxStatementList";
import Loading from "@/app/guide/_components/Loading";
import Redirect from "@/app/guide/_components/Redirect";
import { useGuideStore } from "@/app/stores/guideStore";
import { getContraindications } from "@/app/utils/api";
import {
  filterRecordSet,
  getDistinctItems,
  removeItemsFromArray,
} from "@/app/utils/utilities";
import { Heading } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import useSWR from "swr";

interface swrResponse {
  upc: string;
  medical_condition_id: number;
  medical_condition_layman_term: string;
}

function Contraindications() {
  const router = useRouter();

  const products = useGuideStore((state) => state.products);

  const { isLoading, data: contraindications } = useSWR<swrResponse[]>(
    `upc/medical-conditions/${products.join(",")}`,
    () => getContraindications(products.join(","))
  );

  if (isLoading) return <Loading />;

  if (!contraindications || contraindications.length === 0)
    return (
      <Redirect
        link={"/guide/upcs/filter-questions"}
        redirect={true}
        replaceMethod="replace"
      />
    );

  const statementsList = getDistinctItems<swrResponse>(
    contraindications!,
    "medical_condition_id",
    "medical_condition_layman_term"
  );

  function handleSubmit(selectedValues: string[]) {
    const toExcludeUpcs = filterRecordSet<swrResponse>(
      contraindications!,
      "medical_condition_id",
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

    if (filteredProducts.length === 0) {
      router.push("/guide/plan");
    }

    router.push("/guide/upcs/filter-questions");
  }

  return (
    <>
      <Heading className="pageHeading">
        What medical conditions does the patient have:
      </Heading>
      <CheckboxStatementList
        handleSubmit={handleSubmit}
        statements={statementsList}
        columns={2}
      />
    </>
  );
}

export default Contraindications;
