import { useEffect } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import Cabecalho from './Cabecalho.jsx'
import { Brasao, Louro } from './Brasao.jsx'

export default function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-xl focus:bg-marinho focus:px-5 focus:py-3 focus:text-creme"
      >
        Ir para o conteúdo
      </a>
      <Cabecalho />
      <main id="conteudo" className="flex flex-1 flex-col">
        <Outlet />
      </main>
      <footer className="border-t border-creme-linha bg-creme-claro px-4 py-8 text-center">
        <Louro className="mx-auto size-16 opacity-90">
          <Brasao className="h-8 w-[1.75rem]" />
        </Louro>
        <p className="mt-2 text-base text-marinho-suave">
          Memorial Dom Bosco, Unidade de Ensino Superior Dom Bosco
        </p>
        <nav aria-label="Mais opções" className="mt-3 flex justify-center gap-6 text-lg font-bold">
          <Link to="/checkin" className="underline decoration-dourado decoration-2 underline-offset-4">
            Check-in
          </Link>
          <Link to="/colegas" className="underline decoration-dourado decoration-2 underline-offset-4">
            Encontrar colega
          </Link>
        </nav>
        <p className="mt-3 text-base text-marinho-suave italic">MVP · conteúdo de exemplo</p>
      </footer>
    </div>
  )
}
