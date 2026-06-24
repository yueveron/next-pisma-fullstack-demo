"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";

type AntdProviderProps = {
  children: React.ReactNode;
};

export default function AntdProvider({ children }: AntdProviderProps) {
  return (
    <AntdRegistry>
      <ConfigProvider
        locale={zhCN}
        theme={{
          token: {
            colorPrimary: "#1677ff",
          },
        }}
      >
        {children}
      </ConfigProvider>
    </AntdRegistry>
  );
}
