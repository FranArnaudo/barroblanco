import IconButton from "@/components/Buttons/IconButton";
import Table from "@/components/Table/Table";
import { fetchMaterials } from "@/lib/materialsApi";
import { MaterialSymbolsEditOutline, MdiTrashOutline } from "@/ui/icons/Icons";
import { unstable_noStore as noStore } from "next/cache";
import MaterialsSearch from "@/ui/materials/MaterialsSearch";
import MaterialsTableActions from "@/ui/materials/MaterialsTableActions";

const MaterialsPage = async ({
  searchParams,
}: {
  searchParams: {
    name: string;
    type: string;
    page: string;
    take: string;
  };
}) => {
  noStore();
  const { data: materials, totalPages } = await fetchMaterials(searchParams);
  return (
    <div className="w-full flex items-center justify-center ">
      <div className="w-full flex items-center justify-center rounded-lg flex-col shadow-2xl pt-10 pl-4 pr-5 pb-10 md:m-12 md:p-12  md:mt-0 gap-4 bg-white">
        <h1 className="text-bold text-4xl self-start">Materiales</h1>
        <MaterialsSearch />
        <div className="w-full">
          <Table
            items={materials}
            totalPages={totalPages}
            columns={{
              Nombre: { key: "name" },
              Precio: { key: "price", prefix: "$" },
              Tipo: { key: "type" },
            }}
            ActionComponent={(props: any) => (
              <MaterialsTableActions {...props} />
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default MaterialsPage;
