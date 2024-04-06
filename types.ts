export type CreateMaterialForm = {
  name: string;
  price: number;
  type: string;
};
export type UpdateMaterialForm = {
  name: string;
  price: number;
  type: string;
};

export type Material = {
  id: string;
  name: string;
  type: string;
  createdAt: Date;
  lastUpdate: Date;
  price: number;
};

export type CalculationRow = {
  id: string;
  materialId: string;
  amount: number;
};

export type CalculationSummary = {
  total: number;
  summary: { name: string; cost: number }[];
};

export type MaterialType = {
  id: string;
  name: string;
  description?: string;
};

export type CreateMaterialTypeForm = {
  name: string;
  description?: string;
};
