import Table from "@/components/Table/Table";
import { fetchMaterialsPaginated } from "@/lib/materialsApi";
import { unstable_noStore as noStore } from "next/cache";
import MaterialsSearch from "@/ui/materials/MaterialsSearch";
import MaterialsTableActions from "@/ui/materials/MaterialsTableActions";
import { Suspense } from "react";
import TableSkeleton from "@/components/Skeletons/TableSkeleton";
import CardWrapper from "@/components/CardWrapper/CardWrapper";
import { successToast } from "@/lib/toasts";
import Header from "@/components/Header/Header";

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
  successToast("a");
  return (
    <CardWrapper>
      <Header
        title="Materiales"
        buttonRef="materiales/create"
        buttonText="Añadir Material"
      />
      <MaterialsSearch />
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
