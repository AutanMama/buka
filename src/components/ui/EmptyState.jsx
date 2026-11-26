export default function EmptyState({ icon: Icon, title, children, action }) {
  return (
    <div className="flex flex-col items-center px-6 py-16 text-center">
      {Icon && (
        <div className="mb-4 grid size-16 place-items-center rounded-full bg-sunk text-muted">
          <Icon className="size-7" aria-hidden />
        </div>
      )}
      <h3 className="text-xl font-semibold">{title}</h3>
      {children && <p className="mt-2 max-w-sm text-sm text-muted">{children}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
