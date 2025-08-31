import { useState } from "react"
import { Sidebar } from "./Sidebar"
import { Header } from "./Header"
import { Sheet, SheetContent } from "@/components/ui/sheet"

export function Shell({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen flex">
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="p-0 w-[250px]">
          <Sidebar onLinkClick={() => setMobileMenuOpen(false)} />
        </SheetContent>
      </Sheet>

      <div className="flex-1 flex flex-col">
        <Header onMenuClick={() => setMobileMenuOpen(true)} />
        <main className="p-4">{children}</main>
      </div>
    </div>
  )
}