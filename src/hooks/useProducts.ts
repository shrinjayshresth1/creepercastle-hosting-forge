import { useEffect, useState } from "react";

export interface Product {
  _id: string;
  slug: string;
  category: string;
  name: string;
  description?: string;
  price: number | null;
  pricePer: string;
  highlighted: boolean;
  badge?: string;
  order: number;
  logoUrl?: string;
  isCustom?: boolean;
  specs: Record<string, string>;
  features: string[];
  locations: string[];
  active: boolean;
}

export function useProducts(category: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(`/api/products?category=${encodeURIComponent(category)}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (!cancelled) {
          setProducts(json.data ?? []);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message ?? "Failed to load products");
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [category]);

  return { products, loading, error };
}
