import { MedicalHistoryType } from "../stores/guideStore";

export const getAgeGenderGroup = ({ gender, ageGroup }: MedicalHistoryType) => {
  let ageGenderGroup: MedicalHistoryType["ageGenderGroup"];

  switch (gender) {
    case "male":
      ageGenderGroup =
        ageGroup === "child" || ageGroup === "infant"
          ? ageGroup
          : `${ageGroup}_male`;
      break;
    case "female":
      ageGenderGroup =
        ageGroup === "child" || ageGroup === "infant"
          ? ageGroup
          : `${ageGroup}_female`;
      break;

    default:
      ageGenderGroup = gender;
      break;
  }
  return ageGenderGroup;
};

export const getDistinctItems = <T>(
  items: T[],
  idColumn: keyof T,
  valueColumn: keyof T
): {
  id: number;
  itemValue: string;
}[] => {
  const distinctItems = new Set<number>();
  const itemsList: {
    id: number;
    itemValue: string;
  }[] = [];

  for (const item of items!) {
    if (!distinctItems.has(item[idColumn] as number)) {
      distinctItems.add(item[idColumn] as number);
      itemsList.push({
        id: item[idColumn] as number,
        itemValue: item[valueColumn] as string,
      });
    }
  }

  return itemsList;
};

export const filterRecordSet = <T>(
  data: T[],
  columnToFilterBy: keyof T,
  valuesToFilterOut: string[],
  columnToReturnDistinctValuesFrom: keyof T
) => {
  return Array.from(
    new Set(
      data
        ?.filter((row) =>
          valuesToFilterOut.includes(String(row[columnToFilterBy]))
        )
        .map((row) => row[columnToReturnDistinctValuesFrom])
    )
  );
};

export const removeItemsFromArray = <T>(
  originalArray: T[],
  itemsToRemove: T[]
) => {
  return originalArray.filter((item) => !itemsToRemove.includes(item));
};
