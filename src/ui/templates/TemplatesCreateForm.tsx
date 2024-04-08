"use client";

import { createMaterial } from "@/lib/serverActions/materialsServerActions";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  CalculationRow,
  CreateMaterialForm,
  CreateTemplateForm,
  Material,
  MaterialType,
} from "../../../types";
import { useRouter } from "next/navigation";
import { errorToast, successToast } from "@/lib/toasts";
import Calculator from "@/components/Calculator/Calculator";
import PhotoUploader from "@/components/PhotoUploader/PhotoUploader";
import { useState } from "react";
import { createTemplate } from "@/lib/serverActions/templateServerActions";

type TemplateCreateFormProps = {
  materials: Material[];
};
const TemplateCreateForm = ({ materials }: TemplateCreateFormProps) => {
  const [totalAndRows, setTotalAndRows] = useState<{
    total: number;
    rows: CalculationRow[];
  }>();
  const [photo, setPhoto] = useState<{ src: string; blob?: string }>({
    src: "",
    blob: undefined,
  });
  console.log(
    "🚀Fran ~ file: TemplatesCreateForm.tsx:24 ~ TemplateCreateForm ~ photo:",
    photo
  );
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateTemplateForm>({
    defaultValues: {
      name: "",
      cost: 0,
    },
  });
  const router = useRouter();
  const onSubmit: SubmitHandler<CreateTemplateForm> = (data) =>
    createTemplate({
      name: data.name,
      cost: totalAndRows?.total,
      img: photo.blob,
      items: totalAndRows?.rows,
    })
      .then(() => successToast("Plantilla creado con exito"))
      .catch(() => errorToast("Ha sucedido un error al crear la plantilla"))
      .finally(() => router.replace("/plantillas"));

  return (
    <form
      className="w-full flex flex-col gap-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <label className="font-semibold">Nombre</label>
        <input
          {...register("name", { required: "Nombre es obligatorio" })}
          placeholder="ej. Tazas chinas"
          className={`text-input ${errors.name && "input-error"}`}
        />
      </div>
      <div>
        <label className="font-semibold">
          Imagen <span className="font-light text-sm">{`(opcional)`}</span>
        </label>
        <PhotoUploader setData={setPhoto} />
      </div>
      <div>
        <label className="font-semibold">Calculo de costos</label>
        <Calculator
          materials={materials}
          isContained
          setTotalAndRows={setTotalAndRows}
        />
      </div>
      {/* <div>
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
      </div> */}
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
          disabled={Boolean(Object.keys(errors).length)}
          value="Guardar"
        />
      </div>
    </form>
  );
};

export default TemplateCreateForm;
