"use client";
import { useGuideStore } from "@/app/stores/guideStore";
import { getTreatmentPlan } from "@/app/utils/api";
import { Tabs, Box, Text, Heading, Grid, Flex, Button } from "@radix-ui/themes";

import React from "react";
import useSWR from "swr";
import Redirect from "../_components/Redirect";
import Loading from "../_components/Loading";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import stockProduct from "@/public/images/stockProduct.png";
import { Cross1Icon } from "@radix-ui/react-icons";

type Plan = Prisma.treatment_planGetPayload<{
  include: {
    treatment_advice: {
      include: {
        treatment_advice: true;
      };
    };
    upcs: {
      include: {
        upc_product: {
          include: {
            brand: true;
            manufacturer: true;
            images: true;
          };
        };
      };
    };
  };
}>;

function Plan() {
  const treatmentPlanId = useGuideStore.getState().treatmentPlan;
  const upcs = useGuideStore.getState().products;

  const { isLoading, data: treatmentPlan } = useSWR<Plan>(
    `plan/${treatmentPlanId}`,
    () => getTreatmentPlan(treatmentPlanId!, upcs.join(","))
  );
  if (isLoading) return <Loading />;
  if (!treatmentPlan || !treatmentPlanId) {
    return (
      <Redirect
        link={"/guide/consult-professional?error=4"}
        redirect={true}
        replaceMethod="replace"
      />
    );
  }

  const tabs = Array.from(
    { length: treatmentPlan.tabs_num - 2 },
    (_, i) => i + 3
  );

  console.log(treatmentPlan);

  const pharmAdvice = treatmentPlan.treatment_advice.filter(
    (advice) => advice.advice_type === "pharm"
  );

  const nonPharmAdvice = treatmentPlan.treatment_advice.filter(
    (advice) => advice.advice_type === "nonpharm"
  );

  //const products = treatmentPlan.upcs.filter((upc) => upc.treatment_line === 1);

  return (
    <>
      <Flex
        className="pageHeading"
        justify={"center"}
        align={"center"}
        gap={"1"}
      >
        <Heading>Treatment Plan :</Heading>
        <Text size={"6"}>{treatmentPlan.plan_name} </Text>
        <Text size={"4"}>({treatmentPlanId})</Text>
      </Flex>
      <div>
        <Tabs.Root defaultValue="guidance">
          <Tabs.List>
            <Tabs.Trigger value="guidance">
              <Text size={"6"}>Guidance</Text>
            </Tabs.Trigger>
            <Tabs.Trigger value="advice">
              <Text size={"6"}>Advice</Text>
            </Tabs.Trigger>
            {treatmentPlan.tab3_label && (
              <Tabs.Trigger value={treatmentPlan.tab3_label}>
                <Text size={"6"}>{treatmentPlan.tab3_label}</Text>
              </Tabs.Trigger>
            )}
            {treatmentPlan.tab4_label && (
              <Tabs.Trigger value={treatmentPlan.tab4_label}>
                <Text size={"6"}>{treatmentPlan.tab4_label}</Text>
              </Tabs.Trigger>
            )}
            {treatmentPlan.tab5_label && (
              <Tabs.Trigger value={treatmentPlan.tab5_label}>
                <Text size={"6"}>{treatmentPlan.tab5_label}</Text>
              </Tabs.Trigger>
            )}
          </Tabs.List>

          <Box px="4" pt="3" pb="2">
            <Tabs.Content value="guidance">
              <AdviceContent advice={pharmAdvice} />
            </Tabs.Content>

            <Tabs.Content value="advice">
              <AdviceContent advice={nonPharmAdvice} />
            </Tabs.Content>

            {treatmentPlan.tab3_label && (
              <ProductsTabContent
                upcs={treatmentPlan.upcs}
                treatmentLine={1}
                tabLabel={treatmentPlan.tab3_label}
              />
            )}
            {treatmentPlan.tab4_label && (
              <ProductsTabContent
                upcs={treatmentPlan.upcs}
                treatmentLine={2}
                tabLabel={treatmentPlan.tab4_label}
              />
            )}
            {treatmentPlan.tab5_label && (
              <ProductsTabContent
                upcs={treatmentPlan.upcs}
                treatmentLine={3}
                tabLabel={treatmentPlan.tab5_label}
              />
            )}
          </Box>
        </Tabs.Root>
      </div>
    </>
  );
}

function ProductsTabContent({
  upcs,
  treatmentLine,
  tabLabel,
}: {
  upcs: Plan["upcs"];
  treatmentLine: number;
  tabLabel: string;
}) {
  const products = upcs.filter((upc) => upc.treatment_line === treatmentLine);
  if (products.length === 0)
    return (
      <Tabs.Content value={tabLabel}>
        <p>No products are recommended based on your selections</p>
      </Tabs.Content>
    );
  console.log("Products : ", products);
  return (
    <Tabs.Content value={tabLabel}>
      <Box className="gap-3 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.upc} upc={product.upc_product} />
        ))}
      </Box>
    </Tabs.Content>
  );
}

function ProductCard({ upc }: { upc: Plan["upcs"][0]["upc_product"] }) {
  console.log(upc);
  return (
    <Box
      key={upc?.upc}
      className="w-full  bg-white border border-gray-200 rounded-lg shadow"
    >
      <Box className="flex justify-center">
        <a href="#">
          {!upc?.main_image ? (
            <Image
              src={stockProduct}
              alt=""
              className="w-60 h-52 object-contain py-3 rounded-t-lg"
            />
          ) : (
            <picture>
              <img
                src={upc?.main_image}
                alt=""
                className="w-60 h-52 object-contain py-3 rounded-t-lg"
              />
            </picture>
          )}
        </a>
      </Box>
      <div className="px-5 pb-5">
        <>
          <Dialog.Root>
            <Dialog.Trigger>
              <Heading size={"4"}>{upc?.item_name}</Heading>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/50" />
              <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-gray-900 p-6 shadow rounded-md w-5/6 sm:w-[500px] md:w-[700px] lg:w-[900px]">
                <Box className="flex items-center justify-between ">
                  <Dialog.Title>
                    <p className="text-xl">Product Details</p>
                  </Dialog.Title>
                  <Dialog.Close>
                    <Cross1Icon width="20" height="20" />
                  </Dialog.Close>
                </Box>
                <hr className="my-4" />
                <ProductDetailModalContent upc={upc} />
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </>
        <Text as={"p"}>{upc?.upc}</Text>
        <Text as="p">{upc?.brand?.brand_name}</Text>
        <a href={upc?.images[1]?.link}>image</a>
      </div>
    </Box>
  );
}

function ProductDetailModalContent({
  upc,
}: {
  upc: Plan["upcs"][0]["upc_product"];
}) {
  return (
    <>
      <Box className="gap-3 grid grid-cols-1  md:grid-cols-2 ">
        <Box className="">
          {!upc?.main_image ? (
            <Image
              src={stockProduct}
              alt=""
              className="max-w-96 max-h-96 object-contain"
            />
          ) : (
            <picture>
              <img
                src={upc?.main_image}
                alt=""
                className="max-w-96 max-h-96 object-contain"
              />
            </picture>
          )}
        </Box>
        <Box className="px-5 pb-5">
          <Text as="p" className="text-xl font-semibold">
            {upc?.item_name}
          </Text>
          <Text as="p">{upc?.brand?.brand_name}</Text>
          <Text as={"p"}>{upc?.upc}</Text>
        </Box>
      </Box>
    </>
  );
}

function AdviceContent({ advice }: { advice: Plan["treatment_advice"] }) {
  console.log(advice);
  return (
    <Box>
      {advice.map((adviceRow) => (
        <Box key={adviceRow.advice_id} className="my-6">
          <Heading>{adviceRow.treatment_advice.title}</Heading>
          <Text as={"p"}>{adviceRow.treatment_advice.text}</Text>
          <ul className="list-disc list-inside ml-4">
            {adviceRow.treatment_advice.list?.split("||").map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Box>
      ))}
    </Box>
  );
}

/*   src="/images/products/310310232108.jpg"    */

export default Plan;
