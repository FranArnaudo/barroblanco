import CardWrapper from "@/components/CardWrapper/CardWrapper";
import MaterialsEditForm from "@/ui/materials/MaterialsEditForm";
import { Material } from "../../../../../types";
import { fetchMaterialById } from "@/lib/serverActions/materialsServerActions";

type EditMaterialPageProps = {
  params: {
    id: string;
  };
};
const EditMaterialPage = async ({ params }: EditMaterialPageProps) => {
  const materialData = await fetchMaterialById(params.id);
  return (
    <CardWrapper>
      <MaterialsEditForm material={materialData as Material} />
    </CardWrapper>
  );
};

export default EditMaterialPage;
