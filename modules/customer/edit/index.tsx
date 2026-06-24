"use client";

import { memo, useCallback, useMemo } from "react";
import { Form, Input, Modal, Select } from "antd";
import type { CustomerListItem } from "@/app/actions/customer";
import type { CustomerFormValues } from "../constant";
import { CUSTOMER_LEVEL_OPTIONS } from "../constant";
import { useCustomerForm } from "./hooks/useCustomerForm";

type CustomerFormModalProps = {
  open: boolean;
  editingRecord: CustomerListItem | null;
  onClose: () => void;
  onSuccess: () => void;
};

function CustomerFormModalComponent(props: CustomerFormModalProps) {
  const { open, editingRecord, onClose, onSuccess } = props;
  const [form] = Form.useForm<CustomerFormValues>();
  const { submitting, handleSubmit, isEditMode } = useCustomerForm({
    open,
    editingRecord,
    onSuccess,
    onClose,
  });

  const handleAfterOpenChange = useCallback(
    (visible: boolean) => {
      if (!visible) {
        form.resetFields();
        return;
      }

      if (editingRecord) {
        form.setFieldsValue({
          name: editingRecord.name,
          level: editingRecord.level,
          contact: editingRecord.contact ?? undefined,
          phone: editingRecord.phone ?? undefined,
          email: editingRecord.email ?? undefined,
          remark: editingRecord.remark ?? undefined,
        });
        return;
      }

      form.setFieldsValue({
        level: "NORMAL",
      });
    },
    [editingRecord, form],
  );

  const handleOk = useCallback(async () => {
    const values = await form.validateFields();
    await handleSubmit(values);
  }, [form, handleSubmit]);

  const handleCancel = useCallback(() => {
    onClose();
  }, [onClose]);

  const modalTitle = useMemo(
    () => (isEditMode ? "编辑客户" : "新增客户"),
    [isEditMode],
  );

  const levelOptions = useMemo(() => CUSTOMER_LEVEL_OPTIONS, []);

  return (
    <Modal
      title={modalTitle}
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={submitting}
      okButtonProps={{ disabled: submitting }}
      destroyOnHidden
      afterOpenChange={handleAfterOpenChange}
      width={560}
    >
      <Form<CustomerFormValues>
        form={form}
        layout="vertical"
        initialValues={{ level: "NORMAL" }}
      >
        <Form.Item
          label="客户名称"
          name="name"
          rules={[
            { required: true, message: "请输入客户名称" },
            { max: 100, message: "客户名称不能超过 100 个字符" },
          ]}
        >
          <Input placeholder="请输入客户名称" maxLength={100} />
        </Form.Item>

        <Form.Item
          label="客户级别"
          name="level"
          rules={[{ required: true, message: "请选择客户级别" }]}
        >
          <Select options={levelOptions} placeholder="请选择客户级别" />
        </Form.Item>

        <Form.Item label="联系人" name="contact">
          <Input placeholder="请输入联系人" maxLength={50} />
        </Form.Item>

        <Form.Item
          label="联系电话"
          name="phone"
          rules={[
            {
              validator: (_, value) => {
                if (!value || /^1[3-9]\d{9}$/.test(String(value).trim())) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("请输入正确的手机号"));
              },
            },
          ]}
        >
          <Input placeholder="请输入联系电话" maxLength={11} />
        </Form.Item>

        <Form.Item
          label="邮箱"
          name="email"
          rules={[{ type: "email", message: "请输入正确的邮箱地址" }]}
        >
          <Input placeholder="请输入邮箱" maxLength={100} />
        </Form.Item>

        <Form.Item label="备注" name="remark">
          <Input.TextArea
            placeholder="请输入备注"
            maxLength={500}
            showCount
            rows={4}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

const CustomerFormModal = memo(CustomerFormModalComponent);

export default CustomerFormModal;
