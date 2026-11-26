export default function CheckoutSection({ step, title, children }) {
  return (
    <section className="rounded-card border border-line bg-surface p-5 sm:p-6">
      <h2 className="mb-5 flex items-center gap-3 text-xl font-bold">
        <span className="grid size-8 place-items-center rounded-full bg-ink font-sans text-sm text-bg">{step}</span>
        {title}
      </h2>
      {children}
    </section>
  )
}
