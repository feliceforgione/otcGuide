"use client";
import Loading from "@/app/guide/_components/Loading";
import Redirect from "@/app/guide/_components/Redirect";
import { useGuideStore } from "@/app/stores/guideStore";
import { getFilterQuestions } from "@/app/utils/api";
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
  filter_question_id: number;
  question: string;
}

function FilterQuestions() {
  const router = useRouter();
  const products = useGuideStore.getState().products;
  console.log(products);

  const { isLoading, data: questions } = useSWR<swrResponse[]>(
    `upc/filter-questions/${products.join(",")}`,
    () => getFilterQuestions(products.join(","))
  );

  if (isLoading) return <Loading />;

  if (!questions || questions.length === 0)
    return (
      <Redirect
        link={`/guide/upcs/allergies/`}
        redirect={true}
        replaceMethod="replace"
      />
    );

  console.log("Filter Questions Response : ", questions);

  const statementsList = getDistinctItems<swrResponse>(
    questions!,
    "filter_question_id",
    "question"
  );

  function handleSubmit(selectedValues: string[]) {
    const toExcludeUpcs = filterRecordSet<swrResponse>(
      questions!,
      "filter_question_id",
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

    router.push(`/guide/upcs/allergies/`);
  }

  return (
    <>
      <Heading className="pageHeading">
        Select all statements which apply to patient :
      </Heading>
      <CheckboxStatementList
        statements={statementsList}
        handleSubmit={handleSubmit}
      />
    </>
  );
}

export default FilterQuestions;
