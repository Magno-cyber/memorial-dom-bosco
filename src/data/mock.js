// =====================================================================
// DADOS SIMULADOS (MVP / Mock-First)
//
// Tudo que aparece nas telas vem deste arquivo, e todo o conteúdo é de
// EXEMPLO: textos, anos, títulos e legendas precisam ser trocados pelo
// conteúdo oficial do memorial.
//
// Na Fase 2, estes arrays viram consultas ao Supabase (tabelas
// historia_marcos e acervo_itens), mantendo o mesmo formato de campos,
// e as páginas não precisam mudar.
// =====================================================================

// RF02. `icone` aceita: escola, capelo, livro, trofeu, estrela.
export const linhaDoTempo = [
  {
    id: 'm1985',
    ano: '1985',
    icone: 'escola',
    titulo: 'Nasce a escola',
    texto: 'Texto de exemplo. Aqui entra o relato da fundação: quem começou, onde e com quantos alunos.',
  },
  {
    id: 'm1998',
    ano: '1998',
    icone: 'capelo',
    titulo: 'A primeira turma de formandos',
    texto: 'Texto de exemplo. Aqui entra a história da primeira formatura e de quem estava lá.',
  },
  {
    id: 'm2007',
    ano: '2007',
    icone: 'livro',
    titulo: 'Novos espaços para aprender',
    texto: 'Texto de exemplo. Aqui entram as obras e os novos espaços, como biblioteca e laboratórios.',
  },
  {
    id: 'm2016',
    ano: '2016',
    icone: 'trofeu',
    titulo: 'Conquistas que viram tradição',
    texto: 'Texto de exemplo. Aqui entram prêmios, olimpíadas, feiras e outras conquistas da comunidade.',
  },
  {
    id: 'm2026',
    ano: '2026',
    icone: 'estrela',
    titulo: 'O Memorial abre as portas',
    texto: 'Texto de exemplo. Aqui entra a história do Memorial e do acervo que ele guarda.',
  },
]

// RF03. A lista precisa estar em ordem de ano: a página agrupa por `ano`.
// `cena` escolhe a ilustração provisória (fachada, sala, biblioteca, formatura,
// festa, ciencias, quadra, grupo) e `tom` (0 a 4) a cor dela.
// Para usar uma foto real, coloque o arquivo em public/fotos/ e preencha
// `src` com o caminho, por exemplo: '/fotos/inauguracao.jpg'.
const foto = (id, ano, titulo, cena, tom) => ({
  id,
  ano,
  titulo,
  legenda: `Legenda de exemplo: ${titulo.toLowerCase()}.`,
  src: null,
  cena,
  tom,
})

export const fotos = [
  foto('f1', '1985', 'Fachada da escola', 'fachada', 0),
  foto('f2', '1985', 'Primeiro dia de aula', 'sala', 1),
  foto('f3', '1985', 'Professores na entrada', 'grupo', 3),
  foto('f4', '1998', 'Turma de formandos', 'formatura', 2),
  foto('f5', '1998', 'Cerimônia de formatura', 'formatura', 4),
  foto('f6', '1998', 'Festa junina', 'festa', 0),
  foto('f7', '2007', 'Nova biblioteca', 'biblioteca', 3),
  foto('f8', '2007', 'Aula no laboratório', 'ciencias', 2),
  foto('f9', '2007', 'Jogos na quadra', 'quadra', 1),
  foto('f10', '2016', 'Feira de ciências', 'ciencias', 4),
  foto('f11', '2016', 'Torneio esportivo', 'quadra', 0),
  foto('f12', '2026', 'Inauguração do Memorial', 'fachada', 3),
  foto('f13', '2026', 'Visita dos ex-alunos', 'grupo', 1),
  foto('f14', '2026', 'Reencontro de turmas', 'grupo', 2),
]

// RF04.
export const categoriasDeVideo = ['Todos', 'Entrevistas', 'Eventos', 'Institucional']

// Na Fase 2, os vídeos ficam no YouTube como "Não listados".
// Preencha `youtubeId` com o código do vídeo (a parte depois de v= na URL).
export const videos = [
  { id: 'v1', titulo: 'Conheça a nossa história', ano: '2026', categoria: 'Institucional', duracao: '3:20', descricao: 'Descrição de exemplo do vídeo institucional.', cena: 'fachada', youtubeId: null },
  { id: 'v2', titulo: 'Ex-alunos contam suas memórias', ano: '2023', categoria: 'Entrevistas', duracao: '5:45', descricao: 'Descrição de exemplo da entrevista com ex-alunos.', cena: 'grupo', youtubeId: null },
  { id: 'v3', titulo: 'Feira de ciências', ano: '2016', categoria: 'Eventos', duracao: '2:30', descricao: 'Descrição de exemplo do evento.', cena: 'ciencias', youtubeId: null },
  { id: 'v4', titulo: 'Professores relembram os primeiros anos', ano: '2019', categoria: 'Entrevistas', duracao: '6:10', descricao: 'Descrição de exemplo da entrevista com professores.', cena: 'sala', youtubeId: null },
  { id: 'v5', titulo: 'Inauguração da biblioteca', ano: '2007', categoria: 'Eventos', duracao: '1:50', descricao: 'Descrição de exemplo do evento de inauguração.', cena: 'biblioteca', youtubeId: null },
  { id: 'v6', titulo: 'Como tudo começou', ano: '1998', categoria: 'Institucional', duracao: '4:05', descricao: 'Descrição de exemplo do vídeo sobre a fundação.', cena: 'fachada', youtubeId: null },
]

// RF07 a RF09 (demonstração). Pessoas de exemplo para a busca "Encontrar colega".
// Na Fase 2 vêm do Supabase, só as aprovadas pela equipe.
export const pessoas = [
  { id: 'p1', nome: 'Beatriz Almeida Rocha', ano: '1998', turma: '3º A', instagram: '@bia.rocha' },
  { id: 'p2', nome: 'Carlos Eduardo Teixeira', ano: '1985', turma: '8ª B' },
  { id: 'p3', nome: 'Marcos Vinícius Pires', ano: '2007', turma: '2º B', instagram: '@marcospires' },
  { id: 'p4', nome: 'Larissa Costa Nunes', ano: '2016', turma: '3º C' },
  { id: 'p5', nome: 'Francisco Neto Barbosa', ano: '1985', turma: '8ª A' },
  { id: 'p6', nome: 'Rafaela Dias Monteiro', ano: '2007', turma: '3º A', instagram: '@rafa.monteiro' },
  { id: 'p7', nome: 'Juliana Pinheiro Cavalcante', ano: '1998', turma: '2º B' },
  { id: 'p8', nome: 'Pedro Henrique Santana', ano: '2016', turma: '9º A', instagram: '@pedrosantana' },
  { id: 'p9', nome: 'Fernanda Lima Duarte', ano: '2011', turma: '3º B' },
  { id: 'p10', nome: 'João Paulo Sales', ano: '2007', turma: '2º A' },
  { id: 'p11', nome: 'Maria Clara Fontes', ano: '2016', turma: '3º C' },
  { id: 'p12', nome: 'Antônio Silva Ribeiro', ano: '1998', turma: '1º A' },
  { id: 'p13', nome: 'Helena Brito Araújo', ano: '2022', turma: '9º B', instagram: '@helenabrito' },
  { id: 'p14', nome: 'Gabriel Moraes Lopes', ano: '2022', turma: '8º A' },
]
