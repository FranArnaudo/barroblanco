import CardWrapper from "@/components/CardWrapper/CardWrapper";
import { fetchAllMaterials } from "@/lib/serverActions/materialsServerActions";
import TemplateCreateForm from "@/ui/templates/TemplatesCreateForm";

const TemplatesCreatePage = async () => {
  const materials = await fetchAllMaterials();
  console.log(
    "🚀Fran ~ file: page.tsx:7 ~ TemplatesCreatePage ~ materials:",
    materials
  );
  return (
    <CardWrapper>
      <TemplateCreateForm materials={materials} />
    </CardWrapper>
  );
};

export default TemplatesCreatePage;
