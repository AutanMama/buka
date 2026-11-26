export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-muted sm:flex-row sm:justify-between sm:px-6">
        <p>© {new Date().getFullYear()} Buka · Built by Zulkiflu Garba</p>
        <p>Demo project. Restaurants and prices are fictional. Photos from Unsplash.</p>
      </div>
    </footer>
  )
}
