export type CustomerLevel = "NORMAL" | "IMPORTANT" | "VIP";

export const CustomerLevel = {
  NORMAL: "NORMAL",
  IMPORTANT: "IMPORTANT",
  VIP: "VIP",
} as const satisfies Record<CustomerLevel, CustomerLevel>;

export const BASE_URL = "/customer";
export const PAGE_TITLE = "客户管理";
export const REFRESH_LIST_EVENT = "customer:refresh-list";

export type CustomerListQuery = {
  name?: string;
  level?: CustomerLevel;
  page: number;
  pageSize: number;
};

export type CustomerFormValues = {
  name: string;
  level: CustomerLevel;
  contact?: string;
  phone?: string;
  email?: string;
  remark?: string;
};

export type CustomerRecord = {
  id: string;
  name: string;
  level: CustomerLevel;
  contact: string | null;
  phone: string | null;
  email: string | null;
  remark: string | null;
  createdAt: string;
  updatedAt: string;
};

export const DEFAULT_PAGE_SIZE = 10;

export const CUSTOMER_LEVEL_MAP: Record<
  CustomerLevel,
  { label: string; color: string }
> = {
  NORMAL: { label: "普通", color: "default" },
  IMPORTANT: { label: "重要", color: "orange" },
  VIP: { label: "VIP", color: "gold" },
};

export const CUSTOMER_LEVEL_OPTIONS = (
  Object.entries(CUSTOMER_LEVEL_MAP) as [CustomerLevel, { label: string }][]
).map(([value, { label }]) => ({
  label,
  value,
}));
