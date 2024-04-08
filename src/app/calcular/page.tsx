import Calculator from "@/components/Calculator/Calculator";
import CardWrapper from "@/components/CardWrapper/CardWrapper";
import Header from "@/components/Header/Header";
import { fetchAllMaterials } from "@/lib/serverActions/materialsServerActions";

const CalculationPage = async () => {
  const materials = await fetchAllMaterials();
  return (
    <CardWrapper>
      <Header title="Calcular" />
      <div className="w-full">
        <Calculator materials={JSON.parse(JSON.stringify(materials))} />
      </div>
    </CardWrapper>
  );
};

export default CalculationPage;
