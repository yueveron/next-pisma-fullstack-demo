const API_BASE = "https://fakestoreapi.com";

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

/** 获取全部商品（供 ISR 列表页使用） */
export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${API_BASE}/products`, {
    // 配合页面级 revalidate，参与 ISR 缓存策略
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error("获取商品列表失败");
  }

  return response.json();
}

/** 获取单个商品（供 SSR 详情页使用） */
export async function getProductById(id: string): Promise<Product | null> {
  const response = await fetch(`${API_BASE}/products/${id}`, {
    // cache: 'no-store' 表示每次请求都向 API 拉取最新数据，不写入静态缓存
    cache: "no-store",
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("获取商品详情失败");
  }

  return response.json();
}
