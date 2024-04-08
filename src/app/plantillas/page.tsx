import CardWrapper from "@/components/CardWrapper/CardWrapper";
import Header from "@/components/Header/Header";
import { fetchAllTemplates } from "@/lib/serverActions/templateServerActions";
import TemplateCard from "@/ui/templates/TemplateCard";

const PlantillasPage = async () => {
  const templates = await fetchAllTemplates();
  return (
    <CardWrapper>
      <Header
        title="Plantillas"
        buttonText="Añadir plantilla"
        buttonRef="/plantillas/create"
      />
      <div>
        {templates.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>
    </CardWrapper>
  );
};

export default PlantillasPage;
