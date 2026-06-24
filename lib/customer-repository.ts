import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type {
  CustomerFormValues,
  CustomerListQuery,
  CustomerRecord,
} from "@/modules/customer/constant";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "customers.json");

async function ensureDataFile() {
  await mkdir(DATA_DIR, { recursive: true });

  try {
    await readFile(DATA_FILE, "utf-8");
  } catch {
    await writeFile(DATA_FILE, "[]", "utf-8");
  }
}

async function readCustomers(): Promise<CustomerRecord[]> {
  await ensureDataFile();
  const content = await readFile(DATA_FILE, "utf-8");
  return JSON.parse(content) as CustomerRecord[];
}

async function writeCustomers(customers: CustomerRecord[]) {
  await ensureDataFile();
  await writeFile(DATA_FILE, JSON.stringify(customers, null, 2), "utf-8");
}

export async function listCustomers(query: CustomerListQuery) {
  const customers = await readCustomers();
  const filtered = customers.filter((item) => {
    const matchName = query.name
      ? item.name.toLowerCase().includes(query.name.toLowerCase())
      : true;
    const matchLevel = query.level ? item.level === query.level : true;
    return matchName && matchLevel;
  });

  const total = filtered.length;
  const start = (query.page - 1) * query.pageSize;
  const list = filtered.slice(start, start + query.pageSize);

  return { list, total };
}

export async function findCustomerById(id: string) {
  const customers = await readCustomers();
  return customers.find((item) => item.id === id) ?? null;
}

export async function createCustomerRecord(values: CustomerFormValues) {
  const customers = await readCustomers();
  const now = new Date().toISOString();
  const record: CustomerRecord = {
    id: randomUUID(),
    name: values.name.trim(),
    level: values.level,
    contact: values.contact?.trim() || null,
    phone: values.phone?.trim() || null,
    email: values.email?.trim() || null,
    remark: values.remark?.trim() || null,
    createdAt: now,
    updatedAt: now,
  };

  customers.unshift(record);
  await writeCustomers(customers);
  return record;
}

export async function updateCustomerRecord(
  id: string,
  values: CustomerFormValues,
) {
  const customers = await readCustomers();
  const index = customers.findIndex((item) => item.id === id);

  if (index === -1) {
    return null;
  }

  const updated: CustomerRecord = {
    ...customers[index],
    name: values.name.trim(),
    level: values.level,
    contact: values.contact?.trim() || null,
    phone: values.phone?.trim() || null,
    email: values.email?.trim() || null,
    remark: values.remark?.trim() || null,
    updatedAt: new Date().toISOString(),
  };

  customers[index] = updated;
  await writeCustomers(customers);
  return updated;
}

export async function deleteCustomerRecord(id: string) {
  const customers = await readCustomers();
  const nextCustomers = customers.filter((item) => item.id !== id);

  if (nextCustomers.length === customers.length) {
    return false;
  }

  await writeCustomers(nextCustomers);
  return true;
}
