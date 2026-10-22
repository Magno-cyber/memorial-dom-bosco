export default function PageHeader({ titulo, children }) {
  return (
    <header className="mx-auto w-full max-w-6xl px-5 pt-12 pb-8 md:px-10 md:pt-16">
      <h1 className="text-4xl font-semibold text-marinho md:text-6xl">{titulo}</h1>
      <span aria-hidden="true" className="mt-4 block h-1 w-20 rounded-xl bg-dourado" />
      {children && <p className="mt-5 max-w-2xl text-xl text-marinho-suave md:text-2xl">{children}</p>}
    </header>
  )
}
