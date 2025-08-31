import { useState } from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/ui/DataTable"
import { deleteProduct, updateProduct } from "@/api/products"
import { useQueryClient } from "@tanstack/react-query"
import type { Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { EditProductDialog } from "./EditProductDialog"

export function ProductTable({ data }: { data: Product[] }) {
    const queryClient = useQueryClient()
    const [editing, setEditing] = useState<Product | null>(null)

    const handleEdit = async (updates: Partial<Product>) => {
        if (!updates.id) return
        const updated = await updateProduct(updates.id, updates)

        queryClient.setQueryData(["products", 1], (old: any) => {
            if (!old) return old
            return {
                ...old,
                products: old.products.map((p: Product) =>
                    p.id === updates.id ? { ...p, ...updated } : p
                ),
            }
        })
        setEditing(null)
    }

    const handleDelete = async (id: number) => {
        await deleteProduct(id)
        queryClient.setQueryData(["products", 1], (old: any) => {
            if (!old) return old
            return {
                ...old,
                products: old.products.filter((p: Product) => p.id !== id),
            }
        })
    }

    const columns: ColumnDef<Product>[] = [
        { accessorKey: "title", header: "Title" },
        {
            accessorKey: "price",
            header: "Price ($)",
            cell: ({ getValue }) => <span>${getValue<number>().toFixed(2)}</span>,
        },
        { accessorKey: "category", header: "Category" },
        { accessorKey: "stock", header: "Stock" },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const product = row.original
                return (
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => setEditing(product)}>Edit</Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDelete(product.id)}>Delete</Button>
                    </div>
                )
            },
        },
    ]

    return (
        <>
            <DataTable columns={columns} data={data} />
            {editing && (
                <EditProductDialog
                    open={!!editing}
                    onClose={() => setEditing(null)}
                    product={editing}
                    onSave={handleEdit}
                />
            )}
        </>
    )
}
