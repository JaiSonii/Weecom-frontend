import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function ProductTableSkeleton() {
  return (
    <Card>
      <CardHeader><CardTitle>Products</CardTitle></CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-hidden hidden md:block">
          <div className="grid grid-cols-5 gap-0 border-b">
            {[...Array(5)].map((_, i) => <div key={i} className="p-2 font-medium"> <Skeleton className="h-4 w-24" /> </div>)}
          </div>
          {[...Array(8)].map((_, r) => (
            <div key={r} className="grid grid-cols-5 gap-0 border-b">
              {[...Array(5)].map((_, c) => <div key={c} className="p-2"><Skeleton className="h-4 w-full" /></div>)}
            </div>
          ))}
        </div>
        <div className="space-y-4 md:hidden">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="p-4 border rounded-md space-y-3">
              <Skeleton className="h-5 w-3/4" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}