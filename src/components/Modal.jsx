import { useEffect, useRef } from 'react'
import { IconeFechar } from './Icones.jsx'

// Janela em tela cheia usada pelo visualizador de fotos e pelo player de vídeo.
// Fecha com o botão, tocando fora do conteúdo ou com Esc.
export default function Modal({ rotulo, aoFechar, aoAnterior, aoProximo, children }) {
  const botaoFechar = useRef(null)
  // Guarda as funções mais recentes sem reiniciar o efeito a cada renderização.
  const acoes = useRef({ aoFechar, aoAnterior, aoProximo })
  useEffect(() => {
    acoes.current = { aoFechar, aoAnterior, aoProximo }
  })

  useEffect(() => {
    const anterior = document.activeElement
    botaoFechar.current?.focus()

    const aoTeclar = (e) => {
      if (e.key === 'Escape') acoes.current.aoFechar()
      if (e.key === 'ArrowLeft') acoes.current.aoAnterior?.()
      if (e.key === 'ArrowRight') acoes.current.aoProximo?.()
    }
    window.addEventListener('keydown', aoTeclar)
    return () => {
      window.removeEventListener('keydown', aoTeclar)
      anterior?.focus?.()
    }
  }, [])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={rotulo}
      className="fixed inset-0 z-50 flex flex-col bg-marinho text-creme"
      onClick={aoFechar}
    >
      <div className="flex justify-end p-4">
        <button
          ref={botaoFechar}
          type="button"
          onClick={aoFechar}
          className="flex min-h-16 items-center gap-2 rounded-xl border-2 border-creme/60 px-6 text-2xl active:bg-creme/15"
        >
          <IconeFechar className="text-3xl" />
          <span className="font-texto font-semibold">Fechar</span>
        </button>
      </div>

      <div
        className="flex min-h-0 flex-1 items-center justify-center gap-2 px-3 pb-6 sm:px-8"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}
