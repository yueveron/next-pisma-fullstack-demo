"use client";

import { useCallback, useEffect, useState } from "react";
import { message } from "antd";
import { getCustomerById } from "@/app/actions/customer";
import type { CustomerListItem } from "@/app/actions/customer";

export function useCustomerDetail(id: string) {
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState<CustomerListItem | null>(null);

  const fetchDetail = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getCustomerById(id);
      if (result.success) {
        setDetail(result.data);
      } else {
        message.error(result.message);
        setDetail(null);
      }
    } catch {
      message.error("获取客户详情失败");
      setDetail(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  return {
    loading,
    detail,
    refresh: fetchDetail,
  };
}
