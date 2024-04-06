"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { CreateMaterialTypeForm, MaterialType } from "../../../types";
import { useRouter } from "next/navigation";
import { errorToast, successToast } from "@/lib/toasts";
import { updateMaterialType } from "@/lib/serverActions/materialTypeServerActions";

type MaterialTypesEditFormProps = {
  materialType: MaterialType;
};
const MaterialTypesEditForm = ({
  materialType,
}: MaterialTypesEditFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateMaterialTypeForm>({
    defaultValues: {
      name: materialType.name,
      description: materialType.description,
    },
  });
  const router = useRouter();
  const onSubmit: SubmitHandler<CreateMaterialTypeForm> = (data) =>
    updateMaterialType({ id: materialType.id, ...data })
      .then((res) =>
        successToast(`${materialType.name} actualizado correctamente`)
      )
      .catch(() =>
        errorToast("Ha sucedido un error al actualizar el tipo de material")
      )
      .finally(() => router.replace("/tipos"));
  return (
    <form
      className="w-full flex flex-col gap-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <label className="font-semibold">Nombre</label>
        <input
          {...register("name", { required: "Nombre es obligatorio" })}
          placeholder="ej. Arcilla"
          className={`text-input ${errors.name && "input-error"}`}
        />
      </div>
      <div>
        <label className="font-semibold">Descripción</label>
        <textarea
          {...register("description", { required: "Nombre es obligatorio" })}
          placeholder="ej. Arcilla líquida de color grisáceo"
          className={`text-input min-h-[200px] ${
            errors.description && "input-error"
          }`}
        />
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

export default MaterialTypesEditForm;
