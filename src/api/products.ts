import type { Product, APIResponse, Category } from "@/lib/types";

const BASE_URL = "https://dummyjson.com/products"

export async function fetchProducts(limit: number, skip: number, opts?: { q?: string; category?: string; delay?: number }) : Promise<APIResponse> {
  const params = new URLSearchParams()
  params.set("limit", String(limit))
  params.set("skip", String(skip))
  if (opts?.delay) params.set("delay", String(opts.delay))

  if (opts?.category && opts.category !== "all") {
    const res = await fetch(`${BASE_URL}/category/${encodeURIComponent(opts.category)}?${params}`)
    if (!res.ok) throw new Error("Failed to fetch products by category")
    return res.json()
  }

  if (opts?.q && opts.q.trim()) {
    params.set("q", opts.q.trim())
    const res = await fetch(`${BASE_URL}/search?${params}`)
    if (!res.ok) throw new Error("Failed to search products")
    return res.json()
  }

  const res = await fetch(`${BASE_URL}?${params}`)
  if (!res.ok) throw new Error("Failed to fetch products")
  return res.json()
}

export async function fetchCategories() {
  const res = await fetch(`${BASE_URL}/categories`)
  if (!res.ok) throw new Error("Failed to fetch categories")
  return res.json() as Promise<Category[]>
}

export async function addProduct(product: Partial<Product>) {
  const res = await fetch(`${BASE_URL}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  })
  return res.json()
}
export async function updateProduct(id: number, updates: Partial<Product>) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  })
  return res.json()
}
export async function deleteProduct(id: number) {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" })
  return res.json()
}
