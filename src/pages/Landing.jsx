import { Link } from 'react-router-dom'
import Colagem from '../components/Colagem.jsx'
import Cena from '../components/Cenas.jsx'
import { IconePlay, IconeBusca, IconeQr, IconeSeta } from '../components/Icones.jsx'
import { linhaDoTempo } from '../data/mock.js'

// Aquarela suave de fundo (no lugar da aquarela da fachada, que ainda não chegou).
const AQUARELA = [
  'radial-gradient(38% 30% at 12% 18%, rgba(184,146,90,0.26), transparent 72%)',
  'radial-gradient(42% 34% at 92% 12%, rgba(120,156,204,0.20), transparent 72%)',
  'radial-gradient(46% 38% at 78% 96%, rgba(184,146,90,0.20), transparent 72%)',
].join(', ')

const ATALHOS = [
  { to: '/historia', titulo: 'História', sub: 'Linha do tempo da escola, de 1985 até hoje.', cena: 'fachada', tom: 0, giro: '-rotate-3' },
  { to: '/fotos', titulo: 'Fotos', sub: 'Galeria organizada por período histórico.', cena: 'grupo', tom: 2, giro: 'rotate-2' },
  { to: '/videos', titulo: 'Vídeos', sub: 'Depoimentos, eventos e registros institucionais.', cena: 'biblioteca', tom: 3, giro: '-rotate-2', play: true },
]

const botao =
  'flex min-h-[60px] items-center justify-center gap-3 rounded-xl px-4 font-texto text-sm font-bold tracking-[0.06em] whitespace-nowrap uppercase transition-transform duration-300 ease-mola hover:-translate-y-0.5 active:scale-95 sm:px-8 sm:text-base sm:tracking-[0.1em] md:text-lg'

export default function Landing() {
  const inicio = Number(linhaDoTempo[0].ano)
  const fim = Number(linhaDoTempo.at(-1).ano)

  return (
    <div className="relative flex flex-1 flex-col justify-center overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ backgroundImage: AQUARELA }} />
      {/* Fachada desbotada ao fundo, como uma aquarela */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/3 opacity-[0.07] blur-[3px] wide:block"
        style={{
          WebkitMaskImage: 'linear-gradient(to right, #1F3A5F 30%, transparent)',
          maskImage: 'linear-gradient(to right, #1F3A5F 30%, transparent)',
        }}
      >
        <Cena nome="fachada" tom={0} className="size-full" />
      </div>

      <section className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-5 py-12 md:px-10 wide:grid-cols-[1fr_1.05fr] wide:gap-16 wide:py-10">
        <div className="flex flex-col items-center text-center wide:items-start wide:text-left">
          <p className="font-texto text-base font-semibold tracking-[0.22em] text-dourado-escuro uppercase md:text-lg">
            Nossa história, nosso legado
          </p>
          <h1 className="mt-2 text-[clamp(3.2rem,11vw,6.5rem)] leading-none font-bold tracking-[0.04em] text-marinho uppercase wide:text-[clamp(3.4rem,6.2vw,6rem)]">
            Memorial
          </h1>
          <p className="mt-1 font-texto text-base tracking-[0.2em] text-marinho-suave uppercase md:text-lg">
            Dom Bosco · UNDB
          </p>

          <p className="mt-5 max-w-md text-2xl text-marinho md:text-2xl">
            Fotos, vídeos e memórias de quem passou por esta escola. Toque em uma área para começar.
          </p>

          <p className="mt-4 flex items-baseline gap-3 font-titulo text-marinho">
            <b className="text-3xl md:text-4xl">
              {inicio} — {fim}
            </b>
            <span className="font-texto text-lg text-marinho-suave">{fim - inicio} anos de história</span>
          </p>

          <div className="mt-6 flex w-full max-w-md flex-col gap-3">
            <Link to="/checkin" className={`${botao} animate-pulsar bg-marinho text-creme`}>
              <IconeQr className="text-2xl sm:text-3xl" /> Fazer meu check-in
            </Link>
            <Link to="/colegas" className={`${botao} border-2 border-marinho/70 text-marinho active:bg-creme-fundo`}>
              <IconeBusca className="text-2xl sm:text-3xl" /> Encontrar um colega
            </Link>
          </div>
        </div>

        <nav aria-label="Áreas do Memorial" className="flex flex-col gap-6">
          {ATALHOS.map(({ to, titulo, sub, cena, tom, giro, play }, i) => (
            <Link
              key={to}
              to={to}
              style={{ animationDelay: `${250 + i * 140}ms` }}
              className="animate-entrar group flex min-h-28 items-center gap-4 rounded-xl border border-creme-linha bg-creme-claro p-3 shadow-lg shadow-marinho/10 transition-transform duration-300 ease-mola hover:-translate-y-1 active:scale-[0.97] md:gap-6 md:p-4"
            >
              <span
                aria-hidden="true"
                className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-lg border-4 border-creme-claro shadow-lg shadow-marinho/10 transition-transform duration-500 ease-mola group-hover:rotate-0 md:h-24 md:w-36 ${giro}`}
              >
                <Cena nome={cena} tom={tom} className="size-full" />
                {play && (
                  <span className="absolute inset-0 flex items-center justify-center bg-marinho/20">
                    <span className="flex size-10 items-center justify-center rounded-full bg-marinho text-2xl text-creme">
                      <IconePlay className="translate-x-px" />
                    </span>
                  </span>
                )}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-titulo text-3xl font-semibold text-marinho md:text-4xl">
                  {titulo}
                </span>
                <span className="mt-1 block text-lg leading-snug text-marinho-suave md:text-xl">{sub}</span>
              </span>
              <IconeSeta className="shrink-0 text-3xl text-dourado transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          ))}
        </nav>

        {/* Elemento brincalhão para celular e totem em pé; no desktop o espaço é dos cartões */}
        <div className="wide:hidden">
          <Colagem />
        </div>
      </section>
    </div>
  )
}
