import CardWrapper from "@/components/CardWrapper/CardWrapper";
import { fetchAllTypes } from "@/lib/materialTypesApi";
import MaterialsCreateForm from "@/ui/materials/MaterialsCreateForm";

const CreateMaterialPage = async () => {
  const materialTypes = await fetchAllTypes();
  return (
    <CardWrapper>
      <MaterialsCreateForm materialTypes={materialTypes} />
    </CardWrapper>
  );
};

export default CreateMaterialPage;
