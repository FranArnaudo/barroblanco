// MATERIALS
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

// CALCULATIONS
export type CalculationRow = {
  id: string;
  materialId: string;
  amount: number;
};
export type CalculationSummary = {
  total: number;
  summary: { name: string; cost: number }[];
};

// TEMPLATES
export type Template = {
  id: string;
  name: string;
  cost: number;
  items: CalculationRow[];
  img?: string;
  createdAt: Date;
  lastUpdated: Date;
};
export type CreateTemplateForm = {
  name: string;
  cost: number;
  items: CalculationRow[];
  img?: {
    src: string;
    blob?: string;
  };
  createdAt: Date;
  lastUpdated: Date;
};

// MATERIAL TYPES
export type MaterialType = {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  lastUpdate: Date;
};

export type CreateMaterialTypeForm = {
  name: string;
  description?: string;
};

// USER
export type User = {
  id: string;
  email: string;
  password: string;
  verified: boolean;
};

export type UserForm = {
  email: string;
  password: string;
};
