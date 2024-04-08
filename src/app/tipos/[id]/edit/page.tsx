import CardWrapper from "@/components/CardWrapper/CardWrapper";
import { fetchTypeById } from "@/lib/serverActions/materialTypeServerActions";
import MaterialTypesEditForm from "@/ui/materialTypes/MaterialTypesEditForm";

type EditMaterialTypeProps = {
  params: {
    id: string;
  };
};
const EditMaterialType = async ({ params }: EditMaterialTypeProps) => {
  const materialTypeData = await fetchTypeById(params.id);
  return (
    <CardWrapper>
      <MaterialTypesEditForm materialType={materialTypeData} />
    </CardWrapper>
  );
};

export default EditMaterialType;
