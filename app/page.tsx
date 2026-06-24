import { getProducts } from "@/lib/products";
import ProductList from "@/modules/products";

// ISR 核心配置：页面静态生成后，最多每 3600 秒（1 小时）在后台重新验证并更新
export const revalidate = 3600;

export default async function HomePage() {
  // Server Component 优势：数据在服务端获取，HTML 已包含商品内容，首屏更快、SEO 更友好
  const products = await getProducts();

  return <ProductList products={products} />;
}
