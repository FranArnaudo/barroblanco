import Table from "@/components/Table/Table";
import { unstable_noStore as noStore } from "next/cache";
import MaterialsSearch from "@/ui/materials/MaterialsSearch";
import MaterialsTableActions from "@/ui/materials/MaterialsTableActions";
import { Suspense } from "react";
import TableSkeleton from "@/components/Skeletons/TableSkeleton";
import CardWrapper from "@/components/CardWrapper/CardWrapper";
import Header from "@/components/Header/Header";
import { fetchAllTypes } from "@/lib/serverActions/materialTypeServerActions";
import { fetchMaterialsPaginated } from "@/lib/serverActions/materialsServerActions";

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
  const { data: materials, totalPages } = await fetchMaterialsPaginated(
    searchParams
  );
  const materialTypes = await fetchAllTypes();
  return (
    <CardWrapper>
      <Header
        title="Materiales"
        buttonRef="materiales/create"
        buttonText="Añadir Material"
      />
      <MaterialsSearch materialTypes={materialTypes} />
      <div className="w-full">
        <Suspense fallback={<TableSkeleton rows={10} columns={3} />}>
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
        </Suspense>
      </div>
    </CardWrapper>
  );
};

export default MaterialsPage;
