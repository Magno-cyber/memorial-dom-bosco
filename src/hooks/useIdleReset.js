import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

// Tempo sem toques até o totem voltar sozinho para a tela inicial.
export const TEMPO_INATIVIDADE_MS = 60_000

const EVENTOS = ['pointerdown', 'pointermove', 'keydown', 'wheel', 'touchstart']

// Passe `tempo = 0` para desligar (é o que acontece fora do modo totem).
export function useIdleReset(tempo = TEMPO_INATIVIDADE_MS) {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    // Desligado, ou já na tela inicial: nada a reiniciar.
    if (!tempo || pathname === '/') return undefined

    let timer
    const reiniciar = () => {
      clearTimeout(timer)
      timer = setTimeout(() => navigate('/', { replace: true }), tempo)
    }

    reiniciar()
    EVENTOS.forEach((e) => window.addEventListener(e, reiniciar, { passive: true }))
    window.addEventListener('scroll', reiniciar, { passive: true, capture: true })

    return () => {
      clearTimeout(timer)
      EVENTOS.forEach((e) => window.removeEventListener(e, reiniciar))
      window.removeEventListener('scroll', reiniciar, { capture: true })
    }
  }, [pathname, navigate, tempo])
}
