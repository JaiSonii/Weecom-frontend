export function Sidebar({ onLinkClick }: { onLinkClick?: () => void }) {
  return (
    <aside className="w-full h-full border-r">
      <div className="p-4 font-semibold">Weecom</div>
      <nav className="p-2 space-y-1">
        <a className="block rounded-md px-3 py-2 hover:bg-accent" href="#" onClick={onLinkClick}>
          Dashboard
        </a>
        <a className="block rounded-md px-3 py-2 hover:bg-accent" href="#" onClick={onLinkClick}>
          Products
        </a>
      </nav>
    </aside>
  )
}