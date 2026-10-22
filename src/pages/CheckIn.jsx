import { Link } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'
import PageHeader from '../components/PageHeader.jsx'

const PASSOS = [
  { titulo: 'Abra a câmera do celular', texto: 'Aponte para o QR Code ao lado.' },
  { titulo: 'Preencha seus dados', texto: 'Nome, ano em que estudou, turma e, se quiser, fotos e redes sociais.' },
  { titulo: 'Pronto', texto: 'Depois da aprovação da equipe, seus colegas encontram você na busca por nome.' },
]

// RF07 (demonstração): o QR Code abre o formulário no celular do visitante.
export default function CheckIn() {
  const endereco = `${window.location.origin}/checkin/formulario`

  return (
    <>
      <PageHeader titulo="Check-in">
        Registre a sua passagem pela escola e seja encontrado por quem estudou com você.
      </PageHeader>

      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 pb-24 md:px-10 wide:grid-cols-[auto_1fr] wide:gap-16">
        <div className="mx-auto w-full max-w-[18rem] rounded-xl border-2 border-dourado bg-creme-claro p-5 text-center shadow-lg shadow-marinho/10">
          <QRCodeSVG
            value={endereco}
            level="M"
            bgColor="#FAF5EA"
            fgColor="#1f3a5f"
            className="h-auto w-full"
            title="QR Code para abrir o formulário de check-in"
          />
          <p className="mt-3 font-texto text-lg tracking-wide text-marinho-suave uppercase">
            Aponte a câmera do celular
          </p>
        </div>

        <div>
          <ol className="space-y-6">
            {PASSOS.map((p, i) => (
              <li key={p.titulo} className="flex items-start gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-marinho font-titulo text-2xl font-semibold text-creme">
                  {i + 1}
                </span>
                <div>
                  <h2 className="text-2xl font-semibold">{p.titulo}</h2>
                  <p className="text-xl text-marinho-suave">{p.texto}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/checkin/formulario"
              className="flex min-h-[60px] items-center rounded-xl bg-marinho px-7 font-texto text-2xl font-semibold text-creme transition-transform duration-300 ease-mola hover:-translate-y-0.5 active:scale-95"
            >
              Abrir o formulário aqui
            </Link>
            <Link
              to="/colegas"
              className="flex min-h-[60px] items-center rounded-xl border-2 border-dourado px-7 font-texto text-2xl font-semibold text-marinho transition-transform duration-300 ease-mola hover:-translate-y-0.5 active:scale-95"
            >
              Encontrar um colega
            </Link>
          </div>
          <p className="mt-5 text-lg text-marinho-suave italic">
            Demonstração: neste MVP os cadastros ficam só neste aparelho, e o QR Code abre o
            formulário no endereço em que o site está publicado.
          </p>
        </div>
      </div>
    </>
  )
}
