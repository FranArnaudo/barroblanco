import CardWrapper from "@/components/CardWrapper/CardWrapper";
import { fetchAllMaterials } from "@/lib/serverActions/materialsServerActions";
import TemplateCreateForm from "@/ui/templates/TemplatesCreateForm";

const TemplatesCreatePage = async () => {
  const materials = await fetchAllMaterials();
  return (
    <CardWrapper>
      <TemplateCreateForm materials={materials} />
    </CardWrapper>
  );
};

export default TemplatesCreatePage;
