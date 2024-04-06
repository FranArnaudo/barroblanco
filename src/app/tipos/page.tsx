import CardWrapper from "@/components/CardWrapper/CardWrapper";
import Header from "@/components/Header/Header";
import TableSkeleton from "@/components/Skeletons/TableSkeleton";
import Table from "@/components/Table/Table";
import { fetchTypesPaginated } from "@/lib/materialTypesApi";
import MaterialTypesTableActions from "@/ui/materialTypes/MaterialTypesTableActions";
import { Suspense } from "react";

const MaterialTypesPage = async () => {
  const types = await fetchTypesPaginated({ name: "", page: "1", take: "15" });
  return (
    <CardWrapper>
      <Header
        title="Tipos de material"
        buttonRef="/tipos/create"
        buttonText="Añadir tipo"
      />
      <div className="w-full">
        <Suspense fallback={<TableSkeleton rows={10} columns={2} />}>
          <Table
            totalPages={types.totalPages}
            items={types.data}
            columns={{
              Nombre: { key: "name" },
              Descripción: { key: "description" },
            }}
            ActionComponent={(props: any) => (
              <MaterialTypesTableActions {...props} />
            )}
          />
        </Suspense>
      </div>
    </CardWrapper>
  );
};

export default MaterialTypesPage;
