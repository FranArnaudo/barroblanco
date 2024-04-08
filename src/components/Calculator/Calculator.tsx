"use client";

import { MdiTrashOutline, TypcnPlus } from "@/ui/icons/Icons";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { uuid } from "uuidv4";
import { debounce } from "lodash";
import { calculate } from "@/lib/serverActions/materialsServerActions";
import { CalculationRow, CalculationSummary, Material } from "../../../types";

//Types

type CalculatorProps = {
  materials: Material[];
  isContained?: boolean;
  setTotalAndRows?: Dispatch<
    SetStateAction<
      | {
          total: number;
          rows: CalculationRow[];
        }
      | undefined
    >
  >;
};

const Calculator = ({
  materials,
  isContained,
  setTotalAndRows,
}: CalculatorProps) => {
  const [rows, setRows] = useState<CalculationRow[]>([]);
  const [loadingCalculation, setLoadingCalculation] = useState<boolean>(false);
  const [calculationResult, setCalculationResult] = useState<
    CalculationSummary | undefined
  >();
  const addCalculationRow = () => {
    const id = uuid();
    setRows((prev) => [...prev, { id, materialId: "", amount: 0 }]);
  };
  const deleteCalculationRow = (id: string) => {
    const newRows = rows.filter((row) => row.id !== id);
    setRows(newRows);
  };
  const updateCalculationRow = (data: CalculationRow) => {
    const indexToModify = rows.findIndex((row) => row.id === data.id);
    let newRows = rows;
    newRows[indexToModify] = data;
    setRows(newRows);
  };
  const handleCalculate = async () => {
    setLoadingCalculation(true);
    const calcResult = await calculate(rows);
    setCalculationResult(calcResult);
    if (setTotalAndRows) {
      setTotalAndRows({ rows, total: calcResult.total });
    }
    setLoadingCalculation(false);
  };
  return (
    <div className="w-full">
      {calculationResult && (
        <div className="rounded-lg shadow-lg w-full h-32 flex flex-col p-2 px-4">
          <span className="font-bold text-xl self-center">
            Total: ${calculationResult.total}
          </span>
          {calculationResult.summary.map((calcRow) => (
            <div key={`${calcRow.name + calcRow.cost}`} className="flex">
              <span className="font-semibold">{calcRow.name}: </span>
              <span className="font-medium">${calcRow.cost}</span>
            </div>
          ))}
        </div>
      )}
      {rows.length > 0 ? (
        rows.map((row) => (
          <Row
            key={row.id}
            row={row}
            deleteRow={deleteCalculationRow}
            updateRow={updateCalculationRow}
            materials={materials}
          />
        ))
      ) : (
        <div className="w-full flex justify-center items-center h-16">
          <span className="w-full text-center">
            Añadí una fila para empezar
          </span>
        </div>
      )}
      <div
        className={`flex md:flex-row gap-2 w-full md:justify-center pt-4 ${
          isContained ? "children:max-w-1/2 justify-center" : "flex-col"
        }`}
      >
        <button
          type="button"
          onClick={addCalculationRow}
          disabled={loadingCalculation}
          className="custom-button"
        >
          Añadir fila
        </button>
        <button
          onClick={handleCalculate}
          disabled={loadingCalculation || !rows.length}
          className="custom-button"
        >
          Calcular
        </button>
      </div>
    </div>
  );
};

export default Calculator;

type RowProps = {
  row: CalculationRow;
  materials: Material[];
  deleteRow: (id: string) => void;
  updateRow: (data: CalculationRow) => void;
};
const Row = ({ row, materials, deleteRow, updateRow }: RowProps) => {
  const [localRowValues, setLocalRowValues] = useState<CalculationRow>(row);
  const handleChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    console.log({ ...localRowValues, [e.target.name]: e.target.value });
    const newRowValues = { ...localRowValues, [e.target.name]: e.target.value };
    updateRow(newRowValues);
    setLocalRowValues(newRowValues);
  };
  return (
    <div className="grid grid-cols-12 grid-rows-2 gap-x-1 ">
      <label className="row-start-1 row-end-1 col-span-6 self-end">
        Material
      </label>
      <select
        className="row-start-2 row-end-2 col-span-6  text-input"
        name="materialId"
        onChange={handleChange}
      >
        <option selected hidden></option>
        {materials.map((material) => (
          <option key={material.id} value={material.id}>
            {material.name}
          </option>
        ))}
      </select>
      <label className="row-start-1 row-end-1 col-span-2 self-end">
        Cantidad
      </label>
      <input
        type="number"
        onChange={debounce(handleChange, 400)}
        name="amount"
        className=" row-start-2 row-end-2 col-span-4 text-input"
      />
      <button
        onClick={() => deleteRow(row.id)}
        className="row-start-2 row-end-2 col-span-4 custom-button"
      >
        <MdiTrashOutline />
      </button>
    </div>
  );
};
