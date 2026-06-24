import type { CustomerFormValues } from "../../constant";

export function formatSubmitValues(
  values: CustomerFormValues,
): CustomerFormValues {
  return {
    name: values.name.trim(),
    level: values.level,
    contact: values.contact?.trim(),
    phone: values.phone?.trim(),
    email: values.email?.trim(),
    remark: values.remark?.trim(),
  };
}

export function validateCustomerForm(values: CustomerFormValues): string | null {
  if (!values.name?.trim()) {
    return "请输入客户名称";
  }

  if (values.name.trim().length > 100) {
    return "客户名称不能超过 100 个字符";
  }

  if (values.phone && !/^1[3-9]\d{9}$/.test(values.phone.trim())) {
    return "请输入正确的手机号";
  }

  if (
    values.email &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())
  ) {
    return "请输入正确的邮箱地址";
  }

  return null;
}
