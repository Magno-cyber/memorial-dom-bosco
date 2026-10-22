// O modo totem liga a volta automática ao início e desliga a seleção de texto.
// Para ativar no totem, abra o site com ?totem=1 (por exemplo, como página
// inicial do Fully Kiosk Browser). No celular do visitante nada disso acontece.
function detectar() {
  try {
    const params = new URLSearchParams(window.location.search)
    if (params.has('totem')) {
      if (params.get('totem') === '0') sessionStorage.removeItem('totem')
      else sessionStorage.setItem('totem', '1')
    }
    return sessionStorage.getItem('totem') === '1'
  } catch {
    return false
  }
}

export const modoTotem = detectar()

if (modoTotem) document.documentElement.classList.add('totem')
