import { useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import Modal from '../components/Modal.jsx'
import { IconePlay } from '../components/Icones.jsx'
import Cena from '../components/Cenas.jsx'
import { videos, categoriasDeVideo } from '../data/mock.js'

function Miniatura({ video }) {
  return (
    <span
      className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-xl shadow-lg shadow-marinho/10"
    >
      <Cena nome={video.cena} tom={video.categoria === 'Eventos' ? 3 : video.categoria === 'Entrevistas' ? 1 : 2} className="absolute inset-0 size-full" />
      <span aria-hidden="true" className="absolute inset-0 bg-marinho/25" />
      {video.youtubeId && (
        <img
          src={`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`}
          alt=""
          loading="lazy"
          draggable={false}
          className="absolute inset-0 size-full object-cover"
        />
      )}
      <span className="relative flex size-20 items-center justify-center rounded-full border-4 border-dourado-claro bg-marinho text-5xl text-creme transition-transform duration-300 ease-mola group-hover:scale-110 group-active:scale-90">
        <IconePlay className="translate-x-0.5" />
      </span>
      <span className="absolute top-3 left-3 rounded-lg bg-creme-claro px-3 py-0.5 text-base font-bold text-marinho">
        {video.categoria}
      </span>
      <span className="absolute right-3 bottom-3 rounded-md bg-creme-claro px-2 py-0.5 text-base text-marinho">
        {video.duracao}
      </span>
    </span>
  )
}

function Reprodutor({ video }) {
  if (video.youtubeId) {
    return (
      <iframe
        title={video.titulo}
        src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
        className="aspect-video w-full rounded-lg bg-marinho"
      />
    )
  }
  return (
    <div className="flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-lg bg-marinho-suave px-6 text-center">
      <IconePlay className="text-7xl text-dourado-claro" />
      <p className="font-titulo text-2xl">Vídeo de exemplo</p>
      <p className="max-w-md text-xl text-creme/90">
        O vídeo real será incluído quando o link do YouTube estiver disponível.
      </p>
    </div>
  )
}

// RF04: cards com miniatura, título, ano e descrição; filtro por categoria;
// reprodução embutida.
export default function Videos() {
  const [filtro, setFiltro] = useState('Todos')
  const [aberto, setAberto] = useState(null)

  const lista = filtro === 'Todos' ? videos : videos.filter((v) => v.categoria === filtro)
  const contar = (c) => (c === 'Todos' ? videos.length : videos.filter((v) => v.categoria === c).length)

  return (
    <>
      <PageHeader titulo="Vídeos">Escolha uma categoria e toque em um vídeo para assistir.</PageHeader>

      <div className="mx-auto w-full max-w-6xl px-5 pb-24 md:px-10">
        <div role="group" aria-label="Filtrar por categoria" className="flex flex-wrap gap-4">
          {categoriasDeVideo.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={filtro === c}
              onClick={() => setFiltro(c)}
              className={[
                'flex min-h-[60px] items-center gap-2 rounded-xl border-2 px-5 font-texto text-xl font-semibold transition-all duration-300 ease-mola active:scale-95',
                filtro === c
                  ? 'border-marinho bg-marinho text-creme'
                  : 'border-creme-linha bg-creme-claro text-marinho hover:border-dourado',
              ].join(' ')}
            >
              {c}
              <span
                className={`rounded-lg px-2 text-base ${
                  filtro === c ? 'bg-dourado text-marinho' : 'bg-creme-fundo text-marinho-suave'
                }`}
              >
                {contar(c)}
              </span>
            </button>
          ))}
        </div>

        {/* `key` faz os cards "saltarem" de novo a cada troca de filtro */}
        <ul key={filtro} className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {lista.map((v, i) => (
            <li key={v.id} className="animate-pop" style={{ animationDelay: `${i * 70}ms` }}>
              <button
                type="button"
                onClick={() => setAberto(v)}
                className="group block w-full text-left transition-transform duration-300 ease-mola hover:-translate-y-1 active:scale-[0.97]"
              >
                <Miniatura video={v} />
                <span className="mt-3 block font-titulo text-xl font-semibold text-dourado-escuro">
                  {v.ano}
                </span>
                <span className="block font-titulo text-2xl leading-tight font-semibold text-marinho">
                  {v.titulo}
                </span>
                <span className="mt-1 block text-lg text-marinho-suave">{v.descricao}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {aberto && (
        <Modal rotulo={`Vídeo: ${aberto.titulo}`} aoFechar={() => setAberto(null)}>
          <div className="w-full max-w-5xl">
            <Reprodutor video={aberto} />
            <p className="mt-4 text-center font-titulo text-2xl font-semibold sm:text-3xl">
              {aberto.titulo}, {aberto.ano}
            </p>
            <p className="text-center text-xl text-creme/80">{aberto.categoria}</p>
          </div>
        </Modal>
      )}
    </>
  )
}
