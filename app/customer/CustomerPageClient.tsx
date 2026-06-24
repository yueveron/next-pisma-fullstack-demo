"use client";

import { lazy, memo, Suspense } from "react";
import { Spin } from "antd";

const CustomerList = lazy(() => import("@/modules/customer"));

function CustomerPageClientComponent() {
  return (
    <Suspense
      fallback={
        <div style={{ padding: 48, textAlign: "center" }}>
          <Spin size="large" />
        </div>
      }
    >
      <CustomerList />
    </Suspense>
  );
}

const CustomerPageClient = memo(CustomerPageClientComponent);

export default CustomerPageClient;
