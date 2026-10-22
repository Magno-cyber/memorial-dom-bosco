import { useEffect, useRef, useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import {
  IconeEscola,
  IconeCapelo,
  IconeLivro,
  IconeTrofeu,
  IconeEstrela,
} from '../components/Icones.jsx'
import { linhaDoTempo } from '../data/mock.js'

const ICONES = {
  escola: IconeEscola,
  capelo: IconeCapelo,
  livro: IconeLivro,
  trofeu: IconeTrofeu,
  estrela: IconeEstrela,
}

// Metade da altura do marcador (3.5rem), onde a linha vertical passa.
const CENTRO_MARCADOR = 28

// Linha do tempo vertical (RF02). A linha dourada se preenche conforme a pessoa
// rola a página, e o marco que acabou de ser alcançado ganha destaque.
export default function History() {
  const contorno = useRef(null)
  const linha = useRef(null)
  const [ativo, setAtivo] = useState(-1)
  const [tocado, setTocado] = useState(null)

  useEffect(() => {
    let quadro = 0

    const atualizar = () => {
      quadro = 0
      const el = contorno.current
      const trilho = linha.current
      if (!el || !trilho) return
      const marcos = el.querySelectorAll('li')
      if (marcos.length < 2) return

      // A linha vai do centro do primeiro marcador ao do último.
      const alto = marcos[marcos.length - 1].offsetTop - marcos[0].offsetTop
      trilho.style.height = `${alto}px`

      const meio = window.innerHeight * 0.55
      const topo = trilho.getBoundingClientRect().top
      // No fim da página o último marco já foi alcançado, mesmo que ele não
      // chegue à linha de leitura (o rodapé segura a rolagem).
      const noFim = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4
      const progresso = noFim ? 1 : Math.min(1, Math.max(0, (meio - topo) / alto))
      trilho.style.setProperty('--p', progresso.toFixed(4))

      let alcancado = -1
      marcos.forEach((li, i) => {
        if (li.getBoundingClientRect().top + CENTRO_MARCADOR <= meio) alcancado = i
      })
      setAtivo(noFim ? marcos.length - 1 : alcancado)
    }

    const aoRolar = () => {
      if (!quadro) quadro = requestAnimationFrame(atualizar)
    }

    atualizar()
    window.addEventListener('scroll', aoRolar, { passive: true })
    window.addEventListener('resize', aoRolar)
    return () => {
      cancelAnimationFrame(quadro)
      window.removeEventListener('scroll', aoRolar)
      window.removeEventListener('resize', aoRolar)
    }
  }, [])

  return (
    <>
      <PageHeader titulo="História">
        Os marcos que construíram a nossa escola. Role a página para viajar no tempo.
      </PageHeader>

      <div className="mx-auto w-full max-w-5xl px-5 pt-4 pb-24 md:px-10">
        <div ref={contorno} className="relative">
          {/* Linha de fundo e linha dourada que avança com a rolagem */}
          <div
            ref={linha}
            aria-hidden="true"
            className="absolute top-7 left-7 w-1 -translate-x-1/2 rounded-full bg-creme-linha md:left-1/2"
          >
            <span
              className="absolute top-0 left-0 w-full rounded-full bg-dourado"
              style={{ height: 'calc(var(--p, 0) * 100%)' }}
            />
          </div>

          <ol>
            {linhaDoTempo.map((marco, i) => {
              const Icone = ICONES[marco.icone] ?? IconeEstrela
              const par = i % 2 === 0
              const estado = i < ativo ? 'passado' : i === ativo ? 'ativo' : 'futuro'

              return (
                <li
                  key={marco.id}
                  className="grid grid-cols-[3.5rem_1fr] gap-x-4 pb-14 last:pb-0 md:grid-cols-[1fr_3.5rem_1fr] md:gap-x-10 md:pb-24"
                >
                  <div className="col-start-1 row-start-1 flex justify-center md:col-start-2">
                    <span
                      aria-hidden="true"
                      onPointerDown={() => setTocado(marco.id)}
                      onAnimationEnd={() => setTocado(null)}
                      className={[
                        'relative z-10 flex size-14 items-center justify-center rounded-full border-4 text-3xl transition-all duration-500 ease-mola',
                        estado === 'passado' && 'border-dourado bg-marinho text-creme',
                        estado === 'ativo' &&
                          'scale-125 border-dourado bg-dourado text-marinho shadow-lg shadow-marinho/10',
                        estado === 'futuro' && 'border-creme-linha bg-creme-claro text-marinho-suave',
                        tocado === marco.id && 'animate-balancar',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                    >
                      <Icone />
                    </span>
                  </div>

                  <div
                    className={`col-start-2 row-start-1 ${par ? 'md:col-start-1' : 'md:col-start-3'}`}
                  >
                    <p
                      className={`font-titulo text-5xl leading-none font-semibold md:hidden ${
                        estado === 'ativo' ? 'text-marinho' : 'text-dourado-escuro'
                      }`}
                    >
                      {marco.ano}
                    </p>
                    <div
                      className={[
                        'mt-3 rounded-xl border bg-creme-claro p-5 transition-all duration-500 ease-mola md:mt-0',
                        estado === 'ativo'
                          ? '-translate-y-1 border-dourado shadow-lg shadow-marinho/10'
                          : 'border-creme-linha shadow-sm',
                      ].join(' ')}
                    >
                      <h2 className="text-2xl font-semibold text-marinho">{marco.titulo}</h2>
                      <p className="mt-2 text-lg text-marinho md:text-xl">{marco.texto}</p>
                    </div>
                  </div>

                  <p
                    className={`hidden row-start-1 font-titulo text-6xl leading-none font-semibold md:block ${
                      par ? 'md:col-start-3 text-left' : 'md:col-start-1 text-right'
                    } ${estado === 'ativo' ? 'text-marinho' : 'text-dourado-escuro'}`}
                  >
                    {marco.ano}
                  </p>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </>
  )
}
