import Retrato from './Retrato.jsx'

// Foto com moldura de papel e legenda, no estilo das fotos antigas.
export default function Polaroid({ foto, proporcao = 'aspect-[4/3]', className = '' }) {
  return (
    <div
      className={`bg-creme-claro p-[0.55rem] pb-2 shadow-lg shadow-marinho/10 ring-1 ring-marinho/10 ${className}`}
    >
      <Retrato foto={foto} className={`${proporcao} w-full`} />
      <p className="mt-2 mb-0.5 text-left font-legenda text-[0.95rem] leading-snug text-marinho italic">
        {foto.titulo}
      </p>
    </div>
  )
}
