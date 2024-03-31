"use server";

import { revalidatePath } from "next/cache";
import clientPromise from "../mongodb";
import { CalculationRow, CalculationSummary, Material } from "../../../types";
import { uuid } from "uuidv4";

export const createMaterial = async (data: any) => {
  const client = await clientPromise;
  client
    .db(process.env.DATABASE_NAME)
    .collection("materials")
    .insertOne({
      ...data,
      id: uuid(),
      createdAt: new Date(),
      lastUpdated: new Date(),
    });
  revalidatePath("/materials");
};

export const calculate = async (rows: CalculationRow[]) => {
  const idsOfMaterialsToFind = rows.map((row) => row.materialId);
  const client = await clientPromise;
  const materials = await client
    .db(process.env.DATABASE_NAME)
    .collection<Material>("materials")
    .find({ id: { $in: idsOfMaterialsToFind } })
    .toArray();

  const final = materials.reduce<CalculationSummary>(
    (accum, current) => {
      const row = rows.find((row) => {
        return row.materialId === current.id;
      });
      console.log(
        "🚀Fran ~ file: materialsServerActions.ts:32 ~ calculate ~ row:",
        row
      );
      if (!row) {
        return accum; // Skip if no matching row found
      }

      const amount = row.amount;
      const cost = amount * current.price;

      // Add the cost to the total
      accum.total += cost;
      accum.summary.push({ name: current.name, cost });

      return accum;
    },
    { total: 0, summary: [] }
  );
  console.log("fran", final);
  return final;
};
