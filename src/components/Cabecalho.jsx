import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Brasao } from './Brasao.jsx'
import { IconeInicio, IconeHistoria, IconeFotos, IconeVideos, IconeBusca, IconeQr, IconeTelaCheia } from './Icones.jsx'

// Sempre visíveis (RF01).
const itens = [
  { to: '/', rotulo: 'Início', Icone: IconeInicio, fim: true },
  { to: '/historia', rotulo: 'História', Icone: IconeHistoria },
  { to: '/fotos', rotulo: 'Fotos', Icone: IconeFotos },
  { to: '/videos', rotulo: 'Vídeos', Icone: IconeVideos },
]

// Abas com sublinhado dourado (telas largas) e pílulas (celular e totem em pé).
const abaClasse = ({ isActive }) =>
  [
    'flex min-h-[60px] items-center justify-center gap-2 whitespace-nowrap rounded-xl px-2 font-texto text-[0.9rem] font-semibold transition-all sm:text-base duration-300 ease-mola active:scale-95',
    'lg:rounded-none lg:border-b-[3px] lg:px-2 lg:text-[0.8rem] lg:tracking-[0.12em] lg:uppercase xl:px-3',
    isActive
      ? 'bg-marinho text-creme lg:border-dourado lg:bg-transparent lg:text-marinho'
      : 'text-marinho hover:bg-creme-fundo active:bg-creme-fundo lg:border-transparent lg:hover:bg-transparent lg:hover:border-dourado-claro',
  ].join(' ')

// Um único cabeçalho, com os mesmos links em todas as páginas (RF01).
export default function Cabecalho() {
  const [telaCheia, setTelaCheia] = useState(false)

  useEffect(() => {
    const aoMudar = () => setTelaCheia(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', aoMudar)
    return () => document.removeEventListener('fullscreenchange', aoMudar)
  }, [])

  const alternarTelaCheia = () => {
    if (document.fullscreenElement) document.exitFullscreen?.()
    else document.documentElement.requestFullscreen?.().catch(() => {})
  }

  return (
    <header className="border-b border-dourado/60 bg-creme-claro/95 lg:sticky lg:top-0 lg:z-40">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-3 md:px-8 lg:flex-row lg:items-center lg:justify-between">
        <Link
          to="/"
          aria-label="Memorial Dom Bosco, ir para a página inicial"
          className="flex items-center gap-3 self-start"
        >
          <Brasao className="h-11 w-[2.4rem] shrink-0" />
          <span className="font-titulo text-2xl leading-none font-bold tracking-[0.14em] whitespace-nowrap text-marinho uppercase">
            Memorial
          </span>
        </Link>

        <nav aria-label="Navegação principal">
          <ul className="grid grid-cols-4 gap-1 lg:flex lg:items-center lg:gap-1">
            {itens.map(({ to, rotulo, Icone, fim }) => (
              <li key={to}>
                <NavLink to={to} end={fim} className={abaClasse}>
                  <Icone className="hidden text-xl xl:block" />
                  <span>{rotulo}</span>
                </NavLink>
              </li>
            ))}
            <li className="hidden 2xl:block">
              <NavLink to="/colegas" className={abaClasse}>
                <IconeBusca className="text-xl" />
                <span>Encontrar colega</span>
              </NavLink>
            </li>
            <li className="hidden xl:block lg:ml-2">
              <NavLink
                to="/checkin"
                className={({ isActive }) =>
                  `flex min-h-[60px] items-center gap-2 rounded-xl bg-marinho px-4 font-texto text-[0.8rem] font-bold tracking-[0.12em] whitespace-nowrap text-creme uppercase shadow-lg shadow-marinho/10 transition-all duration-300 ease-mola hover:-translate-y-0.5 active:scale-95 ${
                    isActive ? 'ring-4 ring-dourado/50' : ''
                  }`
                }
              >
                <IconeQr className="text-xl" />
                <span>Check-in</span>
              </NavLink>
            </li>
            <li className="hidden 2xl:block">
              <button
                type="button"
                onClick={alternarTelaCheia}
                aria-pressed={telaCheia}
                aria-label={telaCheia ? 'Sair da tela cheia' : 'Abrir em tela cheia'}
                className="flex size-12 items-center justify-center rounded-full border border-creme-linha bg-creme-claro text-xl text-marinho active:scale-95"
              >
                <IconeTelaCheia />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
