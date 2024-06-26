"use client";

import { createMaterial } from "@/lib/serverActions/materialsServerActions";
import { useForm, SubmitHandler } from "react-hook-form";
import { CreateMaterialForm, MaterialType } from "../../../types";
import { useRouter } from "next/navigation";
import { errorToast, successToast } from "@/lib/toasts";

type MaterialsCreateFormProps = {
  materialTypes: MaterialType[];
};
const MaterialsCreateForm = ({ materialTypes }: MaterialsCreateFormProps) => {
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
    createMaterial(data)
      .then(() => successToast("Material creado con exito"))
      .catch(() => errorToast("Ha sucedido un error al crear el material"))
      .finally(() => router.replace("/materiales"));
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
          {materialTypes.map((type) => (
            <option key={type.id} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex w-full flex-col gap-1 md:flex-row md:items-center md:justify-end">
        <button
          className="custom-button-secondary w-full md:w-fit"
          type="button"
          role="button"
          onClick={() => router.back()}
        >
          Cancelar
        </button>
        <input
          type="submit"
          className="custom-button w-full md:w-fit"
          role="submit"
          value="Guardar"
        />
      </div>
    </form>
  );
};

export default MaterialsCreateForm;
