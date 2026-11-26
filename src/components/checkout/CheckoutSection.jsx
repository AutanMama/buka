export default function CheckoutSection({ step, title, children }) {
  return (
    <section className="border-t border-line pt-6 first:border-0 first:pt-0">
      <h2 className="mb-5 flex items-baseline gap-3 text-2xl">
        <span className="font-sans text-sm font-semibold text-muted tabular-nums">0{step}</span>
        {title}
      </h2>
      {children}
    </section>
  )
}
