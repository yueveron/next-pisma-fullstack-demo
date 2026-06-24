import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";

type ProductListProps = {
  products: Product[];
};

export default function ProductList({ products }: ProductListProps) {
  return (
    <main className="min-h-full bg-zinc-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
              商品列表
            </h1>
            <p className="mt-2 text-sm text-zinc-500">
              本页采用 ISR，数据每 1 小时自动重新验证
            </p>
          </div>
          <Link
            href="/customer"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            进入客户管理 →
          </Link>
        </header>

        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <li key={product.id}>
              <Link
                href={`/products/${product.id}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="relative aspect-square w-full bg-white p-4">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-contain p-2 transition group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-1 flex-col gap-2 p-4">
                  <h2 className="line-clamp-2 text-sm font-medium leading-snug text-zinc-900">
                    {product.title}
                  </h2>
                  <p className="mt-auto text-lg font-semibold text-emerald-600">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
