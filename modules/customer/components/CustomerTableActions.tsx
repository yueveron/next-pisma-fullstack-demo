"use client";

import { memo, useCallback } from "react";
import Link from "next/link";
import { Button, Space } from "antd";
import type { CustomerListItem } from "@/app/actions/customer";

type CustomerTableActionsProps = {
  record: CustomerListItem;
  onEdit: (record: CustomerListItem) => void;
  onDelete: (record: CustomerListItem) => void;
};

function CustomerTableActionsComponent({
  record,
  onEdit,
  onDelete,
}: CustomerTableActionsProps) {
  const handleEdit = useCallback(() => {
    onEdit(record);
  }, [onEdit, record]);

  const handleDelete = useCallback(() => {
    onDelete(record);
  }, [onDelete, record]);

  return (
    <Space size="middle">
      <Link href={`/customer/${record.id}`}>详情</Link>
      <Button type="link" onClick={handleEdit}>
        编辑
      </Button>
      <Button type="link" danger onClick={handleDelete}>
        删除
      </Button>
    </Space>
  );
}

export const CustomerTableActions = memo(CustomerTableActionsComponent);
