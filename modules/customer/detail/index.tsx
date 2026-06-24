"use client";

import { memo, useMemo } from "react";
import Link from "next/link";
import { Button, Card, Descriptions, Spin, Tag } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import {
  BASE_URL,
  CUSTOMER_LEVEL_MAP,
  PAGE_TITLE,
} from "../constant";
import { formatDateTime } from "../utils";
import { useCustomerDetail } from "./hooks/useCustomerDetail";

type CustomerDetailProps = {
  id: string;
};

function CustomerDetailComponent({ id }: CustomerDetailProps) {
  const { loading, detail } = useCustomerDetail(id);

  const levelTag = useMemo(() => {
    if (!detail) {
      return null;
    }

    const config = CUSTOMER_LEVEL_MAP[detail.level];
    return <Tag color={config.color}>{config.label}</Tag>;
  }, [detail]);

  const descriptionItems = useMemo(() => {
    if (!detail) {
      return [];
    }

    return [
      { key: "name", label: "客户名称", children: detail.name },
      { key: "level", label: "客户级别", children: levelTag },
      { key: "contact", label: "联系人", children: detail.contact || "-" },
      { key: "phone", label: "联系电话", children: detail.phone || "-" },
      { key: "email", label: "邮箱", children: detail.email || "-" },
      { key: "remark", label: "备注", children: detail.remark || "-" },
      {
        key: "createdAt",
        label: "创建时间",
        children: formatDateTime(detail.createdAt),
      },
      {
        key: "updatedAt",
        label: "更新时间",
        children: formatDateTime(detail.updatedAt),
      },
    ];
  }, [detail, levelTag]);

  return (
    <div style={{ padding: 24 }}>
      <Card
        title={PAGE_TITLE}
        extra={
          <Link href={BASE_URL}>
            <Button icon={<ArrowLeftOutlined />}>返回列表</Button>
          </Link>
        }
      >
        <Spin spinning={loading}>
          {detail ? (
            <Descriptions bordered column={1} items={descriptionItems} />
          ) : (
            !loading && <div>客户不存在或已被删除</div>
          )}
        </Spin>
      </Card>
    </div>
  );
}

const CustomerDetail = memo(CustomerDetailComponent);

export default CustomerDetail;
