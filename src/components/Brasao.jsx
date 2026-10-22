// BRASÃO PROVISÓRIO. Quando o marketing enviar o brasão em vetor (SVG),
// troque o conteúdo deste componente por <img src="/brasao.svg" ... />
// (com o arquivo em public/brasao.svg). O resto do site não precisa mudar.
export function Brasao({ className = '' }) {
  return (
    <svg
      viewBox="0 0 100 110"
      role="img"
      aria-label="Brasão do Memorial (imagem provisória)"
      className={className}
    >
      <path
        d="M50 4 90 16v38c0 26-18 42-40 52C28 96 10 80 10 54V16Z"
        fill="#1F3A5F"
        stroke="#B8925A"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M50 44c-8-6-18-6-26-3v28c8-3 18-3 26 3 8-6 18-6 26-3V41c-8-3-18-3-26 3Z"
        fill="#F5EFE4"
      />
      <path d="M50 44v28" stroke="#1F3A5F" strokeWidth="2" />
      <path
        d="m50 14 3.5 7.2 7.9 1.1-5.7 5.6 1.4 7.9L50 32l-7.1 3.8 1.4-7.9-5.7-5.6 7.9-1.1Z"
        fill="#B8925A"
      />
    </svg>
  )
}

const FOLHAS = 9
const RAIO = 40
const ponto = (graus, r = RAIO) => {
  const rad = (graus * Math.PI) / 180
  return [50 + r * Math.cos(rad), 50 + r * Math.sin(rad)]
}

// Um ramo de louro: folhas ao longo de um arco, de baixo até a lateral.
function Ramo() {
  const folhas = []
  for (let i = 0; i < FOLHAS; i++) {
    const t = i / (FOLHAS - 1)
    const graus = 102 + t * 138
    const lado = i % 2 === 0 ? 1 : -1
    const [x, y] = ponto(graus, RAIO + lado * 2.6)
    const escala = 1 - t * 0.3
    folhas.push(
      <ellipse
        key={i}
        cx="0"
        cy="0"
        rx={2.7 * escala}
        ry={6.6 * escala}
        transform={`translate(${x.toFixed(2)} ${y.toFixed(2)}) rotate(${(graus + lado * 28).toFixed(1)})`}
        fill={i % 2 === 0 ? '#B8925A' : '#8A6A38'}
      />,
    )
  }
  const [x0, y0] = ponto(98)
  const [x1, y1] = ponto(242)
  return (
    <g>
      <path
        d={`M${x0.toFixed(2)} ${y0.toFixed(2)} A${RAIO} ${RAIO} 0 0 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`}
        fill="none"
        stroke="#B8925A"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      {folhas}
    </g>
  )
}

// Coroa de louro em volta de qualquer conteúdo (por exemplo, o brasão).
export function Louro({ children, className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 100 100" aria-hidden="true" className="absolute inset-0 size-full">
        <Ramo />
        <g transform="translate(100 0) scale(-1 1)">
          <Ramo />
        </g>
      </svg>
      <div className="relative flex size-full items-center justify-center">{children}</div>
    </div>
  )
}
