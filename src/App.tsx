import { useMemo, useState } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchProducts, addProduct, fetchCategories } from "@/api/products"
import { ProductTable } from "@/components/ProductTable"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProductTableSkeleton } from "@/components/ProductTableSkeleton"
import { AddProductDialog } from "@/components/AddProductDialog"
import { Shell } from "@/components/layout/Shell"
import "./index.css"

const PAGE_SIZE = 10

export default function App() {
  const [page, setPage] = useState(1)
  const [q, setQ] = useState("")
  const [category, setCategory] = useState("all")
  const [delay, setDelay] = useState(0)
  const [openAdd, setOpenAdd] = useState(false)

  const queryClient = useQueryClient()

  // categories
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 5 * 60_000,
  })

  // products
  const { isPending, isError, error, data, refetch, isFetching } = useQuery({
    queryKey: ["products", page, q, category, delay],
    queryFn: async () => {
      const skip = (page - 1) * PAGE_SIZE
      return fetchProducts(PAGE_SIZE, skip, { q, category, delay })
    },
    keepPreviousData: true,
  })

  // derived
  const totalPages = useMemo(() => (data?.total ? Math.max(1, Math.ceil(data.total / PAGE_SIZE)) : 1), [data?.total])

  const handleAdd = async (payload: any) => {
    await addProduct(payload)
    // show immediately in current page (optimistic list refresh)
    queryClient.invalidateQueries({ queryKey: ["products"] })
    setOpenAdd(false)
  }

  return (
    <Shell>
      <div className="space-y-4">
        <Card>
          <CardHeader><CardTitle>Filters</CardTitle></CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Input
                placeholder="Search by title..."
                value={q}
                onChange={(e) => { setPage(1); setQ(e.target.value) }}
              />

              <Select
                value={category}
                onValueChange={(val) => { setPage(1); setCategory(val) }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All categories</SelectItem>
                  {categories?.map((c) => (
                    <SelectItem key={c.slug} value={c.slug}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Delay filter */}
              <Select
                value={String(delay)}
                onValueChange={(val) => setDelay(Number(val))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Delay" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">No delay</SelectItem>
                  <SelectItem value="500">Delay 500ms</SelectItem>
                  <SelectItem value="1000">Delay 1s</SelectItem>
                  <SelectItem value="1500">Delay 1.5s</SelectItem>
                </SelectContent>
              </Select>

              {/* Buttons */}
              <div className="flex gap-2 flex-wrap sm:justify-end">
                <Button onClick={() => refetch()} disabled={isFetching}>Refresh</Button>
                <Button
                  variant="outline"
                  onClick={() => { setQ(""); setCategory("all"); setPage(1) }}
                >
                  Clear
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>


        <div className="flex items-center justify-between">
          <div className="text-sm opacity-80">
            {data?.total ? <>Total: <b>{data.total}</b> • Page <b>{page}</b> / <b>{totalPages}</b></> : "—"}
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setOpenAdd(true)}>Add Product</Button>
            <Button variant="outline" disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
              Previous
            </Button>
            <Button variant="outline" disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
              Next
            </Button>
          </div>
        </div>

        {isPending ? (
          <ProductTableSkeleton />
        ) : isError ? (
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Something went wrong</div>
                  <div className="text-sm opacity-80">{(error as Error).message}</div>
                </div>
                <Button onClick={() => refetch()}>Try again</Button>
              </div>
            </CardContent>
          </Card>
        ) : data?.products?.length ? (
          <ProductTable data={data?.products} />
        ) : (
          <Card><CardContent className="p-6 text-center">No results.</CardContent></Card>
        )}

        <AddProductDialog open={openAdd} onClose={() => setOpenAdd(false)} onSave={handleAdd} />
      </div>
    </Shell>
  )
}
