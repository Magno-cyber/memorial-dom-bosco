import { useId } from 'react'

// Ilustrações de exemplo no lugar das fotos reais. Cada cena é um desenho simples
// em SVG, com cores de papel antigo, que preenche o quadro (viewBox 400 x 300).
// Quando as fotos oficiais chegarem, preencha `src` em src/data/mock.js e estas
// ilustrações deixam de aparecer.

const MARINHO = '#1f3a5f'
const MEDIO = '#4a617f'
const OURO = '#b8925a'
const OURO_CLARO = '#e6d3ae'
const CREME = '#fffbf2'

// [céu, chão]: um par para cada `tom` (0 a 4) das fotos.
const TONS = [
  ['#efe0c0', '#cdb68a'],
  ['#e4d3ad', '#b49a6c'],
  ['#d6dfe9', '#9fb0c4'],
  ['#f0e4c8', '#c8aa78'],
  ['#d2dbe6', '#8ea3bb'],
]

// Pequeno gerador de números repetível, para as cenas não "pularem" a cada renderização.
const sorteio = (semente) => {
  let s = semente
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

function Fachada() {
  return (
    <g>
      <circle cx="330" cy="58" r="22" fill={CREME} opacity="0.8" />
      {/* árvores */}
      <circle cx="52" cy="190" r="38" fill={MEDIO} opacity="0.55" />
      <rect x="48" y="210" width="8" height="40" fill={MARINHO} opacity="0.6" />
      <circle cx="352" cy="196" r="34" fill={MEDIO} opacity="0.55" />
      <rect x="348" y="214" width="8" height="36" fill={MARINHO} opacity="0.6" />
      {/* prédio */}
      <rect x="86" y="118" width="228" height="118" fill={CREME} />
      <rect x="86" y="118" width="228" height="10" fill={OURO_CLARO} />
      <polygon points="104,118 200,66 296,118" fill={OURO} />
      <polygon points="126,114 200,76 274,114" fill={OURO_CLARO} />
      <circle cx="200" cy="98" r="9" fill={MARINHO} />
      {[120, 156, 232, 268].map((x) => (
        <g key={x}>
          <rect x={x} y="140" width="16" height="48" rx="2" fill={MARINHO} opacity="0.85" />
          <rect x={x} y="196" width="16" height="30" rx="2" fill={MEDIO} opacity="0.6" />
        </g>
      ))}
      {[176, 200, 224].map((x) => (
        <rect key={x} x={x - 6} y="136" width="12" height="100" fill={OURO_CLARO} />
      ))}
      <path d="M188 236v-44a12 12 0 0 1 24 0v44Z" fill={MARINHO} />
      <rect x="76" y="236" width="248" height="8" fill={OURO} />
      <rect x="66" y="244" width="268" height="8" fill={OURO_CLARO} />
      <line x1="200" y1="66" x2="200" y2="40" stroke={MARINHO} strokeWidth="3" />
      <path d="M200 40h24l-6 6 6 6h-24Z" fill={OURO} />
    </g>
  )
}

function Sala() {
  return (
    <g>
      <rect x="52" y="34" width="296" height="108" rx="4" fill={MARINHO} />
      <rect x="52" y="34" width="296" height="108" rx="4" fill="none" stroke={OURO} strokeWidth="6" />
      <path d="M78 66h110M78 86h150M78 106h90" stroke={CREME} strokeWidth="4" strokeLinecap="round" opacity="0.85" />
      <path d="M262 108l22-34 22 34Z" fill="none" stroke={OURO_CLARO} strokeWidth="4" strokeLinejoin="round" />
      {/* mesa do professor */}
      <rect x="296" y="176" width="70" height="8" fill={OURO} />
      <rect x="302" y="184" width="6" height="40" fill={MARINHO} />
      <rect x="354" y="184" width="6" height="40" fill={MARINHO} />
      {/* carteiras e alunos */}
      {[0, 1, 2].map((i) => {
        const x = 40 + i * 104
        return (
          <g key={i}>
            <circle cx={x + 34} cy="190" r="13" fill={i === 1 ? OURO : MEDIO} />
            <path d={`M${x + 14} 232c0-22 40-22 40 0Z`} fill={i === 1 ? MEDIO : MARINHO} opacity="0.9" />
            <rect x={x} y="218" width="68" height="9" rx="2" fill={OURO} />
            <rect x={x + 6} y="227" width="5" height="34" fill={MARINHO} />
            <rect x={x + 57} y="227" width="5" height="34" fill={MARINHO} />
          </g>
        )
      })}
    </g>
  )
}

function Biblioteca() {
  const livros = [MARINHO, OURO, MEDIO, '#8a6a38', OURO_CLARO, '#2c4f7d']
  const alea = sorteio(7)
  const estantes = [{ x0: 28 }, { x0: 220 }]
  return (
    <g>
      {estantes.map(({ x0 }, e) => (
        <g key={e}>
          <rect x={x0} y="22" width="164" height="190" fill="#8a6a38" opacity="0.9" />
          {[0, 1, 2].map((p) => {
            const y = 28 + p * 61
            let x = x0 + 8
            const itens = []
            let k = 0
            while (x < x0 + 150) {
              const w = 8 + Math.floor(alea() * 9)
              const h = 36 + Math.floor(alea() * 18)
              itens.push(
                <rect key={k++} x={x} y={y + 52 - h} width={w} height={h} fill={livros[Math.floor(alea() * livros.length)]} />,
              )
              x += w + 1
            }
            return (
              <g key={p}>
                {itens}
                <rect x={x0 + 4} y={y + 52} width="156" height="6" fill="#5e4726" />
              </g>
            )
          })}
        </g>
      ))}
      {/* mesa de leitura com abajur */}
      <rect x="110" y="236" width="180" height="12" rx="3" fill={OURO} />
      <rect x="124" y="248" width="8" height="40" fill={MARINHO} />
      <rect x="268" y="248" width="8" height="40" fill={MARINHO} />
      <path d="M178 236v-22M178 214l30-14" stroke={MARINHO} strokeWidth="4" strokeLinecap="round" />
      <path d="M200 198l26 8-8 14Z" fill={OURO_CLARO} />
      <rect x="236" y="226" width="34" height="10" fill={CREME} />
      <rect x="240" y="219" width="30" height="8" fill={MEDIO} />
    </g>
  )
}

function Formatura() {
  const figuras = [92, 200, 308]
  return (
    <g>
      <path d="M0 0h70v180q-35 14-70 0Z" fill={MARINHO} opacity="0.85" />
      <path d="M400 0h-70v180q35 14 70 0Z" fill={MARINHO} opacity="0.85" />
      <rect x="0" y="236" width="400" height="64" fill={OURO} opacity="0.55" />
      {/* capelos no ar */}
      {[
        [130, 60, -14],
        [250, 40, 12],
        [338, 90, 20],
        [58, 98, 8],
      ].map(([x, y, r], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
          <polygon points="-18,0 0,-8 18,0 0,8" fill={MARINHO} />
          <path d="M18 0v10" stroke={OURO} strokeWidth="2.5" />
        </g>
      ))}
      {figuras.map((x, i) => (
        <g key={x}>
          <path d={`M${x - 30} 252c0-62 60-62 60 0Z`} fill={i === 1 ? MARINHO : MEDIO} />
          <path d={`M${x - 8} 192l8 28 8-28Z`} fill={CREME} />
          <circle cx={x} cy="172" r="19" fill={OURO_CLARO} />
          <polygon points={`${x - 28},150 ${x},138 ${x + 28},150 ${x},162`} fill={MARINHO} />
          <path d={`M${x + 24} 152v22`} stroke={OURO} strokeWidth="3" />
          <rect x={x - 12} y="152" width="24" height="9" fill={MARINHO} />
        </g>
      ))}
      <rect x="150" y="262" width="100" height="18" rx="3" fill={CREME} />
      <path d="M162 271h76" stroke={OURO} strokeWidth="3" />
    </g>
  )
}

function Festa() {
  const cores = [OURO, MARINHO, OURO_CLARO, MEDIO, '#8a6a38']
  return (
    <g>
      <path d="M-10 36Q100 96 200 56T410 40" fill="none" stroke={MARINHO} strokeWidth="2.5" />
      {Array.from({ length: 14 }, (_, i) => {
        const t = i / 13
        const x = 6 + t * 388
        const y = 40 + Math.sin(t * Math.PI * 1.6 + 0.4) * 24 + (t < 0.5 ? t * 30 : (1 - t) * 30)
        return <polygon key={i} points={`${x - 13},${y} ${x + 13},${y} ${x},${y + 30}`} fill={cores[i % cores.length]} />
      })}
      {/* fogueira */}
      <path d="M170 262h60M180 270l40-18M220 270l-40-18" stroke="#5e4726" strokeWidth="7" strokeLinecap="round" />
      <path d="M200 252c-26-6-26-34-6-52 2 14 12 16 14 4 18 14 22 40-8 48Z" fill={OURO} />
      <path d="M200 252c-12-4-12-18-2-28 2 8 8 8 8 0 10 8 10 22-6 28Z" fill={OURO_CLARO} />
      {/* dançarinos */}
      {[
        [70, MEDIO],
        [118, OURO],
        [284, MARINHO],
        [334, MEDIO],
      ].map(([x, cor], i) => (
        <g key={x}>
          <circle cx={x} cy="176" r="15" fill={OURO_CLARO} />
          <path d={`M${x - 22} 266c0-48 44-48 44 0Z`} fill={cor} />
          <path d={`M${x - 22} 222l-${10 + (i % 2) * 6} -${14}M${x + 22} 222l${10 + ((i + 1) % 2) * 6} -${14}`} stroke={cor} strokeWidth="6" strokeLinecap="round" />
        </g>
      ))}
    </g>
  )
}

function Ciencias() {
  return (
    <g>
      <rect x="24" y="30" width="170" height="124" rx="6" fill={CREME} />
      <rect x="24" y="30" width="170" height="124" rx="6" fill="none" stroke={OURO} strokeWidth="5" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={46 + i * 36} y={128 - (30 + i * 18)} width="22" height={30 + i * 18} fill={i % 2 ? OURO : MARINHO} />
      ))}
      <path d="M40 132h140" stroke={MARINHO} strokeWidth="3" />
      {/* átomo */}
      <g transform="translate(300 84)" fill="none" stroke={MARINHO} strokeWidth="3.5">
        <ellipse rx="52" ry="20" />
        <ellipse rx="52" ry="20" transform="rotate(60)" />
        <ellipse rx="52" ry="20" transform="rotate(120)" />
        <circle r="9" fill={OURO} stroke="none" />
      </g>
      {/* bancada */}
      <rect x="0" y="214" width="400" height="86" fill="#8a6a38" opacity="0.85" />
      <rect x="0" y="206" width="400" height="12" fill={OURO} />
      {/* frascos */}
      <path d="M92 206V170l-26-42h60l-26 42v36" fill={CREME} stroke={MARINHO} strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M70 140h44l12 0-18 28H80Z" fill={OURO} opacity="0.85" />
      <path d="M200 206v-62a22 22 0 0 1 44 0v62Z" fill={CREME} stroke={MARINHO} strokeWidth="3.5" />
      <path d="M200 176h44v30h-44Z" fill={MEDIO} opacity="0.8" />
      {[286, 310, 334].map((x, i) => (
        <g key={x}>
          <rect x={x} y="150" width="14" height="56" rx="7" fill={CREME} stroke={MARINHO} strokeWidth="3" />
          <rect x={x + 2} y={170 - i * 6} width="10" height={36 + i * 6} rx="5" fill={[OURO, MARINHO, MEDIO][i]} />
        </g>
      ))}
    </g>
  )
}

function Quadra() {
  return (
    <g>
      <polygon points="0,170 400,170 400,300 0,300" fill={OURO} opacity="0.65" />
      <path d="M40 300 90 170M360 300 310 170M0 236h400" stroke={CREME} strokeWidth="4" opacity="0.9" />
      <rect x="0" y="150" width="400" height="22" fill={MARINHO} opacity="0.35" />
      {/* rede */}
      <rect x="34" y="60" width="9" height="150" fill={MARINHO} />
      <rect x="357" y="60" width="9" height="150" fill={MARINHO} />
      <rect x="43" y="78" width="314" height="62" fill={CREME} opacity="0.55" />
      {Array.from({ length: 18 }, (_, i) => (
        <path key={i} d={`M${43 + i * 18.5} 78v62`} stroke={MARINHO} strokeWidth="1.6" opacity="0.7" />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <path key={i} d={`M43 ${78 + i * 20}h314`} stroke={MARINHO} strokeWidth="1.6" opacity="0.7" />
      ))}
      <rect x="43" y="74" width="314" height="7" fill={CREME} />
      {/* bola */}
      <g transform="translate(236 40)">
        <circle r="24" fill={CREME} stroke={MARINHO} strokeWidth="3.5" />
        <path d="M-24 0c10-8 38-8 48 0M0-24c-12 14-12 34 0 48M-17 17c10-6 26-6 34 0" fill="none" stroke={OURO} strokeWidth="3" />
      </g>
      <path d="M150 90c24-34 56-50 62-48" fill="none" stroke={MARINHO} strokeWidth="3" strokeDasharray="2 9" strokeLinecap="round" />
    </g>
  )
}

function Grupo() {
  const cores = [MARINHO, MEDIO, OURO, '#8a6a38', '#2c4f7d']
  const alea = sorteio(11)
  const linhas = [
    { y: 130, n: 8, r: 15 },
    { y: 184, n: 7, r: 17 },
    { y: 242, n: 6, r: 19 },
  ]
  return (
    <g>
      <rect x="0" y="0" width="400" height="300" fill={OURO_CLARO} opacity="0.25" />
      {linhas.map(({ y, n, r }, li) => {
        const passo = 400 / n
        return (
          <g key={li}>
            {Array.from({ length: n }, (_, i) => {
              const x = passo / 2 + i * passo + (li % 2 ? 0 : 6)
              const cor = cores[Math.floor(alea() * cores.length)]
              return (
                <g key={i}>
                  <path d={`M${x - r * 1.5} ${y + r * 3}c0-${r * 2.8} ${r * 3}-${r * 2.8} ${r * 3} 0Z`} fill={cor} />
                  <circle cx={x} cy={y} r={r} fill={OURO_CLARO} />
                  <path d={`M${x - r} ${y - 1}c2-${r} ${r * 2}-${r} ${r * 2} 0c-4-5-${r * 2 - 4}-5-${r * 2} 0Z`} fill={li === 1 ? '#5e4726' : MARINHO} opacity="0.8" />
                </g>
              )
            })}
          </g>
        )
      })}
    </g>
  )
}

const CENAS = { fachada: Fachada, sala: Sala, biblioteca: Biblioteca, formatura: Formatura, festa: Festa, ciencias: Ciencias, quadra: Quadra, grupo: Grupo }

// Desenho de fundo da cena: o chão e o céu mudam conforme o `tom`.
export default function Cena({ nome = 'fachada', tom = 0, className = '' }) {
  const Desenho = CENAS[nome] ?? Fachada
  const [ceu, chao] = TONS[tom % TONS.length]
  const id = `cena${useId().replace(/:/g, '')}`
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={ceu} />
          <stop offset="1" stopColor={chao} />
        </linearGradient>
        <radialGradient id={`${id}-v`} cx="50%" cy="50%" r="75%">
          <stop offset="60%" stopColor="#1f3a5f" stopOpacity="0" />
          <stop offset="100%" stopColor="#1f3a5f" stopOpacity="0.3" />
        </radialGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#${id})`} />
      <Desenho />
      <rect width="400" height="300" fill={`url(#${id}-v)`} />
    </svg>
  )
}
