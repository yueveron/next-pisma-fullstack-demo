import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById } from "@/lib/products";

type ProductDetailPageProps = {
  params: Promise<{ id: string }>;
};

// SSR 核心配置：强制动态渲染，每次请求都在服务端实时生成页面
export const dynamic = "force-dynamic";

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;

  // Server Component 优势：敏感/实时数据只在服务端请求，不暴露 API 调用细节给浏览器
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-full bg-zinc-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          ← 返回商品列表
        </Link>

        <article className="grid grid-cols-1 gap-8 overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm lg:grid-cols-2 lg:p-10">
          <div className="relative aspect-square w-full max-w-md justify-self-center rounded-xl bg-zinc-50 p-6 lg:max-w-none">
            <Image
              src={product.image}
              alt={product.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain p-4"
            />
          </div>

          <div className="flex flex-col gap-5">
            <div>
              <span className="inline-block rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium uppercase tracking-wide text-zinc-600">
                {product.category}
              </span>
              <h1 className="mt-4 text-2xl font-bold leading-tight text-zinc-900 sm:text-3xl">
                {product.title}
              </h1>
            </div>

            <p className="text-3xl font-bold text-emerald-600">
              ${product.price.toFixed(2)}
            </p>

            <p className="leading-relaxed text-zinc-600">{product.description}</p>

            <p className="text-sm text-zinc-500">
              评分 {product.rating.rate} · {product.rating.count} 条评价
            </p>

            <button
              type="button"
              className="mt-auto w-full rounded-xl bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 sm:w-auto"
            >
              立即购买
            </button>
          </div>
        </article>
      </div>
    </main>
  );
}
