// Ícones simples em SVG, herdam a cor do texto (currentColor).
const base = {
  width: '1em',
  height: '1em',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

export const IconeInicio = (p) => (
  <svg {...base} {...p}>
    <path d="M3 11 12 3l9 8" />
    <path d="M5 10v10h5v-6h4v6h5V10" />
  </svg>
)

// Livro (também usado como ícone de "História")
export const IconeLivro = (p) => (
  <svg {...base} {...p}>
    <path d="M4 5a2 2 0 0 1 2-2h13v15H6a2 2 0 0 0-2 2V5Z" />
    <path d="M6 18h13v3H6a2 2 0 0 1-2-2" />
    <path d="M9 8h6" />
  </svg>
)
export const IconeHistoria = IconeLivro

export const IconeFotos = (p) => (
  <svg {...base} {...p}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <circle cx="9" cy="10" r="1.8" />
    <path d="m4 18 5-5 4 4 3-3 4 4" />
  </svg>
)

export const IconeVideos = (p) => (
  <svg {...base} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m10 9.5 5 2.5-5 2.5Z" fill="currentColor" />
  </svg>
)

export const IconeEscola = (p) => (
  <svg {...base} {...p}>
    <path d="M3 10 12 4l9 6" />
    <path d="M5 10v9h14v-9" />
    <path d="M10 19v-5h4v5" />
    <path d="M12 4V2" />
  </svg>
)

export const IconeCapelo = (p) => (
  <svg {...base} {...p}>
    <path d="m2 9 10-5 10 5-10 5Z" />
    <path d="M6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5" />
    <path d="M22 9v6" />
  </svg>
)

export const IconeTrofeu = (p) => (
  <svg {...base} {...p}>
    <path d="M8 4h8v5a4 4 0 0 1-8 0Z" />
    <path d="M8 6H4v1a3 3 0 0 0 4 3M16 6h4v1a3 3 0 0 1-4 3" />
    <path d="M12 13v4M8 20h8M9.5 17h5" />
  </svg>
)

export const IconeEstrela = (p) => (
  <svg {...base} {...p}>
    <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9Z" />
  </svg>
)

export const IconeFechar = (p) => (
  <svg {...base} {...p}>
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
)

export const IconeSetaEsquerda = (p) => (
  <svg {...base} {...p}>
    <path d="m15 5-7 7 7 7" />
  </svg>
)

export const IconeSetaDireita = (p) => (
  <svg {...base} {...p}>
    <path d="m9 5 7 7-7 7" />
  </svg>
)

export const IconePlay = (p) => (
  <svg {...base} {...p}>
    <path d="M8 5.5v13l11-6.5Z" fill="currentColor" stroke="none" />
  </svg>
)

export const IconeBusca = (p) => (
  <svg {...base} {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m16 16 5 5" />
  </svg>
)

export const IconeQr = (p) => (
  <svg {...base} {...p}>
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <path d="M14 14h3v3h-3zM20 14v1M14 20h1M18 18h3v3h-3z" />
  </svg>
)

export const IconeSeta = (p) => (
  <svg {...base} {...p}>
    <path d="m9 5 7 7-7 7" />
  </svg>
)

export const IconeTelaCheia = (p) => (
  <svg {...base} {...p}>
    <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
  </svg>
)
