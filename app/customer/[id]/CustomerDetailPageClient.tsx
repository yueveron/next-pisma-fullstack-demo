"use client";

import { lazy, memo, Suspense } from "react";
import { Spin } from "antd";

const CustomerDetail = lazy(() => import("@/modules/customer/detail"));

type CustomerDetailPageClientProps = {
  id: string;
};

function CustomerDetailPageClientComponent({
  id,
}: CustomerDetailPageClientProps) {
  return (
    <Suspense
      fallback={
        <div style={{ padding: 48, textAlign: "center" }}>
          <Spin size="large" />
        </div>
      }
    >
      <CustomerDetail id={id} />
    </Suspense>
  );
}

const CustomerDetailPageClient = memo(CustomerDetailPageClientComponent);

export default CustomerDetailPageClient;
