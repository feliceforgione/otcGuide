"use client";
import { useGuideStore } from "@/app/stores/guideStore";
import { getStartingUPCs } from "@/app/utils/api";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import Loading from "@/app/guide/_components/Loading";
import Redirect from "@/app/guide/_components/Redirect";

interface Props {
  params: { plan: string };
}

function TreatmentPlanStartUPCS({ params }: Props) {
  const router = useRouter();

  const { isLoading, data: upcs } = useSWR(`upcs/${params.plan}`, () =>
    getStartingUPCs(parseInt(params.plan))
  );

  if (isLoading) return <Loading />;

  useGuideStore.setState((state) => ({
    treatmentPlan: parseInt(params.plan),
  }));

  if (upcs.length === 0)
    return (
      <Redirect link={"/guide/plan"} redirect={true} replaceMethod="replace" />
    );

  const upcArray = upcs.upcs.map((item: { upc: string }) => item.upc);

  useGuideStore.setState((state) => ({
    products: upcArray,
  }));

  return (
    <Redirect
      link={"/guide/upcs/contraindications"}
      redirect={true}
      replaceMethod="replace"
    />
  );

  return <Loading />;
}

export default TreatmentPlanStartUPCS;
