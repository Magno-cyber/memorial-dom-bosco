import { useState } from 'react'
import Polaroid from './Polaroid.jsx'
import { fotos } from '../data/mock.js'

// Posição de cada fotografia na pilha (o último lugar fica por cima).
// A foto da frente fica um pouco mais baixa que as outras, para que as
// legendas das fotos de trás fiquem escondidas e só as bordas apareçam.
const LUGARES = [
  { r: -9, x: -30, y: 0 },
  { r: 8, x: 28, y: 6 },
  { r: -3, x: -12, y: 12 },
  { r: 2, x: 4, y: 20 },
]

const itens = [fotos[0], fotos[3], fotos[6], fotos[11]]

// Pilha de fotos antigas sobrepostas. Tocar em uma foto a traz para a frente;
// tocar na que já está na frente a manda para o fundo.
export default function Colagem() {
  const [ordem, setOrdem] = useState([0, 1, 2, 3]) // ordem[k] = foto no lugar k

  const tocar = (i) =>
    setOrdem((o) =>
      o[o.length - 1] === i ? [i, ...o.slice(0, -1)] : [...o.filter((x) => x !== i), i],
    )

  return (
    <div className="flex w-full flex-col items-center">
      <div className="w-full max-w-[20rem] animate-flutuar">
        <div className="relative aspect-[5/6] w-full">
          {itens.map((foto, i) => {
            const lugar = ordem.indexOf(i)
            const { r, x, y } = LUGARES[lugar]
            return (
              <button
                key={foto.id}
                type="button"
                onClick={() => tocar(i)}
                aria-label={`Foto de exemplo: ${foto.titulo}. Tocar para mudar a ordem da pilha.`}
                className="absolute top-0 left-1/2 w-[72%] transition-transform duration-700 ease-mola"
                style={{
                  zIndex: lugar,
                  transform: `translate(calc(-50% + ${x}px), ${y}px) rotate(${r}deg)`,
                }}
              >
                <Polaroid foto={foto} proporcao="aspect-[4/5]" />
              </button>
            )
          })}
        </div>
      </div>
      <p className="mt-2 font-legenda text-lg text-marinho-suave italic">
        Toque nas fotos para virar a pilha.
      </p>
    </div>
  )
}
