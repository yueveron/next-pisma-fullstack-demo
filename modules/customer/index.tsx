"use client";

import { memo, useCallback, useMemo } from "react";
import {
  Button,
  Card,
  Input,
  Select,
  Space,
  Table,
  Tag,
} from "antd";
import type { TableProps } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import type { CustomerListItem } from "@/app/actions/customer";
import {
  CUSTOMER_LEVEL_MAP,
  CUSTOMER_LEVEL_OPTIONS,
  DEFAULT_PAGE_SIZE,
  PAGE_TITLE,
} from "./constant";
import { CustomerTableActions } from "./components/CustomerTableActions";
import CustomerFormModal from "./edit";
import { useCustomerList } from "./hooks/useCustomerList";
import { formatDateTime } from "./utils";

function CustomerListComponent() {
  const {
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
  } = useCustomerList();

  const levelOptions = useMemo(() => CUSTOMER_LEVEL_OPTIONS, []);

  const handleNameInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      handleNameChange(event.target.value);
    },
    [handleNameChange],
  );

  const handleLevelSelectChange = useCallback(
    (value: typeof level) => {
      handleLevelChange(value);
    },
    [handleLevelChange],
  );

  const handleTableChange = useCallback<
    NonNullable<TableProps<CustomerListItem>["onChange"]>
  >(
    (pagination) => {
      handlePageChange(
        pagination.current ?? 1,
        pagination.pageSize ?? DEFAULT_PAGE_SIZE,
      );
    },
    [handlePageChange],
  );

  const renderLevel = useCallback((value: CustomerListItem["level"]) => {
    const config = CUSTOMER_LEVEL_MAP[value];
    return <Tag color={config.color}>{config.label}</Tag>;
  }, []);

  const renderCreatedAt = useCallback((value: string) => formatDateTime(value), []);

  const renderActions = useCallback(
    (_: unknown, record: CustomerListItem) => (
      <CustomerTableActions
        record={record}
        onEdit={handleOpenEdit}
        onDelete={handleDelete}
      />
    ),
    [handleDelete, handleOpenEdit],
  );

  const columns = useMemo<TableProps<CustomerListItem>["columns"]>(
    () => [
      {
        title: "客户名称",
        dataIndex: "name",
        key: "name",
        ellipsis: true,
      },
      {
        title: "客户级别",
        dataIndex: "level",
        key: "level",
        width: 120,
        render: renderLevel,
      },
      {
        title: "联系人",
        dataIndex: "contact",
        key: "contact",
        width: 120,
        render: (value: string | null) => value || "-",
      },
      {
        title: "联系电话",
        dataIndex: "phone",
        key: "phone",
        width: 140,
        render: (value: string | null) => value || "-",
      },
      {
        title: "邮箱",
        dataIndex: "email",
        key: "email",
        ellipsis: true,
        render: (value: string | null) => value || "-",
      },
      {
        title: "创建时间",
        dataIndex: "createdAt",
        key: "createdAt",
        width: 180,
        render: renderCreatedAt,
      },
      {
        title: "操作",
        key: "actions",
        width: 180,
        fixed: "right",
        render: renderActions,
      },
    ],
    [renderActions, renderCreatedAt, renderLevel],
  );

  const pagination = useMemo(
    () => ({
      current: page,
      pageSize,
      total,
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: (count: number) => `共 ${count} 条`,
    }),
    [page, pageSize, total],
  );

  return (
    <div style={{ padding: 24 }}>
      <Card title={PAGE_TITLE}>
        <Space
          style={{ marginBottom: 16, width: "100%", justifyContent: "space-between" }}
          wrap
        >
          <Space wrap>
            <Input
              allowClear
              prefix={<SearchOutlined />}
              placeholder="搜索客户名称"
              value={nameKeyword}
              onChange={handleNameInputChange}
              style={{ width: 240 }}
            />
            <Select
              allowClear
              placeholder="筛选客户级别"
              options={levelOptions}
              value={level}
              onChange={handleLevelSelectChange}
              style={{ width: 160 }}
            />
          </Space>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleOpenCreate}>
            新增客户
          </Button>
        </Space>

        <Table<CustomerListItem>
          rowKey="id"
          loading={loading}
          columns={columns}
          dataSource={dataSource}
          pagination={pagination}
          onChange={handleTableChange}
          scroll={{ x: 1000 }}
        />
      </Card>

      <CustomerFormModal
        open={modalOpen}
        editingRecord={editingRecord}
        onClose={handleCloseModal}
        onSuccess={handleModalSuccess}
      />
    </div>
  );
}

const CustomerList = memo(CustomerListComponent);

export default CustomerList;
