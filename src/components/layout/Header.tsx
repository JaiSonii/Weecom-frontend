import { Button } from "@/components/ui/button"
import { MenuIcon } from "lucide-react"

export function Header({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="h-14 border-b flex items-center justify-between px-4">
      <div className="font-semibold">Product Dashboard</div>
      {/* Hamburger Menu Button for mobile */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={onMenuClick}
      >
        <MenuIcon className="size-5" />
      </Button>
    </header>
  )
}