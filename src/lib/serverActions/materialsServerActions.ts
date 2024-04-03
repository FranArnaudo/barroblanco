"use server";

import { revalidatePath } from "next/cache";
import clientPromise from "../mongodb";
import { CalculationRow, CalculationSummary, Material } from "../../../types";
import { uuid } from "uuidv4";

export const createMaterial = async (data: Partial<Material>) => {
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
  revalidatePath("/materiales");
};
export const updateMaterial = async (data: Partial<Material>) => {
  const client = await clientPromise;
  const response = await client
    .db(process.env.DATABASE_NAME)
    .collection("materials")
    .findOneAndUpdate(
      { id: data.id },
      {
        $set: {
          name: data.name,
          price: data.price,
          type: data.type,
          lastUpdated: new Date(),
        },
      }
    );
  console.log(
    "🚀Fran ~ file: materialsServerActions.ts:27 ~ updateMaterial ~ response:",
    response
  );
  revalidatePath("/materiales");
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
      if (!row) {
        return accum;
      }

      const amount = row.amount;
      const cost = amount * current.price;

      accum.total += cost;
      accum.summary.push({ name: current.name, cost });

      return accum;
    },
    { total: 0, summary: [] }
  );
  console.log("fran", final);
  return final;
};
