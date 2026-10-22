import Cena from './Cenas.jsx'

// Mostra a foto real quando há `src`; senão, uma ilustração de exemplo.
// `ajuste="contain"` mostra a foto inteira (visualizador); o padrão
// recorta para preencher o quadro (miniaturas).
export default function Retrato({ foto, ajuste = 'cover', className = '' }) {
  if (foto.src) {
    return (
      <img
        src={foto.src}
        alt={foto.titulo}
        loading="lazy"
        draggable={false}
        className={`${ajuste === 'contain' ? 'object-contain' : 'object-cover'} ${className}`}
      />
    )
  }

  return (
    <div
      role="img"
      aria-label={`${foto.titulo} (imagem de exemplo)`}
      className={`relative overflow-hidden ${className}`}
    >
      <Cena nome={foto.cena} tom={foto.tom} className="absolute inset-0 size-full" />
      {ajuste === 'contain' && (
        <span className="absolute right-3 bottom-3 rounded-lg bg-creme-claro/90 px-3 py-0.5 text-base text-marinho-suave">
          Imagem de exemplo
        </span>
      )}
    </div>
  )
}
