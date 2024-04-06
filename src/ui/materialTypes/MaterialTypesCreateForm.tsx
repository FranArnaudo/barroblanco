"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { CreateMaterialTypeForm } from "../../../types";
import { useRouter } from "next/navigation";
import { errorToast, successToast } from "@/lib/toasts";
import { createMaterialType } from "@/lib/serverActions/materialTypeServerActions";

const MaterialTypeCreateForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateMaterialTypeForm>({
    defaultValues: {
      name: "",
    },
  });
  const router = useRouter();
  const onSubmit: SubmitHandler<CreateMaterialTypeForm> = (data) =>
    createMaterialType(data)
      .then(() =>
        successToast(`Tipo de material ${data.name} creado con exito`)
      )
      .catch(() =>
        errorToast("Ha sucedido un error al crear el tipo de material")
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

export default MaterialTypeCreateForm;
