import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import { salvarCheckin } from '../data/checkins.js'

const ANOS = Array.from({ length: 2026 - 1984 }, (_, i) => String(2026 - i))
const LIMITE_FOTOS = 5
const LIMITE_MB = 10

const campo =
  'mt-1 min-h-[60px] w-full rounded-xl border-2 border-creme-linha bg-creme-claro px-4 text-xl text-marinho placeholder:text-marinho-suave/70 focus:border-dourado-escuro'

function Rotulo({ id, children, opcional }) {
  return (
    <label htmlFor={id} className="block font-texto text-xl font-semibold">
      {children}
      {opcional && <span className="ml-2 font-texto text-lg font-normal text-marinho-suave">(opcional)</span>}
    </label>
  )
}

// RF08 (demonstração): formulário do visitante. Fica só neste aparelho.
export default function CheckInForm() {
  const [enviado, setEnviado] = useState(null)
  const [erros, setErros] = useState({})

  const enviar = (e) => {
    e.preventDefault()
    const dados = new FormData(e.currentTarget)
    const nome = dados.get('nome').trim()
    const email = dados.get('email').trim()
    const novos = {}
    if (nome.split(/\s+/).filter(Boolean).length < 2) novos.nome = 'Escreva nome e sobrenome.'
    if (!/^\S+@\S+\.\S+$/.test(email)) novos.email = 'Escreva um e-mail válido, como nome@email.com.'
    if (!dados.get('ano')) novos.ano = 'Escolha o ano em que você estudou.'
    if (!dados.get('autorizo')) novos.autorizo = 'Para continuar, é preciso autorizar o uso dos dados.'

    const fotos = dados.getAll('fotos').filter((f) => f.size > 0)
    if (fotos.length > LIMITE_FOTOS) novos.fotos = `Envie até ${LIMITE_FOTOS} fotos.`
    else if (fotos.some((f) => f.size > LIMITE_MB * 1024 * 1024))
      novos.fotos = `Cada foto pode ter até ${LIMITE_MB} MB.`

    setErros(novos)
    if (Object.keys(novos).length) {
      document.getElementById(`campo-${Object.keys(novos)[0]}`)?.focus()
      return
    }

    setEnviado(
      salvarCheckin({
        nome,
        ano: dados.get('ano'),
        turma: dados.get('turma').trim(),
        instagram: dados.get('instagram').trim(),
        facebook: dados.get('facebook').trim(),
      }),
    )
  }

  if (enviado) {
    return (
      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center px-4 py-14 text-center">
        <span aria-hidden="true" className="mx-auto flex size-24 animate-pop items-center justify-center rounded-full bg-dourado text-6xl text-marinho">
          ✓
        </span>
        <h1 className="mt-6 text-4xl font-semibold">Check-in enviado!</h1>
        <p className="mt-3 text-2xl text-marinho-suave">
          Obrigado, {enviado.nome.split(' ')[0]}. Depois da aprovação da equipe, os seus colegas
          encontram você pela busca de nome.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/colegas" className="flex min-h-[60px] items-center rounded-xl bg-marinho px-7 font-texto text-2xl font-semibold text-creme active:scale-95">
            Encontrar um colega
          </Link>
          <Link to="/" className="flex min-h-[60px] items-center rounded-xl border-2 border-dourado px-7 font-texto text-2xl font-semibold active:scale-95">
            Voltar ao início
          </Link>
        </div>
        <p className="mt-6 text-lg text-marinho-suave italic">Demonstração: os dados ficam só neste aparelho.</p>
      </div>
    )
  }

  const erro = (n) =>
    erros[n] && (
      <p id={`erro-${n}`} role="alert" className="mt-1 text-lg font-bold text-[#9b2c2c]">
        {erros[n]}
      </p>
    )
  const ligacao = (n) => ({ id: `campo-${n}`, name: n, 'aria-invalid': !!erros[n], 'aria-describedby': erros[n] ? `erro-${n}` : undefined })

  return (
    <>
      <PageHeader titulo="Faça o seu check-in">Leva menos de um minuto.</PageHeader>

      <form onSubmit={enviar} noValidate className="mx-auto w-full max-w-xl space-y-8 px-5 pb-24 md:px-10">
        <div>
          <Rotulo id="campo-nome">Nome completo</Rotulo>
          <input {...ligacao('nome')} type="text" autoComplete="name" placeholder="Ex.: Maria da Silva Souza" className={campo} />
          {erro('nome')}
        </div>

        <div>
          <Rotulo id="campo-email">E-mail</Rotulo>
          <input {...ligacao('email')} type="email" autoComplete="email" inputMode="email" placeholder="nome@email.com" className={campo} />
          <p className="mt-1 text-lg text-marinho-suave">Não aparece para os outros visitantes.</p>
          {erro('email')}
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <Rotulo id="campo-ano">Ano em que estudou</Rotulo>
            <select {...ligacao('ano')} defaultValue="" className={campo}>
              <option value="" disabled>
                Escolha
              </option>
              {ANOS.map((a) => (
                <option key={a}>{a}</option>
              ))}
            </select>
            {erro('ano')}
          </div>
          <div>
            <Rotulo id="campo-turma" opcional>
              Turma
            </Rotulo>
            <input {...ligacao('turma')} type="text" placeholder="Ex.: 3º A" className={campo} />
          </div>
        </div>

        <div>
          <Rotulo id="campo-fotos" opcional>
            Fotos
          </Rotulo>
          <input
            {...ligacao('fotos')}
            type="file"
            accept="image/jpeg,image/png"
            multiple
            className={`${campo} flex items-center py-2 text-lg file:mr-3 file:rounded-lg file:border-0 file:bg-marinho file:px-4 file:py-2 file:font-bold file:text-creme`}
          />
          <p className="mt-1 text-lg text-marinho-suave">Até {LIMITE_FOTOS} fotos, JPG ou PNG, de até {LIMITE_MB} MB cada.</p>
          {erro('fotos')}
        </div>

        <div>
          <Rotulo id="campo-instagram" opcional>
            Instagram
          </Rotulo>
          <input {...ligacao('instagram')} type="text" placeholder="@seuperfil" className={campo} />
        </div>
        <div>
          <Rotulo id="campo-facebook" opcional>
            Facebook
          </Rotulo>
          <input {...ligacao('facebook')} type="text" placeholder="facebook.com/seuperfil" className={campo} />
        </div>

        <div>
          <label className="flex cursor-pointer items-start gap-3 text-xl">
            <input {...ligacao('autorizo')} type="checkbox" className="mt-1.5 size-6 shrink-0 accent-[#1f3a5f]" />
            <span>
              Autorizo o Memorial a guardar estes dados e a mostrar meu nome, ano, turma e fotos
              aprovadas na busca. Meu e-mail não será exibido.
            </span>
          </label>
          {erro('autorizo')}
        </div>

        <button
          type="submit"
          className="flex min-h-[60px] w-full items-center justify-center rounded-xl bg-marinho font-texto text-2xl font-semibold text-creme transition-transform duration-300 ease-mola active:scale-95"
        >
          Enviar check-in
        </button>
        <p className="text-center text-lg text-marinho-suave italic">Demonstração: os dados ficam só neste aparelho.</p>
      </form>
    </>
  )
}
