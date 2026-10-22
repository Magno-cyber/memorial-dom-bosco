import { useRef, useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import Modal from '../components/Modal.jsx'
import Retrato from '../components/Retrato.jsx'
import Polaroid from '../components/Polaroid.jsx'
import { IconeSetaEsquerda, IconeSetaDireita } from '../components/Icones.jsx'
import { fotos } from '../data/mock.js'

// RF03: galeria agrupada por ano; miniaturas abrem em tela cheia com legenda.
const anos = [...new Set(fotos.map((f) => f.ano))].sort()
const grupos = anos.map((ano) => ({ ano, itens: fotos.filter((f) => f.ano === ano) }))

// Cada foto fica levemente torta, como se tivesse sido jogada sobre a mesa.
const INCLINACOES = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2', 'rotate-0']

const botaoSeta =
  'flex size-14 shrink-0 items-center justify-center rounded-full border-2 border-creme/60 text-3xl transition-transform duration-300 ease-mola active:scale-90 active:bg-creme/15 sm:size-16'

export default function Photos() {
  const [aberta, setAberta] = useState(null) // índice em `fotos`, ou null
  const toqueInicial = useRef(null)

  const anterior = () => setAberta((i) => (i + fotos.length - 1) % fotos.length)
  const proxima = () => setAberta((i) => (i + 1) % fotos.length)
  const foto = aberta === null ? null : fotos[aberta]

  // Arrastar o dedo para o lado troca de foto.
  const aoSoltar = (e) => {
    if (toqueInicial.current === null) return
    const dx = e.clientX - toqueInicial.current
    toqueInicial.current = null
    if (dx > 60) anterior()
    else if (dx < -60) proxima()
  }

  return (
    <>
      <PageHeader titulo="Fotos">
        Escolha uma época e toque em uma foto para vê-la em tamanho grande.
      </PageHeader>

      <div className="mx-auto w-full max-w-6xl px-5 pb-24 md:px-10">
        <nav aria-label="Ir para um ano" className="flex flex-wrap gap-4">
          {anos.map((ano) => (
            <a
              key={ano}
              href={`#ano-${ano}`}
              className="flex min-h-[60px] items-center rounded-xl border-2 border-creme-linha bg-creme-claro px-5 font-texto text-xl font-semibold text-marinho transition-all duration-300 ease-mola hover:border-dourado active:scale-95 active:bg-dourado-claro"
            >
              {ano}
            </a>
          ))}
        </nav>

        {grupos.map(({ ano, itens }) => (
          <section key={ano} id={`ano-${ano}`} aria-labelledby={`titulo-${ano}`} className="mt-10 scroll-mt-28">
            <div className="flex items-center gap-4">
              <h2 id={`titulo-${ano}`} className="text-4xl font-semibold text-marinho md:text-5xl">
                {ano}
              </h2>
              <span aria-hidden="true" className="h-0.5 flex-1 rounded-full bg-dourado/50" />
              <span className="text-lg text-marinho-suave">
                {itens.length} {itens.length === 1 ? 'foto' : 'fotos'}
              </span>
            </div>

            <ul className="mt-5 grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-3 xl:grid-cols-4">
              {itens.map((f, i) => (
                <li key={f.id}>
                  <button
                    type="button"
                    onClick={() => setAberta(fotos.indexOf(f))}
                    className={`block w-full text-left transition-transform duration-300 ease-mola hover:-translate-y-1 hover:rotate-0 hover:scale-[1.03] active:scale-[0.96] ${INCLINACOES[i % INCLINACOES.length]}`}
                  >
                    <Polaroid foto={f} />
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      {foto && (
        <Modal
          rotulo={`Foto: ${foto.titulo}, ${foto.ano}`}
          aoFechar={() => setAberta(null)}
          aoAnterior={anterior}
          aoProximo={proxima}
        >
          <button type="button" onClick={anterior} aria-label="Foto anterior" className={botaoSeta}>
            <IconeSetaEsquerda />
          </button>

          <figure
            onPointerDown={(e) => (toqueInicial.current = e.clientX)}
            onPointerUp={aoSoltar}
            onPointerCancel={() => (toqueInicial.current = null)}
            className="flex max-h-full min-w-0 max-w-4xl flex-1 touch-pan-y flex-col items-center gap-4"
          >
            <Retrato
              foto={foto}
              ajuste="contain"
              className="aspect-[4/3] max-h-[60vh] w-full rounded-sm bg-creme"
            />
            <figcaption className="text-center">
              <p className="font-titulo text-2xl font-semibold sm:text-3xl">
                {foto.titulo}, {foto.ano}
              </p>
              <p className="mt-1 text-xl text-creme/80">{foto.legenda}</p>
              <p className="mt-2 text-lg text-creme/70">
                {aberta + 1} de {fotos.length}. Arraste para o lado para ver as outras.
              </p>
            </figcaption>
          </figure>

          <button type="button" onClick={proxima} aria-label="Próxima foto" className={botaoSeta}>
            <IconeSetaDireita />
          </button>
        </Modal>
      )}
    </>
  )
}
