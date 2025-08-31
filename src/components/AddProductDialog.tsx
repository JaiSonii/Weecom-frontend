import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Product } from "@/lib/types"

export function AddProductDialog({
  open,
  onClose,
  onSave,
}: {
  open: boolean
  onClose: () => void
  onSave: (payload: Partial<Product>) => void
}) {
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState<number | "">("")
  const [category, setCategory] = useState("")
  const [stock, setStock] = useState<number | "">("")

  const valid = title.trim() && price !== "" && category.trim() && stock !== ""

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium">Title</label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium">Price</label>
              <Input type="number" value={price} onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))} />
            </div>
            <div>
              <label className="text-sm font-medium">Stock</label>
              <Input type="number" value={stock} onChange={(e) => setStock(e.target.value === "" ? "" : Number(e.target.value))} />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Category</label>
            <Input value={category} onChange={(e) => setCategory(e.target.value)} />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button disabled={!valid} onClick={() => onSave({ title, price: price as number, category, stock: stock as number })}>
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
