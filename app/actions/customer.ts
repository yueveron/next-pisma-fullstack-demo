"use server";

import {
  createCustomerRecord,
  deleteCustomerRecord,
  findCustomerById,
  listCustomers,
  updateCustomerRecord,
} from "@/lib/customer-repository";
import type {
  CustomerFormValues,
  CustomerListQuery,
  CustomerRecord,
} from "@/modules/customer/constant";

type ActionResult<T = void> =
  | { success: true; data: T }
  | { success: false; message: string };

export type CustomerListItem = CustomerRecord;

export type CustomerListData = {
  list: CustomerListItem[];
  total: number;
};

export async function getCustomers(
  query: CustomerListQuery,
): Promise<ActionResult<CustomerListData>> {
  try {
    const data = await listCustomers(query);
    return { success: true, data };
  } catch {
    return { success: false, message: "获取客户列表失败" };
  }
}

export async function getCustomerById(
  id: string,
): Promise<ActionResult<CustomerListItem>> {
  try {
    const customer = await findCustomerById(id);

    if (!customer) {
      return { success: false, message: "客户不存在" };
    }

    return { success: true, data: customer };
  } catch {
    return { success: false, message: "获取客户详情失败" };
  }
}

export async function createCustomer(
  values: CustomerFormValues,
): Promise<ActionResult<CustomerListItem>> {
  try {
    const customer = await createCustomerRecord(values);
    return { success: true, data: customer };
  } catch {
    return { success: false, message: "新增客户失败" };
  }
}

export async function updateCustomer(
  id: string,
  values: CustomerFormValues,
): Promise<ActionResult<CustomerListItem>> {
  try {
    const customer = await updateCustomerRecord(id, values);

    if (!customer) {
      return { success: false, message: "客户不存在" };
    }

    return { success: true, data: customer };
  } catch {
    return { success: false, message: "更新客户失败" };
  }
}

export async function deleteCustomer(id: string): Promise<ActionResult> {
  try {
    const deleted = await deleteCustomerRecord(id);

    if (!deleted) {
      return { success: false, message: "客户不存在" };
    }

    return { success: true, data: undefined };
  } catch {
    return { success: false, message: "删除客户失败" };
  }
}
