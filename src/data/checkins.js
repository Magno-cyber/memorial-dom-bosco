// Check-ins feitos neste aparelho (demonstração).
// Na Fase 2 isso vira uma tabela no Supabase, com aprovação da equipe.
const CHAVE = 'memorial:checkins'

export function lerCheckins() {
  try {
    const dados = JSON.parse(localStorage.getItem(CHAVE) ?? '[]')
    return Array.isArray(dados) ? dados : []
  } catch {
    return []
  }
}

export function salvarCheckin(registro) {
  const novo = { ...registro, id: `c${Date.now()}`, novo: true }
  try {
    localStorage.setItem(CHAVE, JSON.stringify([novo, ...lerCheckins()]))
  } catch {
    // sem armazenamento (janela anônima): o envio continua valendo só para esta tela
  }
  return novo
}
