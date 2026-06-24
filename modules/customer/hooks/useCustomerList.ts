"use client";

import { useCallback, useEffect, useState } from "react";
import { message, Modal } from "antd";
import {
  deleteCustomer,
  getCustomers,
} from "@/app/actions/customer";
import type { CustomerListItem } from "@/app/actions/customer";
import type { CustomerLevel } from "../constant";
import {
  DEFAULT_PAGE_SIZE,
  REFRESH_LIST_EVENT,
} from "../constant";
import { formatListQueryParams } from "../utils";

const DEBOUNCE_MS = 300;

export function useCustomerList() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<CustomerListItem[]>([]);
  const [total, setTotal] = useState(0);
  const [nameKeyword, setNameKeyword] = useState("");
  const [debouncedName, setDebouncedName] = useState("");
  const [level, setLevel] = useState<CustomerLevel | undefined>();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<CustomerListItem | null>(
    null,
  );

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedName(nameKeyword.trim());
      setPage(1);
    }, DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
  }, [nameKeyword]);

  const fetchList = useCallback(async () => {
    setLoading(true);
    try {
      const params = formatListQueryParams({
        name: debouncedName,
        level,
        page,
        pageSize,
      });
      const result = await getCustomers(params);

      if (result.success) {
        setDataSource(result.data.list);
        setTotal(result.data.total);
      } else {
        message.error(result.message);
      }
    } catch {
      message.error("获取客户列表失败");
    } finally {
      setLoading(false);
    }
  }, [debouncedName, level, page, pageSize]);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  useEffect(() => {
    const handleRefresh = () => {
      fetchList();
    };

    window.addEventListener(REFRESH_LIST_EVENT, handleRefresh);
    return () => window.removeEventListener(REFRESH_LIST_EVENT, handleRefresh);
  }, [fetchList]);

  const handleNameChange = useCallback((value: string) => {
    setNameKeyword(value);
  }, []);

  const handleLevelChange = useCallback((value: CustomerLevel | undefined) => {
    setLevel(value);
    setPage(1);
  }, []);

  const handlePageChange = useCallback((nextPage: number, nextPageSize: number) => {
    setPage(nextPage);
    setPageSize(nextPageSize);
  }, []);

  const handleOpenCreate = useCallback(() => {
    setEditingRecord(null);
    setModalOpen(true);
  }, []);

  const handleOpenEdit = useCallback((record: CustomerListItem) => {
    setEditingRecord(record);
    setModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
    setEditingRecord(null);
  }, []);

  const handleModalSuccess = useCallback(() => {
    window.dispatchEvent(new Event(REFRESH_LIST_EVENT));
  }, []);

  const handleDelete = useCallback(
    (record: CustomerListItem) => {
      Modal.confirm({
        title: "确认删除",
        content: `确定要删除客户「${record.name}」吗？此操作不可恢复。`,
        okText: "删除",
        okType: "danger",
        cancelText: "取消",
        onOk: async () => {
          try {
            const result = await deleteCustomer(record.id);
            if (result.success) {
              message.success("删除客户成功");
              fetchList();
            } else {
              message.error(result.message);
            }
          } catch {
            message.error("删除客户失败");
          }
        },
      });
    },
    [fetchList],
  );

  return {
    loading,
    dataSource,
    total,
    nameKeyword,
    level,
    page,
    pageSize,
    modalOpen,
    editingRecord,
    handleNameChange,
    handleLevelChange,
    handlePageChange,
    handleOpenCreate,
    handleOpenEdit,
    handleCloseModal,
    handleModalSuccess,
    handleDelete,
    refreshList: fetchList,
  };
}
