import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import TecladoVirtual from '../components/TecladoVirtual.jsx'
import Modal from '../components/Modal.jsx'
import { IconeBusca } from '../components/Icones.jsx'
import { modoTotem } from '../modoTotem.js'
import { pessoas } from '../data/mock.js'
import { lerCheckins } from '../data/checkins.js'

// Tira acentos e maiúsculas: "João" casa com "joao".
const limpar = (t) => t.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase()

const iniciais = (nome) =>
  nome
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0].toUpperCase())
    .join('')

// RF09 (demonstração): busca de colegas por nome, com teclado na tela para o totem.
export default function Colegas() {
  const [busca, setBusca] = useState('')
  const [teclado, setTeclado] = useState(modoTotem)
  const [aberto, setAberto] = useState(null)

  const todas = useMemo(() => [...lerCheckins(), ...pessoas], [])
  const termos = limpar(busca).split(/\s+/).filter(Boolean)
  const lista = todas.filter((p) => {
    const nome = limpar(p.nome)
    return termos.every((t) => nome.includes(t))
  })

  return (
    <>
      <PageHeader titulo="Encontrar colega">Digite um nome e veja quem passou pela escola.</PageHeader>

      <div className="mx-auto w-full max-w-4xl px-5 pb-24 md:px-10">
        <div className="relative">
          <IconeBusca className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-3xl text-marinho-suave" />
          <input
            type="search"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            readOnly={teclado}
            inputMode={teclado ? 'none' : 'search'}
            aria-label="Buscar pelo nome"
            placeholder="Digite um nome, ex.: joao sales"
            className="min-h-16 w-full rounded-xl border-2 border-dourado bg-creme-claro pr-5 pl-14 text-2xl text-marinho placeholder:text-marinho-suave/70"
          />
        </div>

        <div className="mt-3 flex items-center justify-between gap-3">
          <button
            type="button"
            aria-pressed={teclado}
            onClick={() => setTeclado((v) => !v)}
            className="min-h-[60px] rounded-xl border-2 border-creme-linha px-5 font-texto text-xl font-semibold active:scale-95 aria-pressed:border-marinho aria-pressed:bg-marinho aria-pressed:text-creme"
          >
            Teclado na tela
          </button>
          <p role="status" className="text-lg text-marinho-suave">
            {lista.length === 1 ? '1 pessoa' : `${lista.length} pessoas`}
            {termos.length ? (lista.length === 1 ? ' encontrada' : ' encontradas') : ' no memorial'} · dados de exemplo
          </p>
        </div>

        {teclado && (
          <div className="mt-4">
            <TecladoVirtual valor={busca} aoDigitar={setBusca} />
          </div>
        )}

        {lista.length === 0 ? (
          <div className="mt-10 rounded-xl border-2 border-dashed border-creme-linha p-8 text-center">
            <p className="font-titulo text-2xl font-semibold">Ninguém com esse nome ainda</p>
            <p className="mt-2 text-xl text-marinho-suave">
              Confira a escrita ou faça o seu check-in para entrar no memorial.
            </p>
            <Link to="/checkin" className="mt-5 inline-flex min-h-[60px] items-center rounded-xl bg-marinho px-6 font-texto text-xl font-semibold text-creme">
              Fazer meu check-in
            </Link>
          </div>
        ) : (
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 wide:grid-cols-3">
            {lista.map((p) => (
              <li key={p.id}>
                <button
                  type="button"
                  onClick={() => setAberto(p)}
                  className="flex min-h-20 w-full items-center gap-4 rounded-xl border border-creme-linha bg-creme-claro p-3 text-left shadow-sm transition-transform duration-300 ease-mola hover:-translate-y-0.5 active:scale-[0.97]"
                >
                  <span aria-hidden="true" className="flex size-14 shrink-0 items-center justify-center rounded-full bg-marinho font-titulo text-2xl font-semibold text-creme">
                    {iniciais(p.nome)}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-titulo text-xl leading-snug font-semibold">{p.nome}</span>
                    <span className="block text-lg text-marinho-suave">
                      {p.ano}
                      {p.turma ? ` · Turma ${p.turma}` : ''}
                      {p.novo && <b className="ml-2 rounded-lg bg-dourado-claro px-2 text-base text-marinho">novo</b>}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {aberto && (
        <Modal rotulo={`Perfil de ${aberto.nome}`} aoFechar={() => setAberto(null)}>
          <div className="w-full max-w-md rounded-xl bg-creme-claro p-8 text-center text-marinho">
            <span aria-hidden="true" className="mx-auto flex size-24 items-center justify-center rounded-full bg-marinho font-titulo text-4xl font-semibold text-creme">
              {iniciais(aberto.nome)}
            </span>
            <h2 className="mt-4 text-3xl font-semibold">{aberto.nome}</h2>
            <p className="mt-2 text-2xl text-marinho-suave">
              Estudou em {aberto.ano}
              {aberto.turma ? ` · Turma ${aberto.turma}` : ''}
            </p>
            {(aberto.instagram || aberto.facebook) && (
              <p className="mt-3 text-xl">{[aberto.instagram, aberto.facebook].filter(Boolean).join(' · ')}</p>
            )}
            <p className="mt-5 text-lg text-marinho-suave italic">Perfil de exemplo. As fotos aparecem aqui após a aprovação.</p>
          </div>
        </Modal>
      )}
    </>
  )
}
