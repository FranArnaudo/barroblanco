"use client";

import { createMaterial } from "@/lib/serverActions/materialsServerActions";
import { useForm, SubmitHandler } from "react-hook-form";
import { CreateMaterialForm } from "../../../types";
import { useRouter } from "next/navigation";

const MaterialsCreateForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateMaterialForm>({
    defaultValues: {
      name: "",
      type: "Arcilla",
      price: 0,
    },
  });
  const router = useRouter();
  const onSubmit: SubmitHandler<CreateMaterialForm> = (data) =>
    createMaterial(data).finally(() => router.replace("/materiales"));
  return (
    <form
      className="w-full flex flex-col gap-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <label className="font-semibold">Nombre</label>
        <input
          {...register("name", { required: "Nombre es obligatorio" })}
          placeholder="ej. Barbotina"
          className={`text-input ${errors.name && "input-error"}`}
        />
      </div>
      <div>
        <label className="font-semibold">Precio</label>
        <div className="flex items-center h-fit">
          <div className={`input-prefix ${errors.price && "input-error"}`}>
            $
          </div>
          <input
            {...register("price", {
              required: "Precio es obligatorio",
              min: { value: 1, message: "Debe ser mayor a 0" },
            })}
            placeholder="ej. 150"
            className={`text-input with-prefix with-suffix ${
              errors.price && "input-error"
            }`}
          />
          <div className={`input-suffix ${errors.price && "input-error"}`}>
            g
          </div>
        </div>
      </div>
      <div>
        <label className="font-semibold">Tipo</label>
        <select {...register("type")} className="text-input">
          <option value={"Arcilla"}>Arcilla</option>
          <option value={"Pigmento"}>Pigmento</option>
        </select>
      </div>
      <div className="flex w-full flex-col gap-1 md:flex-row md:items-center md:justify-end">
        <input
          type="submit"
          className="custom-button w-full md:w-fit"
          role="submit"
          value="Guardar"
        />
        <button
          className="custom-button-secondary w-full md:w-fit"
          type="button"
          role="button"
          onClick={() => router.back()}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default MaterialsCreateForm;
