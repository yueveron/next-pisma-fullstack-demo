"use client";

import { useCallback, useEffect, useState } from "react";
import { message } from "antd";
import {
  createCustomer,
  updateCustomer,
} from "@/app/actions/customer";
import type { CustomerListItem } from "@/app/actions/customer";
import type { CustomerFormValues } from "../constant";
import { formatSubmitValues, validateCustomerForm } from "../utils";

type UseCustomerFormOptions = {
  open: boolean;
  editingRecord: CustomerListItem | null;
  onSuccess: () => void;
  onClose: () => void;
};

export function useCustomerForm(options: UseCustomerFormOptions) {
  const { open, editingRecord, onSuccess, onClose } = options;
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = useCallback(
    async (values: CustomerFormValues) => {
      const validationMessage = validateCustomerForm(values);
      if (validationMessage) {
        message.error(validationMessage);
        return false;
      }

      setSubmitting(true);
      try {
        const payload = formatSubmitValues(values);
        const result = editingRecord
          ? await updateCustomer(editingRecord.id, payload)
          : await createCustomer(payload);

        if (!result.success) {
          message.error(result.message);
          return false;
        }

        message.success(editingRecord ? "更新客户成功" : "新增客户成功");
        onSuccess();
        onClose();
        return true;
      } catch {
        message.error(editingRecord ? "更新客户失败" : "新增客户失败");
        return false;
      } finally {
        setSubmitting(false);
      }
    },
    [editingRecord, onClose, onSuccess],
  );

  useEffect(() => {
    if (!open) {
      setSubmitting(false);
    }
  }, [open]);

  return {
    submitting,
    handleSubmit,
    isEditMode: Boolean(editingRecord),
  };
}
