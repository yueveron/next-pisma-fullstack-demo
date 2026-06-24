import type { CustomerListQuery } from "./constant";
import { DEFAULT_PAGE_SIZE } from "./constant";

export function formatListQueryParams(params: {
  name?: string;
  level?: CustomerListQuery["level"];
  page?: number;
  pageSize?: number;
}): CustomerListQuery {
  return {
    name: params.name?.trim() || undefined,
    level: params.level,
    page: params.page ?? 1,
    pageSize: params.pageSize ?? DEFAULT_PAGE_SIZE,
  };
}

export function formatDateTime(value: string): string {
  return new Date(value).toLocaleString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}
