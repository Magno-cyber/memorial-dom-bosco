const LINHAS = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM']

const tecla =
  'flex min-h-[60px] min-w-11 flex-1 items-center justify-center rounded-lg bg-creme-claro font-texto text-2xl font-semibold text-marinho shadow-lg shadow-marinho/10 transition-transform duration-150 active:translate-y-0.5 active:scale-95 active:bg-dourado-claro'

// Teclado na tela para o totem. Só mexe no texto: aoDigitar recebe o novo valor.
export default function TecladoVirtual({ valor, aoDigitar }) {
  return (
    <div
      role="group"
      aria-label="Teclado na tela"
      className="mx-auto w-full max-w-2xl space-y-2 rounded-xl bg-creme-fundo p-3"
    >
      {LINHAS.map((linha, i) => (
        <div key={linha} className="flex justify-center gap-1.5">
          {[...linha].map((letra) => (
            <button key={letra} type="button" className={tecla} onClick={() => aoDigitar(valor + letra.toLowerCase())}>
              {letra}
            </button>
          ))}
          {i === 2 && (
            <button
              type="button"
              aria-label="Apagar"
              className={`${tecla} flex-[1.7] text-lg`}
              onClick={() => aoDigitar(valor.slice(0, -1))}
            >
              ⌫ Apagar
            </button>
          )}
        </div>
      ))}
      <div className="flex justify-center gap-1.5">
        <button type="button" className={`${tecla} max-w-48 text-lg`} onClick={() => aoDigitar('')}>
          Limpar
        </button>
        <button type="button" className={`${tecla} flex-[5]`} onClick={() => aoDigitar(valor + ' ')}>
          espaço
        </button>
      </div>
    </div>
  )
}
