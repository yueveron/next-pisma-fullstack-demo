import CustomerDetailPageClient from "./CustomerDetailPageClient";

type CustomerDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function CustomerDetailPage({
  params,
}: CustomerDetailPageProps) {
  const { id } = await params;
  return <CustomerDetailPageClient id={id} />;
}
